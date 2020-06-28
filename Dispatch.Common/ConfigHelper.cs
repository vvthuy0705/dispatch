using System.Configuration;

namespace Dispatch.Common
{
    public class ConfigHelper
    {
        public static string GetByKey(string key)
        {
            return ConfigurationManager.AppSettings[key].ToString();
        }
    }
}