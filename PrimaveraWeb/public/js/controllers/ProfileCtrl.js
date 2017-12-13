angular.module('ProfileCtrl', []).controller('ProfileController', function ($scope, $location, $http, $route) {
        
    // TODO fazer get
    $scope.user = {name: 'User Name', img: 'https://d3n8a8pro7vhmx.cloudfront.net/themes/57d734b533893fddfc000001/attachments/original/1473881108/default-profile-pic.jpg?1473881108'};
    $scope.content = "User overview content";

    $scope.showOverview = true;
	document.getElementById('overview').classList.add('active');
    $scope.showWishList = false;
    $scope.showHistory = false;
    $scope.showOrders = false;
	
	var id = $location.search().id;
	if(id === undefined) {
		$scope.validUser = false;
		$scope.profileInfo = 'Invalid User!';
		return;
	}
	var url = "http://localhost:49822/api/clientes?id=" + id;
	var url2 = "http://localhost:49822/api/docvenda?codUser=" + id;
	
	$http.get(url, {
        headers: {
            "content-type" : "application/json"
        }
    }).then(function (response) {
        $scope.user = response.data;
    }, function (x) {
    });
	
	$http.get(url2, {
        headers: {
            "content-type" : "application/json"
        }
    }).then(function (response) {
        $scope.orders = response.data;
		console.log('got orders');
    }, function (x) {
    });
	
    $scope.changeView = function (val) {

        $scope.showOverview = false;
        $scope.showWishList = false;
        $scope.showHistory = false;
        $scope.showOrders = false;
        $scope.historyList = [];
        $scope.wishlistProducts = [];
        $scope.orderList = [];

        document.getElementById('overview').classList.remove('active');
        document.getElementById('wishlist').classList.remove('active');
        document.getElementById('history').classList.remove('active');
        document.getElementById('orders').classList.remove('active');

        if (val == 'overview') {
            $scope.showOverview = true;
            document.getElementById('overview').classList.add('active');
			
			

        } else if (val == 'wishlist') {
            $scope.showWishList = true;
            document.getElementById('wishlist').classList.add('active');

            $http.get("http://localhost:8080/api/listaDesejo?cliente=" + id, {
                headers: {
                    "content-type" : "application/json"
                }
            }).then(function (response) {
                console.log(response);

                var product = response.data;
                console.log("product", product);
                if(product != 1) {
                    for(var i = 0; i < product.length; i++){
                        $scope.wishlistProducts.push({id: product[i].codArtigo});
                        
                    }
                }
            }, function (x) {
            });
        
        } else if (val == 'history') {
            $scope.showHistory = true;
            document.getElementById('history').classList.add('active');
            // TODO fazer get e atualizar este ciclo manhoso
			var total = 0;
            for(var i = 0; i < $scope.orders.length; i++){
				if($scope.orders[i].Estado == 'Enviado'){
					total++;
					var products = [];
					for(var j = 0; j < $scope.orders[i].LinhasDoc.length; j++){
						var prod = $scope.orders[i].LinhasDoc[j];
						products.push({id: prod.CodArtigo, name: prod.DescArtigo, quantidade: prod.Quantidade, price: prod.TotalILiquido});
					}
					$scope.historyList.push({orderId: $scope.orders[i].id, orderPrice: $scope.orders[i].TotalMerc, date: $scope.orders[i].Data, products: products});
				}
            }
			$scope.totalOrders = total;

        } else if (val == 'orders') {
            $scope.showOrders = true;
            document.getElementById('orders').classList.add('active');
            var total = 0;
            for(var i = 0; i < $scope.orders.length; i++){
				if($scope.orders[i].Estado != 'Enviado'){
					total++;
					var products = [];
					for(var j = 0; j < $scope.orders[i].LinhasDoc.length; j++){
						var prod = $scope.orders[i].LinhasDoc[j];
						products.push({id: prod.CodArtigo, name: prod.DescArtigo, quantidade: prod.Quantidade, price: prod.TotalILiquido});
					}
					$scope.orderList.push({orderState: $scope.orders[i].Estado, orderId: $scope.orders[i].id, orderPrice: $scope.orders[i].TotalMerc, date: $scope.orders[i].Data, products: products});
				}
            }
			$scope.totalOrders2 = total;
        }

    }

    $scope.removeFromWhish = function(codArtigo) {
        console.log(id);
        console.log(codArtigo);
        var url = "http://localhost:8080/api/deleteDesejo" ;

        var body = {
            cliente: id,
            codArtigo: codArtigo,
        };

        $http.post(url, body, {
            headers: {
                "content-type" : "application/json"
            }
        }).then(function (response) {
            console.log(response);
            $route.reload();
        }, function (x) {
        });
    }


});