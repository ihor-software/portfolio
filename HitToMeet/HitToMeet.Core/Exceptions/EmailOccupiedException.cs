using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Runtime.Serialization;

namespace HitToMeet.Core.Exceptions
{
    public class EmailOccupiedException : HitToMeetException
    {
        public EmailOccupiedException()
           : base(ErrorMessages.EmailOccupiedException)
        {
        }

        public EmailOccupiedException(string message)
            : base(message)
        {
        }

        public EmailOccupiedException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected EmailOccupiedException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Registration.EmailOccupied;
    }
}
