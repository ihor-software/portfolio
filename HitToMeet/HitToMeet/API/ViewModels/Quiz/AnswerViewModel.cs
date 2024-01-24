using AutoMapper;
using HitToMeet.BL.Models.Quiz;

namespace HitToMeet.API.ViewModels.Quiz
{
    [AutoMap(typeof(AnswerModel), ReverseMap = true)]
    public class AnswerViewModel
    {
        public int Id { get; set; }

        public int Points { get; set; }

        public string Title { get; set; }

        public int QuestionId { get; set; }
    }
}
