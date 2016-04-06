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
  .factory( "Trip", [
    "$resource",
    Trip
  ])
  .factory( "SearchFactory", [
    "$resource",
    SearchFactory
  ])
  .controller("indexCtrl", [
    "SearchFactory",
    "Trip",
    indexControllerFunction
  ])
  .controller( "tripNewCtrl", [
    "Trip",
    "$stateParams",
    tripFormFunction
  ])
  .controller( "tripEditCtrl", [
    "Trip",
    "$stateParams",
    tripEditControllerFunction
  ])
  .controller( "tripShowCtrl", [
    "SearchFactory",
    "Trip",
    "$stateParams",
    showCtrlFunction
  ])
  .directive("tripForm",[
    "Trip",
    tripFormDirectiveFunction
  ]);

  function showCtrlFunction( Search, Trip, $stateParams ){
    var showVM = this;
    showVM.trip = Trip.get({id: $stateParams.id});
    showVM.search = function() {
      showVM.places = Search.query({q:showVM.query}, function(results){
        showVM.places = results;
        console.log(results)
      })
    }
  };

  function indexControllerFunction( Search, Trip ){
    var indexVM = this;
    indexVM.trips = Trip.all;
    indexVM.search = function() {
      indexVM.places = Search.query({q:indexVM.query}, function(results){
        indexVM.places = results;
        console.log(results)
      })
    }
  };

  function Trip( $resource ){
    var Trip = $resource( "http://localhost:3000/trips/:id.json", {}, {
      update: { method: "PUT" }
    });
    Trip.all = Trip.query();
    return Trip;
  };

  function SearchFactory( $resource ){
    var Search = $resource( "http://localhost:3000/trips/1/locations/search", {}, {
      query: {
        method: "GET",
        isArray: true
      },
    });
    Search.all = Search.query()
    return Search;
  };

  function RouterFunction($stateProvider){
    $stateProvider
    .state("tripIndex", {
      url: "/trips",
      templateUrl: "/ng-views/trip.index.html",
      controller: "indexCtrl",
      controllerAs: "indexVM"
    })
    .state("tripNew", {
      url: "/trips/new",
      templateUrl: "/ng-views/trip.new.html",
      controller: "tripNewCtrl",
      controllerAs: "tripNewVM"
    })
    .state("tripEdit", {
      url: "/trips/:id/edit",
      templateUrl: "/ng-views/trip.edit.html",
      controller: "tripEditCtrl",
      controllerAs: "tripEditVM"
    })
    .state("tripShow", {
      url: "/trips/:id",
      templateUrl: "/ng-views/trip.show.html",
      controller: "tripShowCtrl",
      controllerAs: "tripShowVM"
    })
  };
  function tripFormDirectiveFunction(Trip){
    return{
      templateUrl: "/ng-views/_trip_form.html",
      restrict: "C",
      scope: {
        trip: "=",
        formType: "@",
      },
      link: function(scope){
        scope.create = function(){
          Trip.save(scope.trip, function(response){
            Trip.all.push(response);
          });
        }
        scope.update = function(){
          Trip.update({id: scope.trip.id}, scope.trip, function(response){
            console.log("Success")
          })
        }
        scope.delete = function(){
          Trip.delete({id: scope.trip.id}, scope.trip, function(response){
            console.log("Success")
          })
        }
      }
    }
  }
  function tripFormFunction(){

  }

  function tripEditControllerFunction( Trip, $stateParams ) {
    this.trip = Trip.get({id: $stateParams.id});
  }
})();
