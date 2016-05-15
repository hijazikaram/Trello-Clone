angular.module('myPortfolio').service('mainService', function($http) {


    this.readBoard = function() {
        return $http({
            method: "GET",
            url: "/board"
        }).then(function(response) {
            return response.data
        })
    };
    this.readBoardById = function(id) {
        return $http({
            method: "GET",
            url: "/board?_id=" + id
        }).then(function(response) {
            return response.data
        })
    };
    this.createBoard = function(newTitle) {
        return $http({
            method: "POST",
            url: "/board",
            data: {
                title: newTitle
            }
        }).then(function(response) {
            return response.data
        })
    };

    this.updateList = function(list) {
        console.log("updating mainservice list: ", list._id);
        return $http({
            method: "PUT",
            url: "/list/"+ list._id,
            data: {
              cards: list.cards
            }
        }).then(function(response) {
            return response.data;
        })
    };

    this.deleteBoard = function(boardId) {
        console.log(boardId);
        return $http({
            method: "DELETE",
            url: "/board/" + boardId._id
          }).then(function(response) {
            return response.data
          })
    };

    this.readList = function(id) {
        return $http({
            method: "GET",
            url: "/list",
            // ?_id=" + id
        }).then(function(response) {
            return response.data
        })
    };
    this.createList = function(newTitle, board) {
        return $http({
            method: "POST",
            url: "/list",
            data: {
                title: newTitle,
                lists: [],
                board: board
            }
        }).then(function(response) {
            return response.data
        })
    };
    this.deleteList = function(listId) {
        console.log(listId);
        return $http({
            method: "DELETE",
            url: "/list/" + listId._id
        }).then(function(response) {
            return response.data
        })
    };
    this.deleteCard = function(cardId) {
        console.log(cardId);
        return $http({
            method: "DELETE",
            url: "/list/" + cardId._id
        }).then(function(response) {
            return response.data
        })
    };
    this.readListByBoard = function(id) {
        return $http({
            method: "GET",
            url: "/list?board=" + id
        }).then(function(response) {
            return response.data
        })
    };

});
