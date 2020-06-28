using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dispatch.Data.Infrastructure;
using Dispatch.Model;

namespace Dispatch.Data.Repositories
{
    public interface IVisitorStatisticRepository : IRepository<VisitorStatistic>
    {

    }

    public class VisitorStatisticRepository : RepositoryBase<VisitorStatistic>, IVisitorStatisticRepository
    {
        public VisitorStatisticRepository(IDbFactory dbFactory) : base(dbFactory)
        { }
    }
}
