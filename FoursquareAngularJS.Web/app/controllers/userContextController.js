
'use strict';
app.controller('userContextController', function ($scope, $modalInstance, placesDataService, venue) {

    $scope.venue = venue;
    $scope.user = { userName: "" };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.saveUser = function () {

        placesDataService.setUserInContext($scope.user.userName);

        placesDataService.savePlace(venue).then(
            function () {
                $scope.close();
            },
            function () {
                alert("Error occured");
            });



    };

});