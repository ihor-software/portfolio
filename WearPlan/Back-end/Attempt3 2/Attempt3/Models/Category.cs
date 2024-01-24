using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class Category
    {
        [Key]
        public int idCategory { get; set; }
        public string category { get; set; }

    }

}
