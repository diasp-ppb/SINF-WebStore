angular.module('SigninCtrl', []).controller('SigninController', function ($scope, $http, $window, $cookies) {

    var vu = this;
    vu.signin = signin;


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
            var userCookie = $cookies.get('newCookie');
            console.log(userCookie);
        }, function(response){

        })
    }
});