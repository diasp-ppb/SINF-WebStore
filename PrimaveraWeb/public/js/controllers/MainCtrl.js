angular.module('MainCtrl', []).controller('MainController', function($scope,$http) {

    $http.get("http://localhost:8080", {
        headers: {
            "content-type" : "application/json"
        }
    }).then(function(response) {
        // Request completed successfully
        console.log(response);
    }, function (x) {
        console.log(x);
    });

    
});