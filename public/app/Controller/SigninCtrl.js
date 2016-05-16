angular.module('myPortfolio').controller('SigninCtrl', function($scope, mainService, $state){
    $scope.login = function () {
      console.log("its working");
      mainService.login($scope.credentials).then(function (response) {
        $state.go('Home');
        $scope.user = response.data._id;
        alert("Welcome to Trello");
      })
    }
});
