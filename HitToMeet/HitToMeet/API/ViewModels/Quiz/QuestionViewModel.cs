using AutoMapper;
using HitToMeet.BL.Models.Quiz;
using System.Collections.Generic;

namespace HitToMeet.API.ViewModels.Quiz
{
    [AutoMap(typeof(QuestionModel), ReverseMap = true)]
    public class QuestionViewModel
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public string QuestionType { get; set; }

        public IEnumerable<AnswerViewModel> Answers { get; set; }
    }
}
