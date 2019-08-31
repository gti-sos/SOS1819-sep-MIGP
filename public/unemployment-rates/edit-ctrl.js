/* global angular */

angular
    .module("App")
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
                    $scope.mensaje = "El recurso con id "+country+ " "+year+"ha sido actualizado con exito";
                    $scope.stateCode = response.status + ", " + response.statusText;
                }, function(error) {
                    $scope.mensaje = "Introduce correctamente los datos";
                    $scope.stateCode = error.status + ", " + error.statusText;
                }) 
            $location.path("/ui/v1/unemployment-rates");
        }
    }])