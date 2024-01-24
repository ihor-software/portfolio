using System;
using System.ComponentModel.DataAnnotations;

namespace WP.Models
{
    public class ProductPurchase
    {
        [Key]
        public int idProductPurchase { get; set; }
        public int idProduct { get; set; }
        public int idPurchase { get; set; }
    }
}
