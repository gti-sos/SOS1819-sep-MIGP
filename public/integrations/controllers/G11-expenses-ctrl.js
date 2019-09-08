/* global angular */

var app = angular.module("App");

app.controller("ExpensesCtrl", 
    ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer){
         
         
        var API = "https://sos1819-sep-migp.herokuapp.com/api/v1/unemployment-rates";
        var API2 = "https://sos1819-11.herokuapp.com/api/v1/general-public-expenses";
        
        
        $http.get(API).then(function(response) {
            $http.get(API2).then(function(response2) {
                
                var uRates = response.data;
                var countries =  ["Spain", "Germany" , "France", "United States", "United Kingdom"];
                var youthRates = [ uRates.filter((x) => x.country=="Spain" && x.year==2018)[0].youthUnemployment, 
                                    uRates.filter((x) => x.country=="Germany" && x.year==2018)[0].youthUnemployment, 
                                    uRates.filter((x) => x.country=="France" && x.year==2018)[0].youthUnemployment, 
                                    uRates.filter((x) => x.country=="United States" && x.year==2018)[0].youthUnemployment, 
                                    uRates.filter((x) => x.country=="United Kingdom" && x.year==2018)[0].youthUnemployment];
                var eE = response2.data;
                
                
               
               Highcharts.chart('container', {
                  chart: {
                    zoomType: 'xy'
                  },
                  title: {
                    text: 'Porcentaje del gasto en educación y desempleo juvenil'
                  },
                  xAxis: [{
                    categories: countries,
                    crosshair: true
                  }],
                  yAxis: [{ // Primary yAxis
                    labels: {
                      format: '{value}%',
                      style: {
                        color: Highcharts.getOptions().colors[1]
                      }
                    },
                    title: {
                      text: 'Porcentaje',
                      style: {
                        color: Highcharts.getOptions().colors[1]
                      }
                    }
                  }, { // Secondary yAxis
                    title: {
                      text: 'Porcentaje',
                      style: {
                        color: Highcharts.getOptions().colors[0]
                      }
                    },
                    labels: {
                      format: '{value} %',
                      style: {
                        color: Highcharts.getOptions().colors[0]
                      }
                    },
                    opposite: true
                  }],
                  tooltip: {
                    shared: true
                  },
                  legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
                  },
                  series: [{
                    name: 'Desempleo juvenil',
                    type: 'column',
                    yAxis: 1,
                    data: youthRates,
                    tooltip: {
                      valueSuffix: ""
                    }
                
                  }, {
                    name: 'Gasto en educación',
                    type: 'spline',
                    data: [eE[1].educationExpense,eE[0].educationExpense,eE[3].educationExpense,eE[13].educationExpense,eE[2].educationExpense],
                    tooltip: {
                      valueSuffix: ''
                    }
                  }]
                });
               
            });
        });
        
        

}]);