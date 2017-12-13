angular.module('RegisterCtrl', []).controller('RegisterController', function ($scope, $http, $window, $cookies) {
    var vm = this;
    vm.register = register;


    function register() {
        vm.dataLoading = true;
        var url = "http://localhost:8080/api/registry";
        $http.post(url, this.user, {
            headers: {
                "content-type" : "application/json"
            }}).then(handleSuccess, handleError('Error creating user'));

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
});