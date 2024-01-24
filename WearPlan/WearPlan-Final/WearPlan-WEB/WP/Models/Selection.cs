using System;
using System.ComponentModel.DataAnnotations;

namespace WP.Models
{
    public class Selection
    {
        [Key]
        public int idSelection { get; set; }
        public int idProduct { get; set; }
        public int idDiscount { get; set; }
    }
}
