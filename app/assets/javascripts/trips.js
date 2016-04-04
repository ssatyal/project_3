"use strict";

(function(){
  angular
  .module("trips", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])

  function RouterFunction($stateProvider){
    $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "ng-views/welcome.html",
      controller: "indexCtrl",
      controllerAs: "indexViewModel"
    })
    .state("show", {
      url: "/:id",
      templateUrl: "ng-views/trip.show.html",
      controller: "showCtrl",
      controllerAs: "showVM"
    })
  };
})();
