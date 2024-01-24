using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;

namespace HitToMeet.API.Responses
{
    public class ErrorResponse
    {
        public int SubCode { get; set; }

        public string Message { get; set; }

        public IEnumerable<ModelError> Errors { get; set; }
    }
}
