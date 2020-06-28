using AutoMapper;
using BotDetect.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Dispatch.Common;
using Dispatch.Model;
using Dispatch.Models;
using Dispatch.Service;
using Dispatch.Web.Infrastructure.Extensions;
using Dispatch.Web.Mapping;
using Dispatch.Web.Models;

namespace Dispatch.Web.Controllers
{
    public class ContactController : Controller
    {

        private IMapper _mapper;
        IContactDetailService _contactDetailService;
        IFeedbackService _feedbackService;
        public ContactController(IContactDetailService contactDetailService, IFeedbackService feedbackService)
        {
            this._contactDetailService = contactDetailService;
            this._feedbackService = feedbackService;
            this._mapper = AutoMapperConfiguration.Configuration().CreateMapper();
        }
        // GET: Contact
        public ActionResult Index()
        {
            FeedbackViewModel feedbackViewModel = new FeedbackViewModel();
            feedbackViewModel.ContactDetail = GetDetail();
            return View(feedbackViewModel);
        }


        [HttpPost]
        [CaptchaValidation("CaptchaCode", "contactCaptcha", "Mã xác nhận không đúng")]
        public ActionResult SendFeedback(FeedbackViewModel feedbackViewModel)
        {
            if(ModelState.IsValid)
            {
                Feedback newFeedback = new Feedback();
                newFeedback.UpdateFeedback(feedbackViewModel);
                _feedbackService.Create(newFeedback);
                _feedbackService.Save();
                ViewData["SuccessMsg"] = "Send Feedback Seccess!";



                //StringBuilder builder = new StringBuilder();
                //builder.Append("Infomation contact !");
                // MapPath:lấy vị trí tuyết đối 
                string content = System.IO.File.ReadAllText(Server.MapPath("/Assets/client/template/contact_template.html"));
                content = content.Replace("{{Name}}", feedbackViewModel.Name);
                content = content.Replace("{{Email}}", feedbackViewModel.Email);
                content = content.Replace("{{Message}}", feedbackViewModel.Message);

                var adminEmail = ConfigHelper.GetByKey("AdminEmail");
                MailHelper.SendMail(adminEmail, "Infomation from website", content);

            }
            feedbackViewModel.ContactDetail = GetDetail();
            feedbackViewModel.Name = "";
            feedbackViewModel.Message = "";
            feedbackViewModel.Email = "";
            return View("Index", feedbackViewModel);
        }

        private ContactDetailViewModel GetDetail()
        {
            var model = _contactDetailService.GetDefaultContact();
            var contactViewModel = _mapper.Map<ContactDetail, ContactDetailViewModel>(model);
            return contactViewModel;
        }
        //public static bool isEmail(string inputEmail)
        //{
        //    inputEmail = NulltoString(inputEmail);
        //    string strRegex = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
        //          @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
        //          @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
        //    Regex re = new Regex(strRegex);
        //    if (re.IsMatch(inputEmail))
        //        return (true);
        //    else
        //        return (false);
        //}

    }
}