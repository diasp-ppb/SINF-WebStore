angular.module('RegisterCtrl', []).controller('RegisterController', function ($scope, $http, $window, $cookies) {
    var vm = this;
    vm.register = register;


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

        $scope.user = this.user;

        $http.post(url, body, {
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(function (response) {
            console.log(response);

            var urlsql = "http://localhost:8080/api/registry";
            //should verify if user already exists too maybe idk tou com sono
            console.log($scope.user);
            $http.post(urlsql, $scope.user, {
                headers: {
                    "content-type": "application/json"
                }
            }).then(handleSuccess, handleError('Error creating user'));

        }, function (x) {
        });



    }

    function handleSuccess(res) {
        $window.location.href = '/signin';
        return res.data;
    }

    function handleError(error) {
        return function () {
            return {success: false, message: error};
        };


    }
});