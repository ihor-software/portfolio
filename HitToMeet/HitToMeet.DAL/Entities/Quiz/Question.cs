using HitToMeet.DAL.Entities.BaseEntities;
using System.Collections.Generic;

namespace HitToMeet.DAL.Entities.Quiz
{
    public class Question : BaseEntity
    {
        public string Text { get; set; }

        public string QuestionType { get; set; }

        public IEnumerable<Answer> Answers { get; set; }
    }
}
