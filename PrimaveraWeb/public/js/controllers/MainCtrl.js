angular.module('MainCtrl', []).controller('MainController', function($scope,$http) {

    $http.get("http://localhost:49822/api/artigos", {
        headers: {
            "content-type" : "application/json"
        }
    }).then(function (response) {
        console.log(response);
        $scope.products = response.data
    }, function (x) {
        console.log(x);
    });
    
});