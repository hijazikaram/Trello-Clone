angular.module('myPortfolio').controller('SettingsCtrl', function($scope, mainService, $state){
$scope.getCurrentUser = function () {
  mainService.getCurrentUser().then(function (response) {
    if (!response) {
      $state.go('Signin')
    }
    $scope.user=response;
  }).catch(function (err) {
      $state.go('Signin')
  })
}
$scope.getCurrentUser();
$scope.updateUser = function () {
  mainService.updateUser($scope.user).then(function (response) {
    $scope.getCurrentUser();
  })
}
});
