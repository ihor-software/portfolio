using AutoMapper;
using HitToMeet.API.Responses;
using HitToMeet.WebServices.Results;

namespace HitToMeet.Mappers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            this.CreateMap<AuthentificationResult, AuthSuccessResponse>();
        }
    }
}
