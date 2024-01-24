﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class ProductBrand
    {
        [Key]
        public int idProductBrand { get; set; }
        [ForeignKey("Product")]
        public int idProduct { get; set; }
        [ForeignKey("Brand")]
        public int idBrand { get; set; }

    }

}
