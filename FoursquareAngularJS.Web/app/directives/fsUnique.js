'use strict';
app.directive("fsUnique", function (placesDataService) {

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.bind('blur', function (e) {
                    if (!ngModel || !element.val()) return;
                    
                    var currentValue = element.val();
                    placesDataService.userExists(currentValue)
                        .then(function (userExists) {
                            var unique = !(userExists === 'true');
                            if (currentValue === element.val()) {
                                ngModel.$setValidity('unique', unique);
                            }
                        }, function () {
                            
                            ngModel.$setValidity('unique', true);
                        });
                });
            }
        }
});