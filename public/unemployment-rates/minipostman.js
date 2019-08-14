 /*global angular*/
angular.module("MiniPostmanApp",["ngRoute"]).config( function ($routeProvider){
    $routeProvider.when("/", {
        controller : "ListCtrl",
        templateUrl: "list.html"
    });
});
console.log("MiniPostmanApp initialized!");