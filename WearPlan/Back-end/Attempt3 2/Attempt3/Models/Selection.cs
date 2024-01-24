using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class Selection
    {
        [Key]
        public int idSelection { get; set; }
        [ForeignKey("Wardrobe")]
        public int idWardrobe { get; set; }
        [ForeignKey("Product")]
        public int idProduct { get; set; }
        [ForeignKey("Discount")]
        public int idDiscount { get; set; }
    }

}
