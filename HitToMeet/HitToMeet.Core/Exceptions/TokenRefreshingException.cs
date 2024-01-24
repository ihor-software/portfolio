using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class TokenRefreshingException : HitToMeetException
    {
        public TokenRefreshingException()
           : base(ErrorMessages.TokenRefreshingException)
        {
        }

        public TokenRefreshingException(string message)
            : base(message)
        {
        }

        public TokenRefreshingException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected TokenRefreshingException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Token.RefreshingError;
    }
}
