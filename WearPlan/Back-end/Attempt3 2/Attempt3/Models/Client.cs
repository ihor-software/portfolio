using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class Client
    {
        [Key]
        public int idClient { get; set; }
        public string shopName { get; set; }
        public string email { get; set; }
        public string password { get; set; }

    }

}
