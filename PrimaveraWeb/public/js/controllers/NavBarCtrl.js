angular.module('NavBarCtrl', []).controller('NavBarController', function ($scope, $http, $window, $cookies) {

    $scope.valuehtml = $cookies.get('newCookie') !== undefined;
    if ($scope.valuehtml){
        $scope.loggedUser = $cookies.get('newCookie');
    }


    $scope.logOut = function (){
        $cookies.remove("newCookie");
        $scope.valuehtml = false;
    };

});