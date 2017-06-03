carmenSandiegoApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider

    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      /*controller: "AgregarTareaController as tareasCtrl"*/
    })

    .state('archiveFiles', {
      url: "/archiveFiles",
      templateUrl: "partials/archiveFiles.html",
      controller: "VillanosCtrl as villanos"
    })

    .state('archiveFilesEditing', {
      url: "/archiveFiles/:id",
      templateUrl: "partials/archiveFiles.html",
      controller: "VillanosCtrl as villanos"
    })
    
    .state('worldMap', {
      url: "/worldMap",
      templateUrl: "partials/worldMap.html",
      controller: "PaisesCtrl as paises"
    })

    .state('worldMapEditing', {
      url: "/worldMap/:id",
      templateUrl: "partials/worldMap.html",
      controller: "PaisesCtrl as paises"
    })

    .state('game', {
      url: "/game",
      templateUrl: "partials/game.html",
      controller: "JuegoCtrl as juego"
    });


});