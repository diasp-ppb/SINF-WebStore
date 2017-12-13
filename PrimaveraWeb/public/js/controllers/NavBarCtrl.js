angular.module('NavBarCtrl', []).controller('NavBarController', function ($scope, $http, $window, $cookies) {


    $scope.loggedUser = $cookies.get('newCookie');
    console.log($scope.logged);
    console.log($scope.loggedUser);


    $scope.logOut = function (){
        $cookies.remove("newCookie");
        $scope.logged = false;
    };


});