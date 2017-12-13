angular.module('NavBarCtrl', []).controller('NavBarController', function ($scope, $http, $window, $cookies) {
    var vm = this;
    vm.register = register;
    vm.signin = signin;

    function register() {
        vm.dataLoading = true;

        var url = "http://localhost:49822/api/clientes";

        var body = {
            "CodCliente": this.user.username,
            "NomeCliente": this.user.nome,
            "NumContribuinte": this.user.nContribuinte,
            "Moeda": "EUR",
            "Morada": this.user.morada
        };

        $http.post(url, body, {
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(function (response) {
            console.log(response);
        }, function (x) {
        });

        var urlsql = "http://localhost:8080/api/registry";
        //should verify if user already exists too maybe idk tou com sono
        console.log(this.user);
        $http.post(urlsql, this.user, {
            headers: {
                "content-type" : "application/json"
            }}).then(handleSuccess, handleError('Error creating user'));
    }

    function handleSuccess(res) {
        //$window.location.href='/signin';
        return res.data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };


    }

    function Login(username, password, callback) {

        /* Dummy authentication for testing, uses $timeout to simulate api call
         ----------------------------------------------*/

            var response;
            UserService.GetByUsername(username)
                .then(function (user) {
                    if (user !== null && user.password === password) {
                        response = { success: true };
                    } else {
                        response = { success: false, message: 'Username or password is incorrect' };
                    }
                    callback(response);
                });


        /* Use this for real authentication
         ----------------------------------------------*/
        //$http.post('/api/authenticate', { username: username, password: password })
        //    .success(function (response) {
        //        callback(response);
        //    });

    }


    function signin() {
        vu.dataLoading = true;

        var urlsql = "http://localhost:8080/api/usersByName?username=" + this.username;


        $http.get(urlsql, {
            headers: {
                "content-type": "application/json"
            }
        }).success(function (response) {
            $scope.name = response;

            $cookies.put('newCookie', $scope.name);
            var userCookie = $cookies.get('newCookie');
        })
    }
});