angular.module('myPortfolio').controller('SignupCtrl', function($scope, mainService, $state) {
    $scope.register = function() {
        console.log("its working");
        mainService.register($scope.newUser).then(function(response) {
            $state.go('Signin');
        })
    }
});
