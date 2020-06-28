using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dispatch.Data.Infrastructure
{
    /// <summary>
    /// Class khởi tạo tất cả các đối tượng 
    /// </summary>
    /// vvthuy (5/9/2019)
    public interface IDbFactory : IDisposable
    {
        TeduShopDbContext Init();
    }
}
