namespace Dispatch.Data.Infrastructure
{
    public interface IUnitOfWork
    {
        void Commit();
    }
}