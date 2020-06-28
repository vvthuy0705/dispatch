using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dispatch.Data.Infrastructure
{
    public abstract class RepositoryBase<T> : IRepository<T> where T : class
    {
        #region "Property"
        /// <summary>
        /// nơi  trung gian thao tác với dbase và 
        /// </summary>
        private TeduShopDbContext dataContext;
        private readonly IDbSet<T> dbSet;
        /// <summary>
        /// khởi tạo các đối tượng thông qua lớp DbFactory
        /// </summary>
        protected IDbFactory DbFactory
        {
            get;
            private set;
        }
        /// <summary>
        /// phương thức khởi tạo lớp DBContext
        /// </summary>
        protected TeduShopDbContext DbContext
        {
            get
            {
                // nếu chưa khởi tạo lớp 
                return dataContext ?? (dataContext = DbFactory.Init());
            }
        }
        /// <summary>
        /// khởi tạo các thao tác với DB 
        /// </summary>
        /// <param name="dbFactory"></param>
        protected RepositoryBase(IDbFactory dbFactory)
        {
            DbFactory = dbFactory;
            dbSet = DbContext.Set<T>();
        }
        #endregion

        #region "Func/Method emplementation"
        /// <summary>
        /// lớp vittual cho phép ghi đè định nghĩa lại , có thể nạp chồng, tính đa hình, phải có kiểu trả về 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual T Add(T entity)
        {
            try
            {
                return dbSet.Add(entity);

            }
            catch (Exception e)
            {

                throw e;
            }

        }
        public virtual void Update(T entity)
        {
            dbSet.Attach(entity);
            dataContext.Entry(entity).State = EntityState.Modified;
        }
        /// <summary>
        /// xóa khi truyền vào là 1 thực thể
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual T Delete(T entity)
        {
            return dbSet.Remove(entity);
        }
        /// <summary>
        /// xóa theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual T Delete(int id)
        {
            var entity = dbSet.Find(id);
            return dbSet.Remove(entity);
        }

        /// <summary>
        /// Xóa nhiều phần tử, cách truyền linq
        /// </summary>
        /// <param name="where"></param>
        public virtual void DeleteMulti(Expression<Func<T, bool>> where)
        {
            IEnumerable<T> objects = dbSet.Where<T>(where).AsEnumerable();
            foreach (T obj in objects)
            {
                dbSet.Remove(obj);
            }
        }
        /// <summary>
        /// lấy đối tượng theo ID  truyền về 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual T GetSingleById(int id)
        {
            return dbSet.Find(id);
        }
        /// <summary>
        /// Lấy nhiều 
        /// </summary>
        /// <param name="where"></param>
        /// <param name="includes"></param>
        /// <returns></returns>
        public virtual IEnumerable<T> GetMany(Expression<Func<T, bool>> where, string includes)
        {
            return dbSet.Where(where).ToList();
        }
        /// <summary>
        /// đếm số lượng đối tượng trong db
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public virtual int Count(Expression<Func<T, bool>> where)
        {
            return dbSet.Count(where);
        }
        /// <summary>
        /// GetAll 
        /// </summary>
        /// <param name="includes"></param>
        /// <returns></returns>
        public IEnumerable<T> GetAll(string[] includes = null)
        {
            //HANDLE INCLUDES FOR ASSOCIATED OBJECTS IF APPLICABLE
            if (includes != null && includes.Count() > 0)
            {
                var query = dataContext.Set<T>().Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                return query.AsQueryable();
            }
            return dataContext.Set<T>().AsQueryable();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="expression"></param>
        /// <param name="includes"></param>
        /// <returns></returns>
        public T GetSingleByCondition(Expression<Func<T, bool>> expression, string[] includes = null)
        {
            try
            {
                if (includes != null && includes.Count() > 0)
                {
                    var query = dataContext.Set<T>().Include(includes.First());
                    foreach (var include in includes.Skip(1))
                        query = query.Include(include);
                    return query.FirstOrDefault(expression);
                }
                return dataContext.Set<T>().FirstOrDefault(expression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="predicate"></param>
        /// <param name="includes"></param>
        /// <returns></returns>
        public virtual IEnumerable<T> GetMulti(Expression<Func<T, bool>> predicate, string[] includes = null)
        {
            //HANDLE INCLUDES FOR ASSOCIATED OBJECTS IF APPLICABLE
            if (includes != null && includes.Count() > 0)
            {
                var query = dataContext.Set<T>().Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                return query.Where<T>(predicate).AsQueryable<T>();
            }
            return dataContext.Set<T>().Where<T>(predicate).AsQueryable<T>();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="predicate"></param>
        /// <param name="total"></param>
        /// <param name="index"></param>
        /// <param name="size"></param>
        /// <param name="includes"></param>
        /// <returns></returns>
        public virtual IEnumerable<T> GetMultiPaging(Expression<Func<T, bool>> predicate, out int total, int index = 0, int size = 20, string[] includes = null)
        {
            int skipCount = index * size;
            IQueryable<T> _resetSet;

            //HANDLE INCLUDES FOR ASSOCIATED OBJECTS IF APPLICABLE
            if (includes != null && includes.Count() > 0)
            {
                var query = dataContext.Set<T>().Include(includes.First());
                foreach (var include in includes.Skip(1))
                    query = query.Include(include);
                _resetSet = predicate != null ? query.Where<T>(predicate).AsQueryable() : query.AsQueryable();
            }
            else
            {
                _resetSet = predicate != null ? dataContext.Set<T>().Where<T>(predicate).AsQueryable() : dataContext.Set<T>().AsQueryable();
            }

            _resetSet = skipCount == 0 ? _resetSet.Take(size) : _resetSet.Skip(skipCount).Take(size);
            total = _resetSet.Count();
            return _resetSet.AsQueryable();
        }

        public bool CheckContains(Expression<Func<T, bool>> predicate)
        {
            return dataContext.Set<T>().Count<T>(predicate) > 0;
        }
        #endregion
    }

}
