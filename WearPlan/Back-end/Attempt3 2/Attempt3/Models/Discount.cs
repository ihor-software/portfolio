using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class Discount
    {
        [Key]
        public int idDiscount { get; set; }
        [ForeignKey("Product")]
        public int idProduct { get; set; }
        public int discount { get; set; }

    }

}
