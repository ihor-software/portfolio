using System;
using System.ComponentModel.DataAnnotations;

namespace WP.Models
{
    public class Customer
    {
        [Key]
        public int idCustomer { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
