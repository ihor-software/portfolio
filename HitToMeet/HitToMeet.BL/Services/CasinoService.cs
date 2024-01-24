using AutoMapper;
using HitToMeet.BL.Interfaces;
using HitToMeet.BL.Models.Casino;
using HitToMeet.DAL.Entities;
using HitToMeet.DAL.Interfaces;
using HitToMeet.DAL.Managers;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HitToMeet.BL.Services
{
    public class CasinoService : ICasinoService
    {
        private readonly UserManager userManager;
        private readonly IRepository repository;
        private readonly IMapper mapper;

        public CasinoService(IRepository repository, UserManager userManager, IMapper mapper)
        {
            this.repository = repository;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<SkinModel>> GetAvailableSkinsForUser(string userId)
        {
            User user = await userManager.FindByIdWithSkinsAsync(userId);
            IEnumerable<Skin> skins = await repository.GetRangeAsync<Skin>(false, s => s.AnimalId == user.AnimalId);
            List<Skin> result = skins.ToList();
            result.RemoveAll(a => user.UserSkins.Any(u => u.SkinId == a.Id));
            return result.Select(s => mapper.Map<SkinModel>(s));
        }
    }
}
