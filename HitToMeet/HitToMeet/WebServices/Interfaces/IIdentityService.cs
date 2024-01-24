using HitToMeet.WebServices.Results;
using System.Threading.Tasks;

namespace HitToMeet.WebServices.Interfaces
{
    public interface IIdentityService
    {
        Task<AuthentificationResult> RegisterAsync(string email, string userName, string password);

        Task<AuthentificationResult> LoginAsync(string email, string password);

        Task<AuthentificationResult> RefreshTokenAsync(string token, string refreshToken);
    }
}
