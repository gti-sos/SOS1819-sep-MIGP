/* global angular */

var app = angular.module("App");

app.controller("APICtrl", 
    ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer){
         
         
        var API = "https://sos1819-sep-migp.herokuapp.com/api/v1/unemployment-rates";
        
        $http.get(API).then(function(response) {
            
            var rates = response.data;
           
           //-------------------------------HIGHCHARTS--------------------------------------------
           Highcharts.chart('container', {
              chart: {
                type: 'bar'
              },
              title: {
                text: 'Desempleo femenino'
              },
              xAxis: {
                categories: ['Spain', 'Germany', 'France', 'United States', 'United Kingdom'],
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
                data: [rates.filter(c => c.year == 2016)[0].femaleUnemployment,
                       rates.filter(c => c.year == 2016)[1].femaleUnemployment,
                       rates.filter(c => c.year == 2016)[2].femaleUnemployment, 
                       rates.filter(c => c.year == 2016)[3].femaleUnemployment, 
                       rates.filter(c => c.year == 2016)[4].femaleUnemployment]
              }, {
                name: 'Year 2017',
                data: [rates.filter(c => c.year == 2017)[0].femaleUnemployment,
                       rates.filter(c => c.year == 2017)[1].femaleUnemployment,
                       rates.filter(c => c.year == 2017)[2].femaleUnemployment, 
                       rates.filter(c => c.year == 2017)[3].femaleUnemployment, 
                       rates.filter(c => c.year == 2017)[4].femaleUnemployment]
              }, {
                name: 'Year 2018',
                data: [rates.filter(c => c.year == 2018)[0].femaleUnemployment,
                       rates.filter(c => c.year == 2018)[1].femaleUnemployment,
                       rates.filter(c => c.year == 2018)[2].femaleUnemployment, 
                       rates.filter(c => c.year == 2018)[3].femaleUnemployment, 
                       rates.filter(c => c.year == 2018)[4].femaleUnemployment]
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
                  [rates.filter(c => c.country == "Spain" && c.year == "2018")[0].country, rates.filter(c => c.country == "Spain" && c.year == "2018")[0].rate],
                  [rates.filter(c => c.country == "Germany" && c.year == "2018")[0].country, rates.filter(c => c.country == "Germany" && c.year == "2018")[0].rate],
                  [rates.filter(c => c.country == "France" && c.year == "2018")[0].country, rates.filter(c => c.country == "France" && c.year == "2018")[0].rate],
                  [rates.filter(c => c.country == "United States" && c.year == "2018")[0].country, rates.filter(c => c.country == "United States" && c.year == "2018")[0].rate],
                  [rates.filter(c => c.country == "United Kingdom" && c.year == "2018")[0].country, rates.filter(c => c.country == "United Kingdom" && c.year == "2018")[0].rate]
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
                        ['Spain', rates.filter(c => c.year==2016 && c.country=="Spain")[0].maleUnemployment, rates.filter(c => c.year==2017 && c.country=="Spain")[0].maleUnemployment, rates.filter(c => c.year==2018 && c.country=="Spain")[0].maleUnemployment],
                        ['Germany', rates.filter(c => c.year==2016 && c.country=="Germany")[0].maleUnemployment, rates.filter(c => c.year==2017 && c.country=="Germany")[0].maleUnemployment, rates.filter(c => c.year==2018 && c.country=="Germany")[0].maleUnemployment],
                        ['France', rates.filter(c => c.year==2016 && c.country=="France")[0].maleUnemployment, rates.filter(c => c.year==2017 && c.country=="France")[0].maleUnemployment, rates.filter(c => c.year==2018 && c.country=="France")[0].maleUnemployment],
                        ['United States', rates.filter(c => c.year==2016 && c.country=="France")[0].maleUnemployment, rates.filter(c => c.year==2017 && c.country=="United States")[0].maleUnemployment, rates.filter(c => c.year==2018 && c.country=="United States")[0].maleUnemployment],
                        ['United Kingdom', rates.filter(c => c.year==2016 && c.country=="United Kingdom")[0].maleUnemployment, rates.filter(c => c.year==2017 && c.country=="United Kingdom")[0].maleUnemployment, rates.filter(c => c.year==2018 && c.country=="United Kingdom")[0].maleUnemployment]    
                      ]
                    }
                });
        });

    }]);