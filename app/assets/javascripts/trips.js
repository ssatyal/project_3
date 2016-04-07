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
  .config(["$sceProvider", function($sceProvider){
   $sceProvider.enabled(false);
 }])
  .factory( "Trip", [
    "$resource",
    Trip
  ])
  .factory( "SearchFactory", [
    "$resource",
    SearchFactory
  ])
  .factory( "LocationFactory", [
    "$resource",
    LocationFactory
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
    "LocationFactory",
    showCtrlFunction
  ])
  // .controller("locationNewController", [
  //   "Trip",
  //   "$stateParams",
  //   "LocationFactory",
  //   locationNewControllerFunction
  // ])
  .directive("tripForm",[
    "Trip",
    tripFormDirectiveFunction
  ]);

  function showCtrlFunction( Search, Trip, $stateParams, LocationFactory ){
    var showVM = this;
    showVM.trip = Trip.get({id: $stateParams.id})
    showVM.trip.$promise.then(function(trip){
      showVM.mapUrl = generateMapURL(trip.locations);
      // console.log(showVM.mapUrl);
      // console.log("showVM trip assign:", trip)
      // showVM.trip = trip;
    });
    showVM.search = function() {
      showVM.places = Search.query({q:showVM.query}, function(results){
        showVM.places = results;
        // console.log(results)
      })
    };
    showVM.location = new LocationFactory();
    showVM.createLocation = function(trip_id, name, lat, long, place_id){
      console.log("create", trip_id)
      showVM.location.$save({trip_id: trip_id, name: name, lat: lat, long: long, place_id: place_id});
    }
  };

  function indexControllerFunction( Search, Trip ){
    var indexVM = this;
    indexVM.trips = Trip.all;
  };

  function Trip( $resource ){
    var Trip = $resource( "http://localhost:3000/trips/:id.json", {}, {
      update: {
        method: "PUT",
        isArray: true
      },
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

  function LocationFactory( $resource ){
    var Location = $resource( "http://localhost:3000/trips/:trip_id/locations/:id", {trip_id: "@trip_id"}, {
      update: {
        method: "PUT"
        // isArray: true
      }
    });
    return Location;
  }

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
          })
        }
        scope.delete = function(){
          Trip.delete({id: scope.trip.id}, scope.trip, function(response){
          })
        }
      }
    }
  }
  // function locationNewControllerFunction( Trip, $stateParams, LocationFactory ){
  //
  // }
  function tripFormFunction(){

  }

  function tripEditControllerFunction( Trip, $stateParams ) {
    this.trip = Trip.get({id: $stateParams.id});
  }

  function generateMapURL(args) {
    console.log(args.length)
	var string = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAg39LEeoWxSherOtvNqnYGg24ojPJFJDM&";
	if (args.length === 1 ){
    console.log("arg 1")
    return string+="origin=place_id:"+args[0].place_id+"&destination=place_id:"+args[0].place_id
	}
	if (args.length === 2){
    console.log("arg 2")
  return string+="origin=place_id:"+args[0].place_id+"&destination=place_id:"+args[1].place_id
  }
	var first = args.shift();
	var last = args.pop();
	var middle = args.map(function(d){
		return "&waypoints=place_id:"+d.place_id;
    }).join("")
    console.log("arg 3")
    console.log(middle)

	return string+="origin=place_id:"+first.place_id+middle+"&destination=place_id:"+last.place_id
  }
})();
