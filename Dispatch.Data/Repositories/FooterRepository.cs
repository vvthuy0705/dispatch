
using Dispatch.Data.Infrastructure;
using Dispatch.Model;

namespace Dispatch.Data.Repositories
{
    /// <summary>
    /// interface được bổ xung thêm khi các lớp base không có 
    /// </summary>
    public interface IFooterRepository : IRepository<Footer>
    {
    }
    /// <summary>
    /// Lớp footer
    /// </summary>
    public class FooterRepository:RepositoryBase<Footer>, IFooterRepository
    {

        public FooterRepository(IDbFactory dBFactory) : base(dBFactory)
        {
            
        }

    }


}