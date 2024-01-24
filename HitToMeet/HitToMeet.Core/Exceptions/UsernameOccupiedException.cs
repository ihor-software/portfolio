using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class UsernameOccupiedException : HitToMeetException
    {
        public UsernameOccupiedException()
            : base(ErrorMessages.UsernameOccupiedException)
        {
        }

        public UsernameOccupiedException(string message)
            : base(message)
        {
        }

        public UsernameOccupiedException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected UsernameOccupiedException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Registration.UsernameOccupied;
    }
}
