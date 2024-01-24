using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace HitToMeet.Core.Exceptions.Quiz
{
    public class ExceedAnimalException : HitToMeetException
    {
        public ExceedAnimalException()
            : base(ErrorMessages.ExceedAnimalException)
        {
        }

        public ExceedAnimalException(string message)
            : base(message)
        {
        }

        public ExceedAnimalException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected ExceedAnimalException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        public override int Code => (int)ErrorCodesEnums.Quiz.ExceedAnimal;
    }
}
