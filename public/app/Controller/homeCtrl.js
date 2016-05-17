
angular.module('myPortfolio').controller('homeCtrl', function($scope, mainService, $state){

    // $scope.boards = [];
    $scope.readBoard = function(){
        mainService.readBoard().then(function(response){
          $scope.boards = response;
        })
    };
    $scope.readBoard();
    $scope.createBoard = function () {
        mainService.createBoard($scope.newTitle).then(function (response) {
          $state.go("card",{id:response._id})
        })
        $scope.readBoard();

    };
    $scope.remove = function(boardId) {

      mainService.deleteBoard(boardId)
      .then(function () {
        $scope.readBoard();
      });
}
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
});
