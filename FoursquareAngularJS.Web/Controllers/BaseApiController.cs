using FoursquareAngularJS.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace FoursquareAngularJS.Web.Controllers
{
    public class BaseApiController : ApiController
    {
        private IFourSquareRepository _repo;

        protected IFourSquareRepository TheRepository
        {
            get
            {
                _repo = new FourSquareRepository();
                return _repo;
            }
        }
    }
}