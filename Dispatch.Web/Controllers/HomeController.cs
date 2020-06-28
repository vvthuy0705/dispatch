using AutoMapper;
using Dispatch.Model;
using Dispatch.Service;
using Dispatch.Web.Mapping;
using Dispatch.Web.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Dispatch.Web.Controllers
{
    public class HomeController : Controller
    {
        private IMapper _mapper;
        private ICommonService _commonService;

        public HomeController( ICommonService commonService)
        {
            this._commonService = commonService;
            this._mapper = AutoMapperConfiguration.Configuration().CreateMapper();
        }

        [OutputCache(Duration = 3600, Location = System.Web.UI.OutputCacheLocation.Client)]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        ///
        /// </summary>
        /// <returns></returns>
        [ChildActionOnly]// khong co gọi trực tiếp trên url/ footer, chỉ dùng nhúng
        // outputcache khi nào dùng ở server / client : khi mà chugn tất cả thì nên đặt server , khác nhau thì đặt ở phía client
        [OutputCache(Duration = 3600)]
        public ActionResult Footer()
        {
            var footerModel = _commonService.GetFooter();
            var footerViewModel = _mapper.Map<Footer, FooterViewModel>(footerModel);
            return PartialView(footerViewModel);
        }

        [ChildActionOnly]
        public ActionResult Header()
        {
            return PartialView();
        }
    }
}