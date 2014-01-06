'use strict';
app.controller('placesPhotosController', function ($scope, $modalInstance, venueName, venuePhotos) {

    $scope.venueName = venueName;
    $scope.venuePhotos = venuePhotos;

    $scope.close = function ()
    {
        $modalInstance.dismiss('cancel');
    };

    $scope.buildVenuePhoto = function (photo) {

        return photo.prefix + '256x256' + photo.suffix;
    };
});