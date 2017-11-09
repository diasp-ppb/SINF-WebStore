angular.module('NavBarCtrl', []).controller('NavBarController', function ($scope) {

    $scope.signin = function(){
        $scope.$parent.user = {
            name: $scope.username
        }
        $scope.$parent.logged = true;
    }

});