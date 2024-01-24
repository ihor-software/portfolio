using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class InvalidPasswordException : HitToMeetException
    {
        public InvalidPasswordException()
            : base(ErrorMessages.InvalidPasswordException)
        {
        }

        public InvalidPasswordException(string message)
            : base(message)
        {
        }

        public InvalidPasswordException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected InvalidPasswordException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Login.InvalidPassword;
    }
}
