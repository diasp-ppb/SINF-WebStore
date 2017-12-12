angular.module('NavBarCtrl', []).controller('NavBarController', function ($scope, $http, $window,$location) {
    var vm = this;
    vm.register = register;

    function register() {
        vm.dataLoading = true;
        var url = "http://localhost:8080/api/registry";
        //should verify if user already exists too maybe idk tou com sono
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


    function login() {
        vm.dataLoading = true;
        AuthenticationService.Login(vm.username, vm.password, function (response) {
            if (response.success) {
                AuthenticationService.SetCredentials(vm.username, vm.password);
                $location.path('/');
            } else {
                FlashService.Error(response.message);
                vm.dataLoading = false;
            }
        });
    };

/*    $scope.signin = function(){
        $scope.$parent.user = {
            name: $scope.username
        };
        $scope.$parent.logged = true;
    }*/

});