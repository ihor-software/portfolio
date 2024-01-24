using AutoMapper;
using HitToMeet.DAL.Entities.Quiz;
using System.Collections.Generic;

namespace HitToMeet.BL.Models.Quiz
{
    [AutoMap(typeof(Question), ReverseMap = true)]
    public class QuestionModel
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public string QuestionType { get; set; }

        public IEnumerable<AnswerModel> Answers { get; set; }
    }
}
