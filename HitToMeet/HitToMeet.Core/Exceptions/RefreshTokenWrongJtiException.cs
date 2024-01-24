using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class RefreshTokenWrongJtiException : HitToMeetException
    {
        public RefreshTokenWrongJtiException()
           : base(ErrorMessages.RefreshTokenWrongJtiException)
        {
        }

        public RefreshTokenWrongJtiException(string message)
            : base(message)
        {
        }

        public RefreshTokenWrongJtiException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected RefreshTokenWrongJtiException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Token.WrongJtiRefreshToken;
    }
}
