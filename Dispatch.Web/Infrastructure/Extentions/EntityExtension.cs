using Dispatch.Model;
using Dispatch.Model.Models;
using Dispatch.Models;
using Dispatch.Web.Models;
using System;

namespace Dispatch.Web.Infrastructure.Extensions
{
    /// <summary>
    /// tạo phức mở rộng cho một đối tượng nào đấy
    /// </summary>
    public static class EntityExtensions
    {
      

     
       
      

        public static void UpdateFeedback(this Feedback feedback, FeedbackViewModel feedbackVm)
        {
            feedback.Name = feedbackVm.Name;
            feedback.Email = feedbackVm.Email;
            feedback.Message = feedbackVm.Message;
            feedback.Status = feedbackVm.Status;
            feedback.CreatedDate = DateTime.Now;
        }

     

        public static void UpdateApplicationGroup(this ApplicationGroup appGroup, ApplicationGroupViewModel appGroupViewModel)
        {
            appGroup.ID = appGroupViewModel.ID;
            appGroup.Name = appGroupViewModel.Name;
        }

        public static void UpdateApplicationRole(this ApplicationRole appRole, ApplicationRoleViewModel appRoleViewModel, string action = "add")
        {
            if (action == "update")
                appRole.Id = appRoleViewModel.Id;
            else
                appRole.Id = Guid.NewGuid().ToString();
            appRole.Name = appRoleViewModel.Name;
            appRole.Description = appRoleViewModel.Description;
        }

        public static void UpdateUser(this ApplicationUser appUser, ApplicationUserViewModel appUserViewModel, string action = "add")
        {
            appUser.Id = appUserViewModel.Id;
            appUser.FullName = appUserViewModel.FullName;
            appUser.BirthDay = appUserViewModel.BirthDay;
            appUser.Email = appUserViewModel.Email;
            appUser.UserName = appUserViewModel.UserName;
            appUser.PhoneNumber = appUserViewModel.PhoneNumber;
        }
    }
}