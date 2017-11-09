angular.module('NavBarCtrl', []).controller('NavBarController', function ($scope) {

    $scope.signin = function(){
        $scope.user = {
            username: username
        }
        $scope.logged = true;
    }

});