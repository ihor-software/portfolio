using HitToMeet.Core.Exceptions;
using HitToMeet.Core.Options;
using HitToMeet.Core.Resources;
using HitToMeet.DAL.Entities;
using HitToMeet.DAL.Interfaces;
using HitToMeet.DAL.Managers;
using HitToMeet.WebServices.Interfaces;
using HitToMeet.WebServices.Results;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HitToMeet.WebServices.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager userManager;
        private readonly IRepository repository;

        public IdentityService(IRepository repository, UserManager userManager)
        {
            this.repository = repository;
            this.userManager = userManager;
        }

        public async Task<AuthentificationResult> LoginAsync(string email, string password)
        {
            var user = await this.userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new UserUnknownException();
            }

            var userHasValidPassword = await this.userManager.CheckPasswordAsync(user, password);
            if (!userHasValidPassword)
            {
                throw new InvalidPasswordException();
            }

            return this.GenerateAuthenticationResult(user);
        }

        public async Task<AuthentificationResult> RegisterAsync(string email, string userName, string password)
        {
            var existingByEmailUser = await this.userManager.FindByEmailAsync(email);
            if (existingByEmailUser != null)
            {
                throw new EmailOccupiedException();
            }

            var existingByUsernameUser = await this.userManager.FindByNameAsync(userName);
            if (existingByUsernameUser != null)
            {
                throw new UsernameOccupiedException();
            }

            var newUser = new User
            {
                RegistrationDate = DateTime.Now,
                Email = email,
                UserName = userName,
            };

            await this.userManager.CreateAsync(newUser, password);

            return this.GenerateAuthenticationResult(newUser);
        }

        private AuthentificationResult GenerateAuthenticationResult(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(JwtOptions.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(StringConstants.JwtClaimUsername, user.UserName),
                    new Claim(StringConstants.JwtClaimId, user.Id)
                }),
                Expires = DateTime.UtcNow.Add(JwtOptions.TokenLifeTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var refreshToken = new RefreshToken
            {
                JwtId = token.Id,
                UserId = user.Id,
                CreatrionDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMonths(1)
            };

            this.repository.Add<RefreshToken>(refreshToken);

            return new AuthentificationResult
            {
                Token = tokenHandler.WriteToken(token),
                RefreshToken = refreshToken.Token
            };
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("StyleCop.CSharp.OrderingRules", "SA1202:Elements must be ordered by access", Justification = "<Pending>")]
        public async Task<AuthentificationResult> RefreshTokenAsync(string token, string refreshToken)
        {
            var validatedToken = this.GetPrincipalFromToken(token);
            if (validatedToken == null)
            {
                throw new TokenRefreshingException();
            }

            var expiryDateUnix = long.Parse(validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
            var expiryDateTimeUtc = new DateTime(1970, 1, 1, 0, 0, (int)DateTimeKind.Utc)
                .AddSeconds(expiryDateUnix);
            if (expiryDateTimeUtc > DateTime.UtcNow)
            {
                throw new TokenIsNotExpiredException();
            }

            var jti = validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
            var storedRefreshToken = this.repository.Get<RefreshToken>(true, e => e.Token.Equals(refreshToken));
            if (storedRefreshToken == null)
            {
                throw new RefreshTokenNotFoundException();
            }
            else if (DateTime.UtcNow > storedRefreshToken.ExpiryDate)
            {
                throw new RefreshTokenIsExpiredException();
            }
            else if (storedRefreshToken.Invalidated)
            {
                throw new RefreshTokenIsInvalidatedException();
            }
            else if (storedRefreshToken.Used)
            {
                throw new RefreshTokenIsUsedException();
            }
            else if (storedRefreshToken.JwtId != jti)
            {
                throw new RefreshTokenWrongJtiException();
            }

            storedRefreshToken.Used = true;
            this.repository.Update<RefreshToken>(storedRefreshToken);

            var user = await this.userManager.FindByIdAsync(validatedToken.Claims.Single(x => x.Type.Equals(StringConstants.JwtClaimId)).Value);
            return this.GenerateAuthenticationResult(user);
        }

        private ClaimsPrincipal GetPrincipalFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JwtOptions.Secret)),
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    RequireExpirationTime = true,
                    ValidateLifetime = false,
                    ClockSkew = TimeSpan.Zero,   // Instead of 5 minutes
                };
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);
                if (!this.IsJwtWithValidSecurityAlgorithm(validatedToken))
                {
                    return null;
                }
                else
                {
                    return principal;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private bool IsJwtWithValidSecurityAlgorithm(SecurityToken validatedToken)
        {
            return validatedToken is JwtSecurityToken jwtSecurityToken &&
                jwtSecurityToken.Header.Alg.Equals(
                    SecurityAlgorithms.HmacSha256,
                    StringComparison.InvariantCultureIgnoreCase);
        }
    }
}

