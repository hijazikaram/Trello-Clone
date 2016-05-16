angular.module('myPortfolio').controller('SignupCtrl', function($scope, mainService){
    $scope.register = function () {
      console.log("its working");
      mainService.register($scope.newUser).then(function (response) {
      })
    }
});
