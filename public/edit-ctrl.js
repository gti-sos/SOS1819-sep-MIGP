/* global angular */

angular
    .module("MiniPostmanApp")
    .controller("EditCtrl", ["$scope","$http", "$routeParams", "$location",
    
    function ($scope, $http, $routeParams, $location) {
        console.log("EditCtrl initialized");
        var API = "/api/v1/unemployment-rates";
        
        var country = $routeParams.country;
        var year = $routeParams.year;
        
        console.log("Requesting rate <"+API+"/"+country+"/"+year+">...");
        
        $http.get(API+"/"+country+"/"+year).then(function(response) {
            console.log("Data Received: " + JSON.stringify(response.data, null, 2));
            $scope.unemploymentRate = response.data;
        });
        
        $scope.updaterate = function(country, year) {
            console.log("Updating rate with country "+country+" and name "+name);
            $http
                .put(API+"/"+country+"/"+year, $scope.unemploymentRate)
                .then(function(response) {
                    console.log("PUT response: "+ response.status + " " + response.data);
                }) 
            $location.path("/ui/v1/unemployment-rates");
        }
    }])