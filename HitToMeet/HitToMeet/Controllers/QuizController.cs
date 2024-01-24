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

namespace HitToMeet.Controllers
{
    [ApiController]
    [ModelValidation]
    [ServiceFilter(typeof(HitToMeetExceptionsFilterAttribute))]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class QuizController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IQuizService quizService;
        public QuizController(IMapper mapper, IQuizService quizService)
        {
            this.mapper = mapper;
            this.quizService = quizService;
        }

        [HttpGet(API.Routes.DefaultRoutes.Quiz.QuizPath)]
        public async Task<IActionResult> GetQuiz()
        {
            var userId = this.User.Claims.First(c => c.Type == StringConstants.JwtClaimId).Value;
            bool animal = await this.quizService.HasAnimal(userId);
            if (!animal)
            {
                QuizResult quizResult = await this.quizService.GetQuiz();
                return Ok(this.mapper.Map<QuizResponse>(quizResult));
            }
            else
            {
                throw new ExceedAnimalException();
            }
        }

        [HttpPut((API.Routes.DefaultRoutes.Quiz.QuizPath))]
        public async Task<IActionResult> SetAnimal(int id)
        {
            var userId = this.User.Claims.First(c => c.Type == StringConstants.JwtClaimId).Value;
            await this.quizService.AddAnimalToUser(userId, id);
            return Ok();
        }
    }
}
