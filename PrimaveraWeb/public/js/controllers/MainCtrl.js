angular.module('MainCtrl', []).controller('MainController', function($scope,$http) {


    $http.get("http://localhost:49822/api/Artigos?ranking=6", {
        headers: {
            "content-type" : "application/json"
        }
    }).then(function (response) {
        console.log(response);

        $scope.product = response.data;
       
    }, function (x) {
        console.log(x);
    });
    
});