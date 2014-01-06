using FoursquareAngularJS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FoursquareAngularJS.Web.Controllers
{
    public class PlacesController : BaseApiController
    {

        public IEnumerable<BookmarkedPlace> Get(string userName, int page = 0, int pageSize = 10)
        {
            IQueryable<BookmarkedPlace> query;

            query = TheRepository.GetBookmarkedPlaces(userName).OrderByDescending(b => b.Id);
            
            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            var paginationHeader = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
            };

            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination",
                                                                Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader));

            var results = query
                         .Skip(pageSize * page)
                         .Take(pageSize)
                         .ToList();


            return results;

        }

        public HttpResponseMessage Post([FromBody] BookmarkedPlace bookmarkedPlace)
        {
            try
            {
                var result = TheRepository.SavePlace(bookmarkedPlace);

                if (result == 1)
                {
                    return Request.CreateResponse(HttpStatusCode.Created, bookmarkedPlace);
                }
                else if (result == -1)
                {
                    return Request.CreateResponse(HttpStatusCode.NotModified,
                        string.Format("Venue: {0} already saved in User: {1} bookmarks.", bookmarkedPlace.VenueName, bookmarkedPlace.UserName));
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Could not save to the database.");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }

    }
}