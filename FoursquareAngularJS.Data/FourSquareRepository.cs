using FoursquareAngularJS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoursquareAngularJS.Data
{

    public interface IFourSquareRepository
    {
        IQueryable<BookmarkedPlace> GetBookmarkedPlaces(string userName);

        bool UserNameExists(string userName);

        int SavePlace(BookmarkedPlace bookmarkedPlace);
    }

    public class FourSquareRepository : IFourSquareRepository
    {
        private FourSquareContext _ctx;
        public FourSquareRepository()
        {
            _ctx = new FourSquareContext();
        }

        public IQueryable<BookmarkedPlace> GetBookmarkedPlaces(string userName)
        {
            return _ctx.BookmarkedPlaces
                   .Where(b => b.UserName == userName)
                   .AsQueryable();
        }

        public bool UserNameExists(string userName)
        {
            return _ctx.BookmarkedPlaces.Any(b => b.UserName == userName); 
        }

        public int SavePlace(BookmarkedPlace bookmarkedPlace)
        {
            try
            {
                if (_ctx.BookmarkedPlaces.Any(b => b.UserName == bookmarkedPlace.UserName 
                                                && b.VenueID == bookmarkedPlace.VenueID))
                {
                    return -1;
                }

                bookmarkedPlace.TS = DateTime.Now;
                _ctx.BookmarkedPlaces.Add(bookmarkedPlace);

                return _ctx.SaveChanges();

            }
            catch (Exception)
            {

                //Log exception here
                return 0;
            }
        }

       
    }

  
}
