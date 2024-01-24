using HitToMeet.DAL.Entities.BaseEntities;
using System.Collections.Generic;

namespace HitToMeet.DAL.Entities
{
    public class Animal : BaseEntity
    {
        public string Description { get; set; }

        public string Title { get; set; }

        public int MinPoints { get; set; }

        public int MaxPoints { get; set; }

        public IEnumerable<Skin> Skins { get; set; }

        public IEnumerable<User> Users { get; set; }
    }
}
