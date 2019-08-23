/* global angular */

var app = angular.module("App");

app.controller("APICtrl", 
    ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer){
         
         
        var API = "https://sos1819-sep-migp.herokuapp.com/api/v1/unemployment-rates";
        
        $http.get(API).then(function(response) {
            
           var countries = [];
           var i = 0;
           
           for(i=0;i<response.length;i++){
               if(!countries.includes(response.data[i])) {
                   countries.push(response.data[i]);
               }
           }
           
           //-------------------------------HIGHCHARTS--------------------------------------------
           Highcharts.chart('container', {
              chart: {
                type: 'bar'
              },
              title: {
                text: 'Desempleo juvenil por países'
              },
              xAxis: {
                categories: ["España", "France", "Germany"],
                title: {
                  text: null
                }
              },
              yAxis: {
                min: 0,
                title: {
                  text: 'Desempleo juvenil (porcentaje)',
                  align: 'high'
                },
                labels: {
                  overflow: 'justify'
                }
              },
              tooltip: {
                valueSuffix: ' porcentaje '
              },
              plotOptions: {
                bar: {
                  dataLabels: {
                    enabled: true
                  }
                }
              },
              legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
              },
              credits: {
                enabled: false
              },
              series: [{
                name: 'Año 2017',
                data: [response.data.filter(c => c.country == "Spain" && c.year == 2017)[0].youthUnemployment,
                        response.data.filter(c => c.country == "France" && c.year == 2017)[0].youthUnemployment,
                        response.data.filter(c => c.country == "Germany" && c.year == 2017)[0].youthUnemployment]
              }, {
                name: 'Año 2018',
                data: [response.data.filter(c => c.country == "Spain" && c.year == 2018)[0].youthUnemployment,
                        response.data.filter(c => c.country == "France" && c.year == 2018)[0].youthUnemployment,
                        response.data.filter(c => c.country == "Germany" && c.year == 2018)[0].youthUnemployment]
              }]
            });
            
            //-------------------------------GEOCHART-------------------------------------------
             google.charts.load('current', {
                'packages':['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
              });
              google.charts.setOnLoadCallback(drawRegionsMap);
        
              function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable([
                  ['País', 'Porcentaje de paro'],
                  [response.data.filter(c => c.country == "Spain" && c.year == "2018")[0].country, response.data.filter(c => c.country == "Spain" && c.year == "2018")[0].rate],
                  [response.data.filter(c => c.country == "Germany" && c.year == "2018")[0].country, response.data.filter(c => c.country == "Germany" && c.year == "2018")[0].rate],
                  [response.data.filter(c => c.country == "France" && c.year == "2018")[0].country, response.data.filter(c => c.country == "France" && c.year == "2018")[0].rate],
                ]);
        
                var options = {};
        
                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        
                chart.draw(data, options);
              }
              
              //--------------------------------C3.js--------------------------------------------
              
              var chart = c3.generate({
                    bindto: '#chart',
                    data: {
                      columns: [
                        ['data1', 30, 200, 100, 400, 150, 250],
                        ['data2', 50, 20, 10, 40, 15, 25]
                      ]
                    }
                });
        });

    }]);