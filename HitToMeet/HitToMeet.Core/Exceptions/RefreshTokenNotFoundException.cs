using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class RefreshTokenNotFoundException : HitToMeetException
    {
        public RefreshTokenNotFoundException()
           : base(ErrorMessages.RefreshTokenNotFoundException)
        {
        }

        public RefreshTokenNotFoundException(string message)
            : base(message)
        {
        }

        public RefreshTokenNotFoundException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected RefreshTokenNotFoundException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Token.NotFoundRefreshToken;
    }
}
