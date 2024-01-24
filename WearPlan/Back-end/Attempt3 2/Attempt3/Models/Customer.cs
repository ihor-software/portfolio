using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class Customer
    {
        [Key]
        public int idCustomer { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        [ForeignKey("Wardrobe")]
        public int idWardrobe { get; set; }
        public int discount { get; set; }
    }

}
