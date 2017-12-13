angular.module('SearchCtrl', []).controller('SearchController', function ($scope, $location, $http) {
    var searchText = $location.search().text;

    if (searchText === undefined) {
        $scope.validProd = false;
        return;
    }

    var url = "http://localhost:49822/api/Artigos?text=" + searchText;
    var urlsql = "http://localhost:8080/api/search?autor=" + searchText;

    $http.get(url, {
        headers: {
            "content-type" : "application/json"
        }
    }).then(function (response) {
        $scope.product = response.data;

        $http.get(urlsql, {
            headers: {
                "content-type" : "application/json"
            }
        }).then(function (response) {
            if (response.data !== undefined) {
                $scope.idSameAuthor = response.data;
            } else {
                $scope.idSameAuthor = [];
            }

            $scope.idSameAuthor.forEach(function (id) {
                var artigoUrl = "http://localhost:49822/api/Artigos?id=" + id.id;

                $http.get(artigoUrl, {
                    headers: {
                        "content-type" : "application/json"
                    }
                }).then(function (response) {
                    if (response.data !== undefined) {
                        var artigo = response.data;
                        artigo.CodArtigo = id.id;
                        $scope.product.push(artigo);
                    }
                });
            })
        });
    });
});