using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class UserUnknownException : HitToMeetException
    {
        public UserUnknownException()
            : base(ErrorMessages.UserUnknownException)
        {
        }

        public UserUnknownException(string message)
            : base(message)
        {
        }

        public UserUnknownException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected UserUnknownException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Login.UserUnknown;
    }
}
