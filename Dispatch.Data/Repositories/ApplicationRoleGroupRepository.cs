using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dispatch.Data.Infrastructure;
using Dispatch.Model.Models;

namespace Dispatch.Data.Repositories
{
    public interface IApplicationRoleGroupRepository : IRepository<ApplicationRoleGroup>
    {

    }
    public class ApplicationRoleGroupRepository : RepositoryBase<ApplicationRoleGroup>, IApplicationRoleGroupRepository
    {
        public ApplicationRoleGroupRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }
    }
}
