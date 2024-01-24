using HitToMeet.BL.Models.Quiz;
using System.Collections.Generic;

namespace HitToMeet.BL.Results
{
    public class QuizResult
    {
        public IEnumerable<QuestionModel> Questions { get; set; }
    }
}
