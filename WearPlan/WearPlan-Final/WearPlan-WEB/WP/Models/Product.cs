using System;
using System.ComponentModel.DataAnnotations;

namespace WP.Models
{
    public class Product
    {
        [Key]
        public int idProduct { get; set; }
        public string category { get; set; }
        public string model { get; set; }
        public string size { get; set; }
        public string sex { get; set; }
        public string image { get; set; }
        public decimal price { get; set; }
        public string description { get; set; }
        public string specs { get; set; }
        public string brand { get; set; }
        public string client { get; set; }
        public decimal discount { get; set; }
        public string code { get; set; }

    }
}
