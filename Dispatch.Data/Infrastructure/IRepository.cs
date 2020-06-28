using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dispatch.Data.Infrastructure
{
    /// <summary>
    /// Lớp thực hiện các thao tác database , tương tác với model với DB
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepository<T> where T : class
    {
        T Add(T entity);
        void Update(T entity);
        T Delete(T entity);
        T Delete(int entity);
        T GetSingleById(int id);
        //Delete multi records
        void DeleteMulti(Expression<Func<T, bool>> where);

        // dạng lamda expression
        /// <summary>
        /// 
        /// </summary>
        /// <param name="expression"></param>
        /// <param name="includes">Thêm các bảng con vào</param>
        /// <returns></returns>
        T GetSingleByCondition(Expression<Func<T, bool>> expression, string[] includes = null);

        IEnumerable<T> GetAll(string[] include = null);
        IEnumerable<T> GetMulti(Expression<Func<T, bool>> predicate, string[] includes = null);
        /// <summary>
        /// Phân trang 
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="total"></param>
        /// <param name="idex"></param>
        /// <param name="size"></param>
        /// <param name="includes"></param>
        /// <returns></returns>
        IEnumerable<T> GetMultiPaging(Expression<Func<T, bool>> filter, out int total, int idex = 0, int size = 50, string[] includes = null);
        /// <summary>
        /// đếm số lượng theo điều kiện
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        int Count(Expression<Func<T, bool>> where);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        bool CheckContains(Expression<Func<T,bool>> predicate);

    }
}
