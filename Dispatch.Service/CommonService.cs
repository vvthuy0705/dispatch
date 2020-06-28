using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dispatch.Data.Infrastructure;
using Dispatch.Data.Repositories;
using Dispatch.Common;
using Dispatch.Model;

namespace Dispatch.Service
{
    public interface ICommonService
    {
         Footer GetFooter();
    }
    public class CommonService : ICommonService
    {
        IFooterRepository _footerRepository;
        IUnitOfWork _unitOfWork;
        public CommonService(IFooterRepository footerRepository, IUnitOfWork unitOfWork)
        {
            this._footerRepository = footerRepository;
            this._unitOfWork = unitOfWork;
        }

        public Footer GetFooter()
        {
            return _footerRepository.GetSingleByCondition(x => x.ID== CommonConstants.DefaultFooterId);
        }

    }
}
