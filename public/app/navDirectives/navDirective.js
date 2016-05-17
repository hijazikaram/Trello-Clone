angular.module('myPortfolio').directive('navDirective', function(mainService, $state){
  return{
    templateUrl: './app/navDirectives/navDirectiveTmpl.html',
    controller: function($scope) {
        $scope.logout = function () {
          mainService.logout().then(function (response) {
            $state.go('Signin');
            alert('Logout Successful');
          });
        }
    }
  }
});
