using Dispatch.Data.Infrastructure;
using Dispatch.Data.Repositories;
using Dispatch.Model;

namespace Dispatch.Service
{
    public interface IErrorService
    {
        Error Creat(Error error);
        void Save();
    }

    public class ErrorService : IErrorService
    {
        IErrorRepository _errorRepository;
        IUnitOfWork _unitOfWork;


        public ErrorService(IErrorRepository errorRepository, IUnitOfWork unitOfWork)
        {
            this._errorRepository = errorRepository;
            this._unitOfWork = unitOfWork;      
        }
        /// <summary>
        /// Khi có 1 lỗi xảy ra thì thực hiện việc khởi tạo 1 lỗi, thềm vào trong DB
        /// </summary>
        /// <param name="error"></param>
        /// <returns></returns>
        public Error Creat(Error error)
        {
            return _errorRepository.Add(error);
        }
        /// <summary>
        /// Phương thức commit khi thực hiện add thanh cong
        /// </summary>
        public void Save()
        {
            _unitOfWork.Commit();
        }
    }
}