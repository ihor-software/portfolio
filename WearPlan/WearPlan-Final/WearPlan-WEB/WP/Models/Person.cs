using System;
using System.ComponentModel.DataAnnotations;

namespace WP.Models
{
    public class Person
    {
        [Key]
        public int idPerson { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string cpassword { get; set; }
        public string role { get; set; }
    }
}
