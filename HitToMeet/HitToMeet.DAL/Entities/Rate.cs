using HitToMeet.DAL.Entities.BaseEntities;

namespace HitToMeet.DAL.Entities
{
    public class Rate : BaseDto
    {
        public string SenderId { get; set; }

        public string AccepterId { get; set; }

        public int Points { get; set; }

        public User Sender { get; set; }

        public User Accepter { get; set; }
    }
}
