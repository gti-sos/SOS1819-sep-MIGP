var app = angular.module("App");

app.controller("LifeCtrl", 
    ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer){
         
         
        var API = "https://sos1819-sep-migp.herokuapp.com/api/v1/unemployment-rates";
        var API2 = "/proxyG12";
        
        
        $http.get(API).then(function(response) {
            $http.get(API2).then(function(response2) {
                
                var rates = response.data;
                var lifes = response2.data;
                
                
                Highcharts.chart('container', {
                  chart: {
                    type: 'line'
                  },
                  title: {
                    text: 'Esperanza de vida y tasa de desempleo en hombres'
                  },
                  xAxis: {
                    categories: ["Spain 2017", "Germany 2017", "United States 2017", "Spain 2016", "Germany 2016", "United States 2016"]
                  },
                  yAxis: {
                    title: {
                      text: ''
                    }
                  },
                  plotOptions: {
                    line: {
                      dataLabels: {
                        enabled: true
                      },
                      enableMouseTracking: false
                    }
                  },
                  series: [{
                    name: 'Edad media',
                    data: [lifes[25].expectancy_man, lifes[28].expectancy_man, lifes[16].expectancy_man, lifes[10].expectancy_man,
                            lifes[15].expectancy_man, lifes[14].expectancy_man]
                  }, {
                    name: 'Porcentaje desempleo',
                    data: [rates[5].maleUnemployment, rates[9].maleUnemployment, rates[7].maleUnemployment, rates[10].maleUnemployment,
                            rates[11].maleUnemployment, rates[13].maleUnemployment]
                  }]
                });
                
                
               
              
               
            });
        });
        
        

}]);