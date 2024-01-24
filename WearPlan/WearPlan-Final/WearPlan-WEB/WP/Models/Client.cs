using System;
using System.ComponentModel.DataAnnotations;

namespace WP.Models
{
    public class Client
    {
        [Key]
        public int idClient { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
