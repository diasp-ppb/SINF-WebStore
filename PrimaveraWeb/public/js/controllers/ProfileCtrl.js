angular.module('ProfileCtrl', []).controller('ProfileController', function ($scope, $location, $http) {

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
    }, function (x) {
    });
	
    $scope.changeView = function (val) {

        $scope.showOverview = false;
        $scope.showWishList = false;
        $scope.showHistory = false;
        $scope.showOrders = false;
        $scope.historyList = [];
        $scope.wishlistProducts = [];
        $scope.activeOrders = [];

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
            // TODO fazer get e atualizar este ciclo manhoso
            for(var i = 0; i < 3; i++){
                $scope.wishlistProducts.push({id: 3, name: 'Darkside',price: '9.99', stock: 'true', img: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png'});
            }

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
						products.push({id: prod.CodArtigo, name: prod.DescArtigo, quantidade: prod.Quantidade, price: prod.TotalLiquido});
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
						products.push({id: prod.CodArtigo, name: prod.DescArtigo, quantidade: prod.Quantidade, price: prod.TotalLiquido});
					}
					$scope.historyList.push({orderState: $scope.orders[i].Estado, orderId: $scope.orders[i].id, orderPrice: $scope.orders[i].TotalMerc, date: $scope.orders[i].Data, products: products});
				}
            }
			$scope.totalOrders = total;
        }

    }

});