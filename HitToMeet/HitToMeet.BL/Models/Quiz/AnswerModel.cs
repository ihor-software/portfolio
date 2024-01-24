using AutoMapper;
using HitToMeet.DAL.Entities.Quiz;

namespace HitToMeet.BL.Models.Quiz
{
    [AutoMap(typeof(Answer), ReverseMap = true)]
    public class AnswerModel
    {
        public int Id { get; set; }

        public int Points { get; set; }

        public string Title { get; set; }

        public int QuestionId { get; set; }
    }
}
