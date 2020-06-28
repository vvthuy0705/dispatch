using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dispatch.Data.Infrastructure
{
    /// <summary>
    /// tự động hủy 
    /// </summary>
    public class Disposable : IDisposable
    {
        private bool isDisposed;

        ~Disposable()
        {
            Dispose(false);
        }

        private void Dispose(bool disposing)
        {
            if(!isDisposed && disposing)
            {
                DisposeCore();
            }
            isDisposed = true;
        }
        /// <summary>
        /// hủy rác
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            // thu hồi thu hoạch bộ nhớ
            GC.SuppressFinalize(this);
        }
        /// <summary>
        /// 
        /// </summary>
        public virtual void DisposeCore()
        {

        }
    }
}
