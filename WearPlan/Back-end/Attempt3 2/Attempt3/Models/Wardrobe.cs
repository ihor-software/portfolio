using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class Wardrobe
    {
        [Key]
        public int idWardrobe { get; set; }
        [ForeignKey("Customer")]
        public int idCustomer { get; set; }
        [ForeignKey("Product")]
        public int idProduct { get; set; }

    }

}
