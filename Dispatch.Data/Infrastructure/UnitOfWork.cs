using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dispatch.Data.Infrastructure
{
    /// <summary>
    /// lớp giao diện của trang web
    /// nhiệm vụ thực thi hai phương thức commit 
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDbFactory _dbFactory;
        private TeduShopDbContext _dbContext;

        public UnitOfWork(IDbFactory dbFactory)
        {
            this._dbFactory = dbFactory;
        }

        public TeduShopDbContext DBContext
        {
            get { return this._dbContext ?? (_dbContext = _dbFactory.Init()); }
        }

        public void Commit()
        {
            DBContext.SaveChanges();
        }
    }
}
