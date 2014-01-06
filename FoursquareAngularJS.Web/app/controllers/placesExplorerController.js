'use strict';
app.controller('placesExplorerController', function ($scope, placesExplorerService, placesPhotosService, placesDataService, $filter, $modal) {

    $scope.exploreNearby = "New York";
    $scope.exploreQuery = "";
    $scope.filterValue = "";

    $scope.places = [];
    $scope.filteredPlaces = [];
    $scope.filteredPlacesCount = 0;

    //paging
    $scope.totalRecordsCount = 0;
    $scope.pageSize = 10;
    $scope.currentPage = 1;

    init();

    function init() {

        createWatche();
        getPlaces();
    }

    function getPlaces() {

        var offset = ($scope.pageSize) * ($scope.currentPage - 1);

        placesExplorerService.get({ near: $scope.exploreNearby, query: $scope.exploreQuery, limit: $scope.pageSize, offset: offset }, function (placesResult) {

            if (placesResult.response.groups) {
                $scope.places = placesResult.response.groups[0].items;
                $scope.totalRecordsCount = placesResult.response.totalResults;
                filterPlaces('');
            }
            else {
                $scope.places = [];
                $scope.totalRecordsCount = 0;
            }

        });
    };

    function filterPlaces(filterInput) {
        $scope.filteredPlaces = $filter("placeNameCategoryFilter")($scope.places, filterInput);
        $scope.filteredPlacesCount = $scope.filteredPlaces.length;
    }

    function createWatche() {

        $scope.$watch("filterValue", function (filterInput) {
            filterPlaces(filterInput);
        });
    }

    $scope.doSearch = function () {

        $scope.currentPage = 1;
        getPlaces();

    };

    $scope.pageChanged = function (page) {

        $scope.currentPage = page;
        getPlaces();

    };

    $scope.showVenuePhotos = function (venueId, venueName) {

        placesPhotosService.get({ venueId: venueId }, function (photosResult) {

            var modalInstance = $modal.open({
                templateUrl: 'app/views/placesphotos.html',
                controller: 'placesPhotosController',
                resolve: {
                    venueName: function () {
                        return venueName;
                    },
                    venuePhotos: function () {
                        return photosResult.response.photos.items;
                    }
                }
            });

            modalInstance.result.then(function () {
                //$scope.selected = selectedItem;
            }, function () {
                //alert('Modal dismissed at: ' + new Date());
            });

        });

    };

    $scope.buildCategoryIcon = function (icon) {

        return icon.prefix + '44' + icon.suffix;
    };

    $scope.buildVenueThumbnail = function (photo) {

        return photo.items[0].prefix + '128x128' + photo.items[0].suffix;
    };

    $scope.bookmarkPlace = function (venue) {

        if (!placesDataService.getUserInContext()) {

            var modalInstance = $modal.open({
                templateUrl: 'app/views/userprofile.html',
                controller: 'userContextController',
                resolve: {
                    venue: function () {
                        return venue;
                    }
                }
            });
        }
        else {
            placesDataService.savePlace(venue).then(
            function (results) {
                // Do nothing as toaster showing from service
            },
            function (results) {
                // Do nothing as toaster showing from service
            });
        }

    };
});