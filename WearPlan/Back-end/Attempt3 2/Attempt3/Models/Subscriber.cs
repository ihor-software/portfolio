using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Attempt3.Models
{
    public class Subscriber
    {
        [Key]
        public int idSubscriber { get; set; }
        [ForeignKey("Client")]
        public int idClient { get; set; }
        public string status { get; set; }

    }

}
