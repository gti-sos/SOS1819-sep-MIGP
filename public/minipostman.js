 /*global angular*/
angular.module("App",["ngRoute"]).config( function ($routeProvider){
    $routeProvider
    .when("/ui/v1/unemployment-rates", {
        controller : "ListCtrl",
        templateUrl: "/unemployment-rates/list.html"
    })
    .when("/ui/v1/unemployment-rates/edit/:country/:year", {
        controller : "EditCtrl",
        templateUrl: "/unemployment-rates/edit.html"
    })
    .when("/", {
        templateUrl: "principal.html"
    })
    .when("/integrations", {
        templateUrl: "/integrations/integrations.html"
    })
    
    
    //Integraciones
    
    .when("/integrations/unemployment-rates", {
        controller : "APICtrl",
        templateUrl : "/integrations/views/myAPI.html"
    })
    .when("/integrations/public-general-expenses", {
        controller : "ExpensesCtrl",
        templateUrl : "/integrations/views/G11-expenses.html"
    })
    .when("/integrations/life-expectancy-stats", {
        controller : "LifeCtrl",
        templateUrl : "/integrations/views/G12-life.html"
    })
    .when("/integrations/weather", {
        controller : "WeatherCtrl",
        templateUrl : "/integrations/views/weather-extern.html"
    })
    .when("/integrations/bikes", {
        controller : "BikesCtrl",
        templateUrl : "/integrations/views/bikes-extern.html"
    })
    ;


    
});
console.log("MiniPostmanApp initialized!");