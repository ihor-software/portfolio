using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class InvalidRefreshTokenException : HitToMeetException
    {
        public InvalidRefreshTokenException()
           : base(ErrorMessages.InvalidRefreshTokenException)
        {
        }

        public InvalidRefreshTokenException(string message)
            : base(message)
        {
        }

        public InvalidRefreshTokenException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected InvalidRefreshTokenException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Token.InvalidRefreshToken;
    }
}
