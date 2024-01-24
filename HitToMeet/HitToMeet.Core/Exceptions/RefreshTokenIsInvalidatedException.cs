using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class RefreshTokenIsInvalidatedException : HitToMeetException
    {
        public RefreshTokenIsInvalidatedException()
           : base(ErrorMessages.RefreshTokenIsInvalidatedException)
        {
        }

        public RefreshTokenIsInvalidatedException(string message)
            : base(message)
        {
        }

        public RefreshTokenIsInvalidatedException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected RefreshTokenIsInvalidatedException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Token.InvalidatedRefreshToken;
    }
}
