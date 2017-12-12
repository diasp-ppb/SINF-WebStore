angular.module('ShoppingCtlr', []).controller('ShoppingController', function ($scope, $location, $http) {

    var urlsql = "http://localhost:8080/api/carrinhocompras?cliente=" + "badum";
    $scope.total = 0;

    $scope.shoppingCartList = [];
    $http.get(urlsql, {
        headers: {
            "content-type" : "application/json"
        }
    }).then(function (response) {
        response.data.forEach(function(art){
            var url = "http://localhost:49822/api/Artigos?id=" + art.CodArtigo;
            var price;
            $http.get(url, {
                headers: {
                    "content-type" : "application/json"
                }
            }).then(function (resp) {
                price = resp.data.PrecoFinal;
                var precoFinal = price * art.Quantidade;
                $scope.total += precoFinal;

                var info = {
                    CodArtigo: art.CodArtigo,
                    Quantidade: art.Quantidade,
                    Preco: price.toFixed(2),
                    PrecoFinal: precoFinal.toFixed(2)
                }
                console.log(info);
                $scope.shoppingCartList.push(info);
            }, function (x) {
            });
        })
    }, function (x) {
    });
})