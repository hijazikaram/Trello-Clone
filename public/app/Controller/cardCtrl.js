angular.module('myPortfolio').controller('cardCtrl', function($scope, mainService, $state, board, ModalService, $stateParams) {
    $scope.board = board;
    $scope.show = false;
    $scope.isInput = false;
    $scope.showCard = false;
    $scope.newTitle = "";
    $scope.input1 = "";

    $scope.getBoard = function() {
      console.log($scope.board, 'get board');
      return mainService.readBoardById($stateParams.id)
      .then(function(response) {
        console.log(response);
        $scope.board = response;
      })
    }

    $scope.updateBoard = function () {
      console.log($scope.board, 'update board');

      mainService.updateBoard($scope.board).then(function (response) {
        $scope.getBoard()

      })
    };
    // $scope.readBoardById = function () {
    //   mainService.readBoardById($stateParams.id).then(function (response) {
    //
    //   })
    // }

    $scope.createList = function() {
        console.log("createList");
        mainService.createList($scope.newTitle, $scope.board._id).then(function(response) {
            $scope.list = response;
            $scope.newTitle = "";
            console.log(response);
            $scope.getLists();
        })
    };
    // $scope.remove = function(cardId) {
    //
    //     mainService.deleteCard(cardId)
    //         .then(function() {
    //             $scope.getLists();
    //         });
    // };

    $scope.getLists = function() {
        mainService.readListByBoard($scope.board._id).then(function(response) {
          console.log(response);
            $scope.lists = response;
        })
    };
    $scope.getLists();
    $scope.remove = function(listId) {

        mainService.deleteList(listId)
            .then(function() {
                $scope.getLists();
            });
    };

    $scope.openForm = function(user) {
        console.log("its working");
        ModalService.showModal({
            // Template file for modal
            templateUrl: "./../routes/editCard.html",
            // Controller file for modal
            controller: "editCardCtrl",
            // Variables being passed into modal
            // inputs: {
            //     // Will be injected into controller as 'user'
            //     user: user
            // }
        }).then(function(modal) {
            // Funtion that runs when modal closes
            modal.close.then(function(then) {
                // then = whatever the close() function in the modal returns
                $scope.user = then;
            });
        });
    };

    $scope.saveInput = function(input, list) {
        console.log(input, list);
        list.cards.push({
            content: input
        });
        mainService.updateList(list).then(function() {
            $scope.input1 = "";
            $scope.closePopups();
        });

    };
    $scope.saveBackgroundColor = function(input, board) {
        mainService.updateBoard(board).then(function(response) {
              $scope.getBoard();
        });

    };
    $scope.closePopups = function() {
        $('.pop-menu').hide();
        $scope.toggle = false;
        // $(".div-outer-outer-outer").modal({backdrop: true});
    };
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
