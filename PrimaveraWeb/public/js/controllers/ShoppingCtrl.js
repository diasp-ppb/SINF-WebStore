angular.module('ShoppingCtlr', []).controller('ShoppingController', function ($scope, $cookies, $location, $http, $route, $ngConfirm) {
    var client = "SILVA";
    $scope.shoppingCartList = [];

    var update = function(){
        var urlsql = "http://localhost:8080/api/carrinhocompras?cliente=" + client;
        $scope.total = 0;

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
                        Preco: price,
                        PrecoFinal: precoFinal
                    }
                    console.log(info);
                    $scope.shoppingCartList.push(info);
                }, function (x) {
                });
            })
        }, function (x) {
        });
    }

    $scope.remove = function(product){
        var urlsql = "http://localhost:8080/api/deleteShoppingCart?cliente=" + client + "&codArtigo=" + product;
        $http.post(urlsql, {
            headers: {
                "content-type" : "application/json"
            }
        }).then(function (response) {
            if(response.data === "ok"){
                $route.reload();
            }
            else{
                console.log("Error");
            }
        }, function (x) {
        });
    }

    $scope.confirmation = function(){
        $ngConfirm({
            title: 'Please confirm!',
            content: 'Are you sure you want to proceed?',
            buttons: {
                Confirm: {
                    text: 'Confirm',
                    btnClass: 'btn-green',
                    action: function(scope, button){
                        console.log("Confirmed");
                        confirmation();
                    }
                },
                Cancel: function(scope, button){}
            }
        });
    }

    var confirmation = function(){
        var urlCompra = "http://localhost:49822/api/DocVenda";


        var itensToBuy = [];
        for(var i = 0; i < $scope.shoppingCartList.length; i++){
            var json = {
                "CodArtigo": $scope.shoppingCartList[i].CodArtigo,
                "Quantidade": $scope.shoppingCartList[i].Quantidade
            };
            itensToBuy.push(json);
        }
        console.log(itensToBuy);
        var d = new Date();
        var timestamp = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "T" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        var req = {
            "Entidade": client,
            "Data": timestamp,
            "Serie": "2017",
            "LinhasDoc": itensToBuy
        };
        console.log(req);
        $http.post(urlCompra, req, {
            headers: {
                "content-type": "application/json"
            }
        }).then(function (response) {
            console.log(response);
            deleteShoppingCart();
        }, function (x) {
        });
    }

    var deleteShoppingCart = function () {
        var urlsql = "http://localhost:8080/api/deleteAllShoppingCart?cliente=" + client;
        $http.post(urlsql, {
            headers: {
                "content-type" : "application/json"
            }
        }).then(function (response) {
            if(response.data === "ok"){
                $route.reload();
            }
            else{
                console.log("Error");
            }
        }, function (x) {
        });
    }

    update();
})