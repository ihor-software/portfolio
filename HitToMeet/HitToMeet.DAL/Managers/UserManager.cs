using HitToMeet.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HitToMeet.DAL.Managers
{
    public class UserManager : UserManager<User>
    {
        private AppDbContext dbContext;

        public UserManager(AppDbContext dbContext, IUserStore<User> store, IOptions<IdentityOptions> optionsAccessor, IPasswordHasher<User> passwordHasher, IEnumerable<IUserValidator<User>> userValidators, IEnumerable<IPasswordValidator<User>> passwordValidators, ILookupNormalizer keyNormalizer, IdentityErrorDescriber errors, IServiceProvider services, ILogger<UserManager<User>> logger)
            : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
            this.dbContext = dbContext;
        }

        public async Task<User> FindByIdWithSkinsAsync(string userId)
        {
            return await dbContext.Users
                .Include(x => x.UserSkins)
                .SingleAsync(x => x.Id.Equals(userId));
        }
    }
}
