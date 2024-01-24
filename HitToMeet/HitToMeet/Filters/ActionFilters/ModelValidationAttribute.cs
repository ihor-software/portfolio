using HitToMeet.API.Responses;
using HitToMeet.Core.Enums;
using HitToMeet.Core.Resources;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;

namespace HitToMeet.Filters.ActionFilters
{
    public class ModelValidationAttribute : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(new ErrorResponse
                {
                    Message = ErrorMessages.BadModelData,
                    Errors = context.ModelState.Values.SelectMany(e => e.Errors),
                    SubCode = (int)ErrorCodesEnums.Global.ModelError
                });
            }
        }
    }
}
