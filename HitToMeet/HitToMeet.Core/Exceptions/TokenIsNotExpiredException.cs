using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class TokenIsNotExpiredException : HitToMeetException
    {
        public TokenIsNotExpiredException()
           : base(ErrorMessages.TokenIsNotExpiredExeption)
        {
        }

        public TokenIsNotExpiredException(string message)
            : base(message)
        {
        }

        public TokenIsNotExpiredException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected TokenIsNotExpiredException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Token.IsNotExpired;
    }
}
