
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
});
