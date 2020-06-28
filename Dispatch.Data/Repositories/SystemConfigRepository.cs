using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dispatch.Data.Infrastructure;
using Dispatch.Model;

namespace Dispatch.Data.Repositories
{


    public interface ISystemConfigRepository : IRepository<SystemConfig>
    {

    }

    public class SystemConfigRepository : RepositoryBase<SystemConfig>, ISystemConfigRepository
    {
        public SystemConfigRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
