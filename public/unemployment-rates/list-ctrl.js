/* global angular */

var app = angular.module("App");

app.controller("ListCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("ListCtrl ready");

    $scope.url = "/api/v1/unemployment-rates";

    $scope.mensaje = "Ninguna acción realizada";
    
    $scope.pagina = 0;
    
    
    var API = $scope.url = "/api/v1/unemployment-rates";

    function refresh() {
        $http.get(API+ "?offset="+$scope.pagina+"&limit=10").then(function(response) {
            console.log("Datos recibidos " + JSON.stringify(response.data, null, 2));
            $scope.unemploymentRates = response.data;

        });
    };

    $scope.cargaInicial = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {

            $scope.mensaje = "Datos iniciales cargados";
            $scope.stateCode = response.status + ", " + response.statusText;
            refresh();
        }, function(error) {
            $scope.mensaje = "La base de datos obtiene datos, bórrelos todos para cargarlos de nuevo";
            $scope.stateCode = error.status + ", " + error.statusText;
            refresh();
        });
    }
    
    $scope.addNewRate = function() {

        var newRate = $scope.newRate;
        console.log("añadiendo una nueva estadística " + JSON.stringify(newRate, null, 2));

        $http.post($scope.url, newRate).then(function(response) {
            console.log("Creado correctamente!");
            $scope.mensaje = " Dato añadido a la base de datos";
            $scope.stateCode = response.status + ", " + response.statusText;
            refresh();
        }, function(error) {
            if (error.status == 409) {
                $scope.mensaje = "El recurso ya existe en la base de datos";
                $scope.stateCode = error.status + ", " + error.statusText;
                refresh();

            }
            else {
                $scope.mensaje = "Introduzca correctamente los datos";
                $scope.stateCode = error.status + ", " + error.statusText;
                refresh();
            }

        });
    };
    
    $scope.updaterate = function () {
       var newRate = $scope.newRate;
       console.log("editando el recurso: "+ newRate.country +" , "+newRate.year);
       
       $http.put($scope.url + "/" + newRate.country + "/" + newRate.year, newRate).then(function(response){
           console.log("Editado correctamente!");
           $scope.mensaje = "El recurso ha sido editado correctamente";
           $scope.stateCode = response.status + ", " + response.statusText;
            refresh();
       }, function(error) {
           if(error.status == 404){
                console.log("El recurso no se ha encontrado")
                $scope.mensaje = "El recurso no se ha encontrado";
                $scope.stateCode = error.status + ", " + error.statusText;
                refresh();
           } else {
                console.log("Los datos no se han introducido bien");
                $scope.mensaje = "El id del recurso no se ha introducido correctamente";
                $scope.stateCode = error.status + ", " + error.statusText;
                refresh();
           }
              
       });
    };
   
    $scope.deleterate = function(country, year) {

        $http.delete($scope.url+"/"+country+"/"+year).then(function(response) {
            console.log("Deleting field with province " + country + " and year " + year);
            $scope.stateCode = response.status + ", " + response.statusText;
            $scope.mensaje = "Recurso borrado";
            refresh();

        }, function(error) {
            $scope.stateCode = error.status + ", " + error.statusText;
            $scope.mensaje = "No se encuentra el recurso";
            refresh();
        });
    };

    $scope.deleteAllData = function() {

        $http.delete($scope.url).then(function(response) {
            $scope.mensaje = "Datos borrados";
            $scope.stateCode = response.status + ", " + response.statusText;
            console.log("Datos borrados");
            refresh();
        }, function(error) {
            $scope.stateCode = error.status + ", " + error.statusText;
            $scope.mensaje = "La base de datos está vacía";
            refresh();
        });
        
    };


    $scope.buscarDesdeHasta = function(from, to) {
        console.log("buscando...");
        $http({
            url: $scope.url,
            method: "GET",
            params: { from: $scope.from, to: $scope.to }
        }).then(function(response) {
            $scope.unemploymentRates = response.data;
            console.log("Búsqueda realizada " + JSON.stringify(response.data, null, 2));
            $scope.mensaje = "Búsqueda realizada de "+from+" a "+to;
            $scope.stateCode = response.status + ", " + response.statusText;
        }, function(error) {
            $scope.stateCode = error.status + ", " + error.statusText;
            $scope.mensaje = "No se encuentran datos desde "+from+" a "+to;

        });
    };


    $scope.buscarRecurso = function(year) {
        console.log("Buscando ... ");
        $http.get($scope.url+"/"+year).then(function(response) {
            $scope.unemploymentRates = response.data;
            console.log("Búsqueda realizada" + JSON.stringify(response.data, null, 2));
            $scope.unemploymentRates = response.data;
            $scope.mensaje = "Búsqueda realizada con éxito";
            $scope.stateCode = response.status + ", " + response.statusText;
            refresh();
        }, function(error) {
            refresh();
            $scope.stateCode = error.status + ", " + error.statusText;
            $scope.mensaje = "No existen recursos con el año: "+year;
        });
        
    };
    
    $scope.anterior = function() {
        console.log("Volviendo a la página anterior");
        if($scope.pagina<=0){
            $scope.mensaje = "Ya está en la página 1";
            $scope.stateCode = "";
            console.log("Ya está en la página 1");
        } else {
            $scope.pagina = $scope.pagina - 10;
            $http.get(API + "?offset="+$scope.pagina+"&limit=10").then(function(response) {
                $scope.unemploymentRates = response.data;
                $scope.mensaje = "Volviendo a la página anterior";
                $scope.stateCode = "";
                console.log("Volviendo a la página anterior");
            });
                
        }
            
    
    }
    
    $scope.siguiente = function() {
            $scope.pagina = $scope.pagina + 10;
            $http.get(API + "?offset="+$scope.pagina+"&limit=10").then(function(response) {
                if(response.data.length == 0) {
                    $scope.pagina = $scope.pagina - 10;
                    $scope.stateCode = "";
                    console.log("La siguiente página se encuentra vacía");
                    $scope.mensaje = "La siguiente página se encuentra vacía";
                } else {
                    console.log("Avanzando a la siguiente página");
                    $scope.stateCode = "";
                    $scope.mensaje = "Avanzando a la siguiente página";
                    $scope.unemploymentRates = response.data;
                }
            });
            
    }
    
    refresh();
    
}]);
