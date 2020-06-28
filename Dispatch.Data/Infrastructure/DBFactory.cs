namespace Dispatch.Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        private TeduShopDbContext dBContext;

        public TeduShopDbContext Init()
        {
            // nếu null thì khởi tạo
            return dBContext ?? (dBContext = new TeduShopDbContext());
        }

        /// <summary>
        ///  hàm hủy
        /// </summary>
        public override void DisposeCore()
        {
            if (dBContext != null)
            {
                dBContext.Dispose();
            }
        }
    }
}