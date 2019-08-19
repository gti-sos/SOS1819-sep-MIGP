 /*global angular*/
angular.module("MiniPostmanApp",["ngRoute"]).config( function ($routeProvider){
    $routeProvider
    .when("/ui/v1/unemployment-rates", {
        controller : "ListCtrl",
        templateUrl: "list.html"
    })
    .when("/ui/v1/unemployment-rates/edit/:country/:year", {
        controller : "EditCtrl",
        templateUrl: "edit.html"
    })
    .when("/", {
        templateUrl: "principal.html"
    });
});
console.log("MiniPostmanApp initialized!");