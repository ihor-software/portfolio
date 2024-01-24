using AutoMapper;
using HitToMeet.API.Responses.Quiz;
using HitToMeet.Core.Exceptions.Quiz;
using HitToMeet.Core.Resources;
using HitToMeet.Filters.ActionFilters;
using HitToMeet.Filters.ExceptionFilters;
using HitToMeet.BL.Interfaces;
using HitToMeet.BL.Results;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using HitToMeet.API.ViewModels.Skin;

namespace HitToMeet.Controllers
{
    [ApiController]
    [ModelValidation]
    [ServiceFilter(typeof(HitToMeetExceptionsFilterAttribute))]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CasinoController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ICasinoService casinoService;
        public CasinoController(IMapper mapper, ICasinoService casinoService)
        {
            this.mapper = mapper;
            this.casinoService = casinoService;
        }

        [HttpGet((API.Routes.DefaultRoutes.Casino.GetAvailableSkins))]
        public async Task<IActionResult> GetAvailableSkins()
        {
            var userId = this.User.Claims.First(c => c.Type == StringConstants.JwtClaimId).Value;
            var skins = await this.casinoService.GetAvailableSkinsForUser(userId);
            return Ok(skins.Select(s=> mapper.Map<SkinViewModel>(s)));
        }
    }
}
