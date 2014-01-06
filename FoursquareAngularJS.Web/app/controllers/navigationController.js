'use strict';
app.controller('navigationController', function ($scope, $location, placesDataService) {

    $scope.isActive = function (path) {

        return $location.path().substr(0, path.length) == path;
    };

    //$scope.hasUserInCtx = function () {
        
    //    return (!placesDataService.getUserInContext()) ? true : false;
    //};
});