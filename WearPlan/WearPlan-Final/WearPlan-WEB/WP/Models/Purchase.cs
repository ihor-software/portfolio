using System;
using System.ComponentModel.DataAnnotations;

namespace WP.Models
{
    public class Purchase
    {
        [Key]
        public int idPurchase { get; set; }
        public int idProduct { get; set; }
        public string idCustomer { get; set; }
    }
}
