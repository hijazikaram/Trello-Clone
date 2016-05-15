var app = angular.module('myPortfolio',['ui.router','angularModalService']);
app.config(function ($stateProvider, $urlRouterProvider) {
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
      board:function($stateParams, mainService) {
        return mainService.readBoardById($stateParams.id)
        .then(function(response) {
          console.log(response);
          return response[0];
        })
      }
    }
  })

    $urlRouterProvider.otherwise('/Home');

});
