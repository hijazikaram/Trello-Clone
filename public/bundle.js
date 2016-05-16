/*angular-modal-service v0.6.9 - https://github.com/dwmkerr/angular-modal-service */ ! function() {
    "use strict";
    var e = angular.module("angularModalService", []);
    e.factory("ModalService", ["$animate", "$document", "$compile", "$controller", "$http", "$rootScope", "$q", "$templateRequest", "$timeout", function(e, n, r, t, l, o, c, u, a) {
        function i() {
            var n = this,
                l = function(e, n) {
                    var r = c.defer();
                    return e ? r.resolve(e) : n ? u(n, !0).then(function(e) {
                        r.resolve(e)
                    }, function(e) {
                        r.reject(e)
                    }) : r.reject("No template or templateUrl has been specified."), r.promise
                },
                i = function(n, r) {
                    var t = n.children();
                    return t.length > 0 ? e.enter(r, n, t[t.length - 1]) : e.enter(r, n)
                };
            n.showModal = function(n) {
                var u = c.defer(),
                    p = n.controller;
                return p ? (l(n.template, n.templateUrl).then(function(l) {
                    var p = (n.scope || o).$new(),
                        d = c.defer(),
                        f = c.defer(),
                        m = {
                            $scope: p,
                            close: function(n, r) {
                                (void 0 === r || null === r) && (r = 0), a(function() {
                                    d.resolve(n), e.leave($).then(function() {
                                        f.resolve(n), p.$destroy(), m.close = null, u = null, d = null, j = null, m = null, $ = null, p = null
                                    })
                                }, r)
                            }
                        };
                    n.inputs && angular.extend(m, n.inputs);
                    var v = r(l),
                        $ = v(p);
                    m.$element = $;
                    var h = p[n.controllerAs],
                        g = t(n.controller, m, !1, n.controllerAs);
                    n.controllerAs && h && angular.extend(g, h), n.appendElement ? i(n.appendElement, $) : i(s, $);
                    var j = {
                        controller: g,
                        scope: p,
                        element: $,
                        close: d.promise,
                        closed: f.promise
                    };
                    u.resolve(j)
                }).then(null, function(e) {
                    u.reject(e)
                }), u.promise) : (u.reject("No controller has been specified."), u.promise)
            }
        }
        var s = n.find("body");
        return new i
    }])
}();
//# sourceMappingURL=angular-modal-service.min.js.map

var app = angular.module('myPortfolio',['ui.router','angularModalService']);
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
  .state('Signup', {
    templateUrl: './../routes/Signup.html',
    controller: 'SignupCtrl',
    url: '/Signup'
  })
  .state('Signin', {
    templateUrl: './../routes/Signin.html',
    controller: 'SigninCtrl',
    url: '/Signin'
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

    $urlRouterProvider.otherwise('/Signin');

}]);

// angular.module('myPortfolio').controller('ListCtrl', function($scope, $state){
//         $state.go('List', {id:id});
// });


angular.module('myPortfolio').controller('SigninCtrl', ["$scope", "mainService", "$state", function($scope, mainService, $state){
    $scope.login = function () {
      console.log("its working");
      mainService.login($scope.credentials).then(function (response) {
        $state.go('Home');
        $scope.user = response.data._id;
        alert("Welcome to Trello");
      })
    }
}]);

angular.module('myPortfolio').controller('SignupCtrl', ["$scope", "mainService", function($scope, mainService){
    $scope.register = function () {
      console.log("its working");
      mainService.register($scope.newUser).then(function (response) {
      })
    }
}]);

angular.module('myPortfolio').controller('cardCtrl', ["$scope", "mainService", "$state", "board", "ModalService", function($scope, mainService, $state, board, ModalService) {
    $scope.board = board;
    $scope.show = false;
    $scope.isInput = false;
    $scope.showCard = false;
    $scope.newTitle = "";
    $scope.input1 = "";

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
    $scope.closePopups = function() {
        $('.pop-menu').hide();
        $scope.toggle = false;
        // $(".div-outer-outer-outer").modal({backdrop: true});
    };
}]);

