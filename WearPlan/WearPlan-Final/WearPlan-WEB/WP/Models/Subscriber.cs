using System;
using System.ComponentModel.DataAnnotations;

namespace WP.Models
{
    public class Subscriber
    {
        [Key]
        public int idSubscriber { get; set; }
        public int idClient { get; set; }
        public string status { get; set; }
    }
}
