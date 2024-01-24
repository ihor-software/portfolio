using System;
using System.ComponentModel.DataAnnotations;

namespace Attempt3.Models
{
    public class Product
    {
        [Key]
        public int idProduct { get; set; }
        public int idCategory { get; set; }
        public string model { get; set; }
        public int idSize { get; set; }
        public string sex { get; set; }
        public string image { get; set; }
        public int price { get; set; }
        public string description { get; set; }
        public string specs { get; set; }
        public int idBrand { get; set; }
        public int idClient { get; set; }
        public int idDiscount { get; set; }
    }
}
