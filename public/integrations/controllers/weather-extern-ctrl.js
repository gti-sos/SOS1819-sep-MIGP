/* global angular */

var app = angular.module("App");

app.controller("WeatherCtrl", 
    ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer){
         
         
        var ExternAPI = "/proxyExt1";     
        
        $http.get(ExternAPI).then(function(response) {
            
            var fechas = response.data.consolidated_weather.map(c => c.applicable_date);
            var humedad = response.data.consolidated_weather.map(c => c.humidity)
            var precipitaciones = response.data.consolidated_weather.map(c => c.predictability)
        
        
            let chartConfig = {
              type: 'line',
              title: {
                text: 'Precipitaciones y humedad en Barcelona'
              },
              plot: {
                tooltip: {
                  visible: false
                },
                cursor: 'hand'
              },
              scaleX: {
                markers: [],
                offsetEnd: '75px',
                labels: fechas
              },
              crosshairX: {},
              series: [
                {
                  text: 'Humedad',
                  values: humedad
                },
                {
                  text: 'Precipitaciones',
                  values: precipitaciones
                }
              ]
            };
             
            zingchart.render({
              id: 'myChart',
              data: chartConfig
            });
             
            
            
        });
        
        

}]);