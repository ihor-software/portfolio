using HitToMeet.DAL.Entities.BaseEntities;

namespace HitToMeet.DAL.Entities
{
    public class UserSkin : BaseDto
    {
        public string UserId { get; set; }

        public User User { get; set; }

        public int SkinId { get; set; }

        public Skin Skin { get; set; }

        public int SkinStatus { get; set; }
    }
}
