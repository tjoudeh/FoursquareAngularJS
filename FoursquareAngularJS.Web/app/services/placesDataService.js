'use strict';
app.factory('placesDataService', function ($http, toaster) {

    var serviceBase = '/api/places/';
    var placesDataFactory = {};
    var userInContext = null;

    var _getUserInCtx = function () {

        return userInContext;
    };

    var _setUserInCtx = function (userInCtx) {

        userInContext = userInCtx;

    };

    var _savePlace = function (venue) {
        //process venue to take needed properties

        var miniVenue = {
            userName: userInContext,
            venueID: venue.id,
            venueName: venue.name,
            address: venue.location.address,
            category: venue.categories[0].shortName,
            rating: venue.rating
        };

        return $http.post(serviceBase, miniVenue).then(

            function (results) {
                toaster.pop('success', "Bookmarked Successfully", "Place saved to your bookmark!");
            },
            function (results) {
                if (results.status == 304)
                {
                    toaster.pop('note', "Already Bookmarked",  "Already bookmarked for user: " + miniVenue.userName);
                }
                else
                {
                    toaster.pop('error', "Faield to Bookmark", "Something went wrong while saving :-(");
                }


            return results;
        });
    };

    var _getUserPlaces = function (userName, pageIndex, pageSize) {

        return $http.get(serviceBase + userName, { params: { page: pageIndex, pageSize: pageSize } }).then(function (results) {
            return results;
        });
    };

    var _userExists = function (userName) {

        return $http.get("/api/users/" + userName).then(function (results) {
            return results.data;
        });
    };


    placesDataFactory.getUserInContext = _getUserInCtx;
    placesDataFactory.setUserInContext = _setUserInCtx;
    placesDataFactory.getUserPlaces = _getUserPlaces;
    placesDataFactory.userExists = _userExists; 

    placesDataFactory.savePlace = _savePlace;

    return placesDataFactory
});