angular.module('myPortfolio').controller('editCardCtrl', ["$scope", "mainService", "$state", "close", function($scope, mainService, $state, close) {
    $scope.close = close;
}]);


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

angular.module('myPortfolio').service('mainService', ["$http", function($http) {


    this.readBoard = function() {
        return $http({
            method: "GET",
            url: "/board"
        }).then(function(response) {
            return response.data
        })
    };
    this.register = function (user) {
      console.log(user);
      return $http({
        method: "POST",
        url: "/users",
        data: user
      }).then(function (response) {
        return response
      })
    }
    this.login = function (user) {
      console.log(user);
      return $http({
        method: "POST",
        url: "/login",
        data: user
      }).then(function (response) {
        return response
      })
    }
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

}]);

angular.module('myPortfolio').directive('listcardsDirective', ["mainService", "$state", function(mainService, $state) {
    return {
        restrict: 'AE',
        templateUrl: './app/navDirectives/listcardsDirective.html',
        // scope: {
        //   list: '='
        // },
        controller: ["$scope", function($scope) {
            setTimeout(function() {
                $('.pop-menu').hide();
            }, 5);
            $scope.openPopup = function(id, title) {
                $('.' + title + id + '.pop-menu').show('.');

                $scope.toggle = true;
            }
            $scope.remove1 = function(index) {
                $scope.list.cards.splice(index, 1);
                mainService.updateList($scope.list).then(function() {
                    $scope.closePopups();
                });
            };
            $scope.updateCard = function(list) {
                mainService.updateList($scope.list).then(function() {
                  $scope.closePopups();
                })
            };
            $scope.closePopups = function() {
                $('.pop-menu').hide();
                $scope.toggle = false;
            }

        }]
    }
}]);

angular.module('myPortfolio').directive('navDirective', function(){
  return{
    templateUrl: './app/navDirectives/navDirectiveTmpl.html'
  }

});

/*angular-modal-service v0.6.9 - https://github.com/dwmkerr/angular-modal-service */
!function(){"use strict";var e=angular.module("angularModalService",[]);e.factory("ModalService",["$animate","$document","$compile","$controller","$http","$rootScope","$q","$templateRequest","$timeout",function(e,n,r,t,l,o,c,u,a){function i(){var n=this,l=function(e,n){var r=c.defer();return e?r.resolve(e):n?u(n,!0).then(function(e){r.resolve(e)},function(e){r.reject(e)}):r.reject("No template or templateUrl has been specified."),r.promise},i=function(n,r){var t=n.children();return t.length>0?e.enter(r,n,t[t.length-1]):e.enter(r,n)};n.showModal=function(n){var u=c.defer(),p=n.controller;return p?(l(n.template,n.templateUrl).then(function(l){var p=(n.scope||o).$new(),d=c.defer(),f=c.defer(),m={$scope:p,close:function(n,r){(void 0===r||null===r)&&(r=0),a(function(){d.resolve(n),e.leave($).then(function(){f.resolve(n),p.$destroy(),m.close=null,u=null,d=null,j=null,m=null,$=null,p=null})},r)}};n.inputs&&angular.extend(m,n.inputs);var v=r(l),$=v(p);m.$element=$;var h=p[n.controllerAs],g=t(n.controller,m,!1,n.controllerAs);n.controllerAs&&h&&angular.extend(g,h),n.appendElement?i(n.appendElement,$):i(s,$);var j={controller:g,scope:p,element:$,close:d.promise,closed:f.promise};u.resolve(j)}).then(null,function(e){u.reject(e)}),u.promise):(u.reject("No controller has been specified."),u.promise)}}var s=n.find("body");return new i}])}();
//# sourceMappingURL=angular-modal-service.min.js.map
