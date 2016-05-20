var app = angular.module('myPortfolio',['ui.router','angularModalService']);
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('Settings', {
    templateUrl: './../routes/Settings.html',
    controller: 'SettingsCtrl',
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
      board:function($stateParams, mainService) {
        console.log('$stateParams', $stateParams.id);
        return mainService.readBoardById($stateParams.id)
        .then(function(response) {
          console.log("resolve", response);
          return response;
        })
      }
    }
  })

    $urlRouterProvider.otherwise('/Signin');

});
