using HitToMeet.DAL.Entities.BaseEntities;
using System;

namespace HitToMeet.DAL.Entities
{
    public class Message : BaseEntity
    {
        public DateTime Date { get; set; }

        public string Text { get; set; }

        public string SenderId { get; set; }

        public User Sender { get; set; }

        public int ChatId { get; set; }

        public Chat Chat { get; set; }
    }
}
