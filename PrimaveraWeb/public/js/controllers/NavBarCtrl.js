angular.module('NavBarCtrl', []).controller('NavBarController', function ($scope, $http, $window, $cookies) {
    var vm = this;
    vm.register = register;
    var vu = this;
    vu.signin = signin;

    $scope.logged = $cookies.get('newCookie') !== "";
    $scope.loggedUser = $cookies.get('newCookie');

    function register() {
        vm.dataLoading = true;
        var url = "http://localhost:8080/api/registry";
        $http.post(url, this.user, {
            headers: {
            "content-type" : "application/json"
        }}).then(handleSuccess, handleError('Error creating user'));

    }

    $scope.logOut = function (){
        $cookies.remove("newCookie");
        $scope.logged = false;
    };

    function handleSuccess(res) {
        $window.location.href='/signin';
        return res.data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };


    }

    function signin() {
        vu.dataLoading = true;

        var urlsql = "http://localhost:8080/api/logIn";

        var coiso = this.username;
        $http.post(urlsql,{username: this.username, password: this.password},{
            headers: {
                "content-type": "application/json"
            }
        }).then(function (response) {
            if(response.data.message){
                $scope.logged = true;
                $cookies.put('newCookie', coiso);
            }
            var userCookie = $cookies.get('newCookie');// TODO aqui puta
            console.log(userCookie);
        }, function(response){

        })
    }
});