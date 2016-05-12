var app = angular.module('myPortfolio',['ui.router']);
app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('Settings', {
    templateUrl: './../routes/Settings.html',
    // controller: 'homeCtrl',
    url: '/Settings'
  })
  .state('Home', {
    templateUrl: './../routes/homeTmpl.html',
    controller: 'homeCtrl',
    url: '/Home'
  })
  .state('card', {
    templateUrl: './../routes/card.html',
     controller: 'cardCtrl',
    url: '/Card/:id',
    resolve: {
      board:["$stateParams", "mainService", function($stateParams, mainService) {
        return mainService.readBoardById($stateParams.id)
        .then(function(response) {
          console.log(response);
          return response[0];
        })
      }]
    }
  })

    $urlRouterProvider.otherwise('/Home');

}]);

// angular.module('myPortfolio').controller('ListCtrl', function($scope, $state){
//         $state.go('List', {id:id});
// });


angular.module('myPortfolio').controller('cardCtrl', ["$scope", "mainService", "$state", "board", function($scope, mainService, $state, board){
  $scope.board = board;
  $scope.show=false;
  $scope.isInput = false;
  $scope.update = function(card, event){
    //TODO Update on server call service
    event.preventDefault();
    event.stopPropagation();
    card.edit = false;
    console.log(card);
  }
  $scope.createList = function () {
      mainService.createList($scope.newTitle).then(function (response) {
      })
      $scope.readList();

  };
}]);


//   $scope.addNewList = function(newListTitle){
//     $scope.lists.push({title:newListTitle,cards:[]});
//     $scope.newList = "";
//   }
//   $scope.lists = [
//     { title:"My First List",
//       cards:[
//       {task:"My First Card"},
//       {task:"My Second Card"},
//       {task:"My Third Card"}
//     ]
//   },
//   { title:"My Second List",
//     cards:[
//     {task:"My 1 Card"},
//     {task:"My 2 Card"},
//     {task:"My 3 Card"}
//   ]
//   }
//   ]
// });
//JQuery


angular.module('myPortfolio').controller('homeCtrl', ["$scope", "mainService", "$state", function($scope, mainService, $state){

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
}]);

// angular.module('myPortfolio').controller('navCtrl', function($scope, mainService, $state){
//     $scope.readBoard = function(){
//         service.readBoard().then(function(response){
//             $scope.boards = response;
//         })
//
//         $scope.createBoard = function () {
//           service.createBoard().then(function (response) {
//             $scope.boards = response;
//           })
//         }
//     };
//  });

angular.module('myPortfolio').service('mainService', ["$http", function($http){


    this.readBoard = function(){
        return $http({
            method: "GET",
            url: "/board"
        }).then(function(response){
            return response.data
        })
    };
    this.readBoardById = function(id){
        return $http({
            method: "GET",
            url: "/board?_id=" + id
        }).then(function(response){
            return response.data
        })
    };
    this.createBoard = function(newTitle){
        return $http({
            method: "POST",
            url: "/board",
            data: {title:newTitle}
        }).then(function(response){
            return response.data
        })
    };
    this.deleteBoard = function(boardId){
      console.log(boardId);
        return $http({
            method: "DELETE",
            url: "/board/" + boardId._id
        }).then(function(response){
            return response.data
        })
    };

    this.readList = function(id){
        return $http({
            method: "GET",
            url: "/list",
            // ?_id=" + id
        }).then(function(response){
            return response.data
        })
    };
    this.createList = function(){
        return $http({
            method: "POST",
            url: "/list",
            data: {title}
        }).then(function(response){
            return response.data
        })
    };
    this.deleteList = function(boardId){
      console.log(boardId);
        return $http({
            method: "DELETE",
            url: "/list",
        }).then(function(response){
            return response.data
        })
    };

}]);

angular.module('myPortfolio').directive('navDirective', function(){
  return{
    templateUrl: './app/navDirectives/navDirectiveTmpl.html'
  }

});
