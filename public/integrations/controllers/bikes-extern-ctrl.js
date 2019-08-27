var app = angular.module("App");

app.controller("BikesCtrl", 
    ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer){
         
         
        var API = "https://sos1819-sep-migp.herokuapp.com/api/v1/unemployment-rates";
        var ExternAPI = "/proxyExt2";
        
        
        $http.get(API).then(function(response) {
            $http.get(ExternAPI).then(function(response2) {
            
                var paises = response2.data.networks.map((c) => c.location.country);
                var ES = paises.filter(c =>  c=="ES");
                var ESrate = response.data.filter(c => c.country=="Spain" && c.year==2018)[0].rate;
                var FR = paises.filter(c =>  c=="FR");
                var FRrate = response.data.filter(c => c.country=="France" && c.year==2018)[0].rate;
                var GR = paises.filter(c =>  c=="DE");
                var GRrate = response.data.filter(c => c.country=="Germany" && c.year==2018)[0].rate;
                var US = paises.filter(c =>  c=="US");
                var USrate = response.data.filter(c => c.country=="United States" && c.year==2018)[0].rate;
                var UK = paises.filter(c =>  c=="GB");
                var UKrate = response.data.filter(c => c.country=="United Kingdom" && c.year==2018)[0].rate;
            
                
                google.charts.load('current', {packages: ['corechart', 'bar']});
                google.charts.setOnLoadCallback(drawMultSeries);
                
                function drawMultSeries() {
                  var data = google.visualization.arrayToDataTable([
                    ['País', 'Puntos de alquiler de bicicletas', 'Tasa de paro'],
                    ['España', ES.length, ESrate],
                    ['Alemania', GR.length, GRrate],
                    ['Francia', FR.length, FRrate],
                    ['Estados Unidos', US.length, USrate],
                    ['Reino Unido', UK.length, UKrate]
                  ]);
            
                  var options = {
                    title: 'Número de puntos de alquiler de bicicletas y tasa de paro',
                    chartArea: {width: '50%'},
                    hAxis: {
                      title: '',
                      minValue: 0
                    },
                    vAxis: {
                      title: 'Países'
                    }
                  };
            
                  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                  chart.draw(data, options);
                }

            });
        });
        
        

}]);