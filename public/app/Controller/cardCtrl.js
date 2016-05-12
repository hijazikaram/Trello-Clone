angular.module('myPortfolio').controller('cardCtrl', function($scope, mainService, $state, board){
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
});


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
