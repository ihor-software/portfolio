using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class Purchase
    {
        [Key]
        public int idPurchase { get; set; }
        [ForeignKey("Customer")]
        public int idCustomer { get; set; }
        [ForeignKey("Product")]
        public int idProduct { get; set; }
        public string date { get; set; }

    }

}
