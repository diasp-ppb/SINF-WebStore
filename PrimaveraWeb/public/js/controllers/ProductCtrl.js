angular.module('ProductCtrl', []).controller('ProductController', function($scope, $location, $http) {
    $scope.$parent.products = {category: ['rock', 'hip pop', 'eletronic', 'jazz', 'v4p0r w4v3']};
    $scope.tagline = 'The square root of life is pi!';
    $scope.$parent.productP = true;
	$scope.validProd = true;
	
	var id = $location.search().id;
	if(id === undefined) {
		$scope.validProd = false;
		return;
	}
	var url = "http://localhost:49822/api/Artigos?id=" + id;
	
	$http.get(url, {
        headers: {
            "content-type" : "application/json"
        }
    }).then(function (response) {
        console.log(response);

        $scope.product = response.data;
		if($scope.product === undefined) {
			$scope.validProd = false;
			return;
		}
		$scope.product.PrecoFinal = $scope.product.PrecoFinal.toFixed(2);
		$scope.valIni = $scope.product.PrecoFinal;
		$scope.availability = [];
		
		var stock = response.data.STKArm;
		for(var i = 0;i < stock.length; i++){
			var dist = response.data.Distritos[i];
			var loc = response.data.Localidades[i];
			if(stock[i] !== undefined && stock[i] > 0){
				if(dist !== undefined){
					$scope.availability.push(dist);
				}
				else if(loc !== undefined){
					$scope.availability.push(loc);
				}
			}
		}
    }, function (x) {
    });
	$scope.amount = 1;	
	$scope.changePrice = function(val){
		if($scope.amount === 0 && val < 0)return;
		$scope.amount += val;
		$scope.product.PrecoFinal = $scope.amount * $scope.valIni;
		$scope.product.PrecoFinal = $scope.product.PrecoFinal.toFixed(2);
	}
});