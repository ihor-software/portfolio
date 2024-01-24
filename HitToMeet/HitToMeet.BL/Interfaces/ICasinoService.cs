using HitToMeet.BL.Models.Casino;
using HitToMeet.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HitToMeet.BL.Interfaces
{
    public interface ICasinoService
    {
        public Task<IEnumerable<SkinModel>> GetAvailableSkinsForUser(string userId);
    }
}
