angular.module('myPortfolio').directive('listcardsDirective', function(mainService, $state) {
    return {
        restrict: 'AE',
        templateUrl: './app/navDirectives/listcardsDirective.html',
        // scope: {
        //   list: '='
        // },
        controller: function($scope) {
            setTimeout(function() {
                $('.pop-menu').hide();
            }, 5);
            $scope.openPopup = function(id, title) {
                $('.' + title + id + '.pop-menu').show('.');

                $scope.toggle = true;
            }
            $scope.remove1 = function(index) {
                $scope.list.cards.splice(index, 1);
                mainService.updateList($scope.list).then(function() {
                    $scope.closePopups();
                });
            };
            $scope.updateCard = function(list) {
                mainService.updateList($scope.list).then(function() {
                  $scope.closePopups();
                })
            };
            $scope.closePopups = function() {
                $('.pop-menu').hide();
                $scope.toggle = false;
            }

        }
    }
});
