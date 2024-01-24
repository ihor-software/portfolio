using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace HitToMeet.API.Requests
{
    public class UserLoginRequest
    {
        [EmailAddress]
        public string Email { get; set; }

        [NotNull]
        public string Password { get; set; }
    }
}
