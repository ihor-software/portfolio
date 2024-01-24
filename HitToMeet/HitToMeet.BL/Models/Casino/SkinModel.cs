using AutoMapper;
using HitToMeet.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace HitToMeet.BL.Models.Casino
{
    [AutoMap(typeof(Skin), ReverseMap = true)]
    public class SkinModel
    {
        public int Id { get; set; }

        public string ImgUrl { get; set; }

        public int AnimalId { get; set; }
    }
}
