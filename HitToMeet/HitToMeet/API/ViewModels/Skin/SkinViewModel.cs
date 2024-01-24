using AutoMapper;
using HitToMeet.BL.Models.Casino;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HitToMeet.API.ViewModels.Skin
{
    [AutoMap(typeof(SkinModel), ReverseMap = true)]
    public class SkinViewModel
    {
        public int Id { get; set; }

        public string ImgUrl { get; set; }

        public int AnimalId { get; set; }
    }
}
