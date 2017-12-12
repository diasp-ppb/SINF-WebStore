angular.module('NavBarCtrl', []).controller('NavBarController', function ($scope, $http, $window,$location) {
    var vm = this;
    vm.register = register;

    function register() {
        vm.dataLoading = true;
        //should verify if user already exists too maybe idk tou com sono
        $http.post('/register', this.user).then(handleSuccess, handleError('Error creating user'));

    }

    function handleSuccess(res) {
        $window.location.href='/signin';
        return res.data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };


    }

/*    $scope.signin = function(){
        $scope.$parent.user = {
            name: $scope.username
        };
        $scope.$parent.logged = true;
    }*/

});