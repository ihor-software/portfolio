using HitToMeet.API.Responses;
using HitToMeet.Core.Enums;
using HitToMeet.Core.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;

namespace HitToMeet.Filters.ExceptionFilters
{
    public class HitToMeetExceptionsFilterAttribute : Attribute, IExceptionFilter
    {
        private readonly ILogger<HitToMeetExceptionsFilterAttribute> logger;

        public HitToMeetExceptionsFilterAttribute(ILogger<HitToMeetExceptionsFilterAttribute> logger)
        {
            this.logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            if (context.Exception.GetType().IsSubclassOf(typeof(HitToMeetException)))
            {
                var exception = context.Exception;
                ObjectResult result = new ObjectResult(new ErrorResponse
                {
                    Message = exception.Message,
                    SubCode = (exception as HitToMeetException).Code
                })
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };

                context.Result = result;
            }
            else
            {
                this.logger.LogError(context.Exception.Message, context.Exception.StackTrace);

                context.Result = new ObjectResult(new ErrorResponse
                {
                    Message = context.Exception.Message,
                    SubCode = (int)ErrorCodesEnums.Global.Unknown
                })
                {
                    StatusCode = StatusCodes.Status500InternalServerError
                };
            }

            context.ExceptionHandled = true;
        }
    }
}
