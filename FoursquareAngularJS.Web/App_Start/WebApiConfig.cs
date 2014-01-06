using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace FoursquareAngularJS.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
               name: "PlacesRoute",
               routeTemplate: "api/places/{userName}",
               defaults: new { controller = "places", userName = RouteParameter.Optional }
           );

            config.Routes.MapHttpRoute(
               name: "UsersRoute",
               routeTemplate: "api/users/{userName}",
               defaults: new { controller = "users" }
           );

             var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }

        
    }
}
