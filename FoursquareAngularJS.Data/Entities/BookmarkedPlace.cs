using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoursquareAngularJS.Data.Entities
{
   public class BookmarkedPlace
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string VenueID { get; set; }
        public string VenueName { get; set; }
        public string Address { get; set; }
        public string Category { get; set; }
        public Decimal Rating { get; set; }
        public DateTime? TS { get; set; }
    }
}
