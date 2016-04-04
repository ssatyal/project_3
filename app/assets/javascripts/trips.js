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
  .factory( "TripFactory", [
        "$resource",
        TripFactory
      ])
  .controller("indexCtrl", [
    "TripFactory",
    indexControllerFunction
  ])
  .controller( "showCtrl", [
    "TripFactory",
    "$stateParams",
    showStrlFunction
  ]);

  function showStrlFunction( TripFactory, $stateParams ){
  this.trip = TripFactory.get({id: $stateParams.id});
  };

  function indexControllerFunction(Trip){
    var indexVM = this;
    indexVM.trips = Trip.all;
  };

  function TripFactory( $resource ){
    var Trip = $resource( "http://localhost:3000/trips/:id.json", {}, {
      update: { method: "PUT" }
    });
    Trip.all = Trip.query();
    return Trip;
  };

  function RouterFunction($stateProvider){
    $stateProvider
    .state("tripIndex", {
      url: "/trips",
      templateUrl: "ng-views/trip.index.html",
      controller: "indexCtrl",
      controllerAs: "indexVM"
    })
    .state("show", {
      url: "/trips/:id",
      templateUrl: "ng-views/trip.show.html",
      controller: "showCtrl",
      controllerAs: "showVM"
    })
  };
})();
