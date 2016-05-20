angular.module('myPortfolio').service('mainService', function($http) {


    this.readBoard = function(board) {
        return $http({
            method: "GET",
            url: "/board"
        }).then(function(response) {
            return response.data
        })
    };
    this.logout = function() {
        return $http({
            method: "GET",
            url: "/board"
        }).then(function(response) {
            return response
        })
    };
    this.register = function (user) {
      return $http({
        method: "POST",
        url: "/users",
        data: user
      }).then(function (response) {
        return response
      })
    }
    this.login = function (user) {
      return $http({
        method: "POST",
        url: "/login",
        data: user
      }).then(function (response) {
        return response
      })
    }
    this.getCurrentUser = function(id) {
        return $http({
            method: "GET",
            url: "/me",
        }).then(function(response) {
            return response.data
        })
    };
    this.updateUser = function(user, newpass) {
      if (newpass.password) {
        user.password = newpass.password
      }
        return $http({
            method: "PUT",
            url: "/users/" + user._id,
            data: user
        }).then(function(response) {
            return response.data;
        })
    };
    this.readBoardById = function(id) {
      console.log(id);
        return $http({
            method: "GET",
            url: "/board/id/" + id
        }).then(function(response) {
          console.log(response);
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
        return $http({
            method: "PUT",
            url: "/list/" + list._id,
            data: {
                cards: list.cards
            }
        }).then(function(response) {
            return response.data;
        })
    };
    this.deleteBoard = function(boardId) {
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
        return $http({
            method: "DELETE",
            url: "/list/" + listId._id
        }).then(function(response) {
            return response.data
        })
    };
    this.deleteCard = function(cardId) {
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
    this.updateBoard = function(board) {
        return $http({
            method: "PUT",
            url: "/board/" + board._id,
            data: board
        }).then(function(response) {
            return response.data;
        })
    };

});
