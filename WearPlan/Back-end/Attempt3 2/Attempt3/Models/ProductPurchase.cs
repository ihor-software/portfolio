using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class ProductPurchase
    {
        [Key]
        public int idProductPurchase { get; set; }
        [ForeignKey("Product")]
        public int idProduct { get; set; }
        [ForeignKey("Purchase")]
        public int idPurchase { get; set; }

    }

}
