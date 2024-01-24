using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HitToMeet.DAL.Entities
{
    public class User : IdentityUser
    {
        [Required]
        public DateTime RegistrationDate { get; set; }

        public int? AnimalId { get; set; }

        public Animal Animal { get; set; }

        public string Description { get; set; }

        public int Sex { get; set; }

        public int PointsBalance { get; set; }

        public int Balance { get; set; }

        public IEnumerable<Chat> InitiatedChats { get; set; }

        public IEnumerable<Chat> AcceptedChats { get; set; }

        public IEnumerable<UserSkin> UserSkins { get; set; }

        public IEnumerable<Rate> SendedRates { get; set; }

        public IEnumerable<Rate> AcceptedRates { get; set; }

        public IEnumerable<Message> SendedMessages { get; set; }
    }
}
