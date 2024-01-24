using System;
using System.ComponentModel.DataAnnotations;

namespace Attempt3.Models
{
    public class Brand
    {
        [Key]
        public int idBrand { get; set; }
        public string brand { get; set; }
    }
}