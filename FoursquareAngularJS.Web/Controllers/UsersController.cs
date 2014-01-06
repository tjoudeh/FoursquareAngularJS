using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoursquareAngularJS.Web.Controllers
{
    public class UsersController :BaseApiController
    {
        public bool Get(string userName)
        {
            return TheRepository.UserNameExists(userName);
        }
    }
}