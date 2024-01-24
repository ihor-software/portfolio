using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class ProductCategory
    {
        [Key]
        public int idProductCategory { get; set; }
        [ForeignKey("Category")]
        public int idCategory { get; set; }
        [ForeignKey("Product")]
        public int idProduct { get; set; }

    }

}
