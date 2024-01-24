using HitToMeet.DAL.Entities.BaseEntities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HitToMeet.DAL.Entities
{
    public class RefreshToken : BaseDto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Token { get; set; }

        public string JwtId { get; set; }

        public DateTime CreatrionDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public bool Used { get; set; }

        public bool Invalidated { get; set; }

        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
