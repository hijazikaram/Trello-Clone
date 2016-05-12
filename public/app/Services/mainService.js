angular.module('myPortfolio').service('mainService', function($http){


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

});
