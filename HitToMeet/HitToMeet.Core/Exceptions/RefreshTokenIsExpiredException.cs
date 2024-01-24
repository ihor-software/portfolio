using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class RefreshTokenIsExpiredException : HitToMeetException
    {
        public RefreshTokenIsExpiredException()
           : base(ErrorMessages.RefreshTokenIsExpiredException)
        {
        }

        public RefreshTokenIsExpiredException(string message)
            : base(message)
        {
        }

        public RefreshTokenIsExpiredException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
        
        protected RefreshTokenIsExpiredException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Token.ExpiredRefreshToken;
    }
}
