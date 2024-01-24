using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class RefreshTokenIsUsedException : HitToMeetException
    {
        public RefreshTokenIsUsedException()
           : base(ErrorMessages.RefreshTokenIsUsedException)
        {
        }

        public RefreshTokenIsUsedException(string message)
            : base(message)
        {
        }

        public RefreshTokenIsUsedException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected RefreshTokenIsUsedException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Token.UsedRefreshToken;
    }
}
