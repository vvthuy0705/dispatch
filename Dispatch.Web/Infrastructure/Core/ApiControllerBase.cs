using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Dispatch.Model;
using Dispatch.Service;
using System.Diagnostics;
using System.Data.Entity.Validation;
using System.Data.Entity.Infrastructure;

namespace Dispatch.Web.Infrastructure.Core
{
    public class ApiControllerBase : ApiController
    {
        private IErrorService _errorService;

        public ApiControllerBase(IErrorService errorService)
        {
            this._errorService = errorService;
        }

        /// <summary>
        /// Tạo http requestrespone phản hồi lại thông tin lỗi và dữ liệu cho khách hàng
        /// </summary>
        /// <param name="requestMessage"></param>
        /// <param name="function"></param>
        /// <returns></returns>
        protected HttpResponseMessage CreateHttpResponse(HttpRequestMessage requestMessage, Func<HttpResponseMessage> function)
        {
            HttpResponseMessage response = null;
            try
            {
                //trả về responMesage
                response = function.Invoke();
            }
            catch (DbEntityValidationException dvEx)
            {
                LogError(dvEx);

                foreach (var eve in dvEx.EntityValidationErrors)
                {
                    // trace sẽ ra cửa sổ out put hiện thị vị trí bị lỗi
                    Trace.WriteLine($"Entity of type\"{eve.Entry.Entity.GetType().Name}\"in state\"{eve.Entry.State}\"has the following validation error.");
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Trace.WriteLine($"-Property: \"{ve.PropertyName}\", Error: \"{ve.ErrorMessage}");
                    }
                }
                LogError(dvEx);
                response = requestMessage.CreateResponse(HttpStatusCode.BadRequest, dvEx.Message);
            }
            catch (DbUpdateException duEx)
            {
                LogError(duEx);
                response = requestMessage.CreateResponse(HttpStatusCode.BadRequest, duEx.Message);
            }
            catch (Exception ex)
            {
                LogError(ex);
                // Badrequest là lỗi 400 , thông tin lỗi
                response = requestMessage.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }

            return response;
        }

        /// <summary>
        /// log lại lỗi vào trong Db
        /// </summary>
        /// <param name="ex">thôgn tin lỗi</param>
        private void LogError(Exception ex)
        {
            try
            {
                Error error = new Error();
                error.CreatedDate = DateTime.Now;
                error.Message = ex.Message;
                error.Stacktrace = ex.StackTrace;
                _errorService.Creat(error);
                _errorService.Save();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}