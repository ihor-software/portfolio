using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class Size
    {
        [Key]
        public int idSize { get; set; }
        public string size { get; set; }

    }

}
