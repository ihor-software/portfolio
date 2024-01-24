namespace HitToMeet.Core.Exceptions
{
    using System;
    using System.Runtime.Serialization;
    using HitToMeet.Core.Enums;
    using HitToMeet.Core.Resources;

    public class HitToMeetException : Exception
    {
        public HitToMeetException()
            : base(ErrorMessages.HitToMeetException)
        {
        }

        public HitToMeetException(string message)
            : base(message)
        {
        }

        public HitToMeetException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected HitToMeetException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public virtual int Code => (int)ErrorCodesEnums.Global.Unknown;
    }
}
