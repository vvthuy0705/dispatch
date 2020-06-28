using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Dispatch.Common
{
    public class MailHelper
    {

        /// <summary>
        /// Phuương thức gửi mail 
        /// </summary>
        /// <param name="toEmail">gửi đến email nào </param>
        /// <param name="subject">tiêu đề</param>
        /// <param name="content">nội dung</param>
        /// <returns></returns>
        public static bool SendMail(string toEmail, string subject, string content)
        {
            try
            {

                // host là địa chỉ SMTP chúng ta kết nối đến
                var host = ConfigHelper.GetByKey("SMTPHost");
                var port = int.Parse(ConfigHelper.GetByKey("SMTPPort"));
                var fromEmail = ConfigHelper.GetByKey("FromEmailAddress");
                var fromPassword = ConfigHelper.GetByKey("FromEmailPassword");
                var fromName = ConfigHelper.GetByKey("FromName");
                var smtpClient = new SmtpClient(host, port)
                { 
                    UseDefaultCredentials = false,
                    Credentials = new System.Net.NetworkCredential(fromEmail, fromPassword),
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    EnableSsl = true,
                    Timeout = 100000
                };
                var mail = new MailMessage
                {
                    Body = content,
                    Subject = subject,
                    From = new MailAddress(fromEmail, fromName, System.Text.Encoding.UTF8)
                };
                mail.To.Add(new MailAddress(toEmail));
                mail.BodyEncoding = System.Text.Encoding.UTF8;
                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;

                smtpClient.Send(mail);

                return true;

            }
            catch (SmtpException ex)
            {

                return false;
            }


        }
    }
}
