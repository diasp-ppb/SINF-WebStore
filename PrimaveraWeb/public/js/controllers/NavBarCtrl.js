angular.module('NavBarCtrl', []).controller('NavBarController', function ($scope, $http, $window, $cookies) {


    if(typeof $scope.logged !== "undefined"){
        $scope.loggedUser = $cookies.get('newCookie');
    }
    console.log($scope.logged);
    console.log($scope.loggedUser);


    $scope.logOut = function (){
        $cookies.remove("newCookie");
        $scope.logged = false;
    };


});