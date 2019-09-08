/* global angular */

var app = angular.module("App");

app.controller("APICtrl", 
    ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer){
         
         
        var API = "https://sos1819-sep-migp.herokuapp.com/api/v1/unemployment-rates";
        
        $http.get(API).then(function(response) {
            
            var rates = response.data;
            var paises = [];
            rates.filter((c) => {
                   if((c.year == 2018 || c.year == 2017 || c.year == 2016) && !paises.includes(c.country)){
                       paises.push(c.country);
                   } 
                });
            var year2016 = [];
            var year2017 = [];
            var year2018 = [];
            paises.filter((c) => {
                if(rates.filter(x => x.country == c && x.year==2016)[0] == undefined){
                    year2016.push("");
                } else {
                    year2016.push(rates.filter(y => y.country == c && y.year==2016)[0].femaleUnemployment);
                }
                if(rates.filter(x => x.country == c && x.year==2017)[0] == undefined){
                    year2017.push("");
                } else {
                    year2017.push(rates.filter(y => y.country == c && y.year==2017)[0].femaleUnemployment);
                }
                if(rates.filter(x => x.country == c && x.year==2018)[0] == undefined){
                    year2018.push();
                } else {
                    year2018.push(rates.filter(y => y.country == c && y.year==2018)[0].femaleUnemployment);
                }
                
            })
            console.log(rates);
            console.log(year2016);
            console.log(year2017);
            console.log(year2018);
           //-------------------------------HIGHCHARTS--------------------------------------------
           Highcharts.chart('container', {
              chart: {
                type: 'bar'
              },
              title: {
                text: 'Desempleo femenino'
              },
              xAxis: {
                  
                categories: paises,
                title: {
                  text: null
                }
              },
              yAxis: {
                min: 0,
                title: {
                  text: 'Porcentaje (%)',
                  align: 'high'
                },
                labels: {
                  overflow: 'justify'
                }
              },
              tooltip: {
                valueSuffix: ' %'
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
                name: 'Year 2016',
                data: year2016
              }, {
                name: 'Year 2017',
                data: year2017
              }, {
                name: 'Year 2018',
                data: year2018
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
                  
                var array = [['País', 'Porcentaje de paro']];  
                var datos = rates.filter((c) => {
                   if(c.year==2018) {
                       return array.push([c.country, c.rate]);
                   } 
                });
                var data = google.visualization.arrayToDataTable(array);
        
                var options = {};
        
                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        
                chart.draw(data, options);
              }
              
              //--------------------------------C3.js--------------------------------------------
              
              var c3datos = [];
              paises.filter((c) => {
                  
                  var ar = [c];
                  if(rates.filter(x => x.country == c && x.year==2016)[0] == undefined){
                      ar.push("");
                    } else {
                        ar.push(rates.filter(y => y.country == c && y.year==2016)[0].femaleUnemployment);
                    }
                    if(rates.filter(x => x.country == c && x.year==2017)[0] == undefined){
                        ar.push("");
                    } else {
                        ar.push(rates.filter(y => y.country == c && y.year==2017)[0].femaleUnemployment);
                    }
                    if(rates.filter(x => x.country == c && x.year==2018)[0] == undefined){
                        ar.push();
                    } else {
                        ar.push(rates.filter(y => y.country == c && y.year==2018)[0].femaleUnemployment);
                    }
                    c3datos.push(ar);
              });
              
              var chart = c3.generate({
                    bindto: '#chart',
                    data: {
                      columns: c3datos
                    }
                });
        });

    }]);