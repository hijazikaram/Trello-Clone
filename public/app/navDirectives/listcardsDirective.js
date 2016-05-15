angular.module('myPortfolio').directive('listcardsDirective', function( mainService, $state) {
    return {
        restrict: 'AE',
        templateUrl: './app/navDirectives/listcardsDirective.html',
        controller: function($scope) {
            console.log('jquery is working');
            setTimeout(function() {
                $('.pop-menu').hide();
            }, 5);
            var self = this;
            $scope.openPopup = function(id) {
              $('.'+id+'.pop-menu').show();
              $scope.toggle= true;
            }
            $scope.remove = function(cardId) {

                mainService.deleteCard(cardId)
                    .then(function() {
                        $scope.getLists();
                    });
            };
            $scope.closePopups = function () {
              $('.pop-menu').hide();
              $scope.toggle=false;
              // $('.div-outer-outer-outer').modal({backdrop: true});
            }
        }
    }
});
