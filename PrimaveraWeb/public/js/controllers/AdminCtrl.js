angular.module('AdminCtrl', []).controller('AdminController', function ($scope, $http) {
    $scope.content = "Dashboard";

    $scope.showDash = true;
    $scope.showSales = false;
    $scope.showWarehouse = false;
    $scope.showStock= false;
    $scope.showNewP = false;
	
	$scope.changeSubmition = function(){
		var cam = document.getElementById('Campo').value;
		if(cam === "imagem" || cam === "image" || cam === "Image"){
			document.getElementById('contentInput').style.visibility = "hidden";
			document.getElementById('imgInput').style.visibility = "visible";
			document.getElementById('form2').style.visibility = "visible";
			document.getElementById('form1').style.visibility = "hidden";
		}
		else {
			document.getElementById('imgInput').style.visibility = "hidden";
			document.getElementById('form2').style.visibility = "hidden";
			document.getElementById('form1').style.visibility = "visible";
			document.getElementById('contentInput').style.visibility = "visible";
		}
	}
	
	$scope.updateProduct = function () {
		var cod = document.getElementById('CodArtigo').value;
		var cam = document.getElementById('Campo').value;
		var con = document.getElementById('Conteudo').value;
		if(cod === "" || cam === "" || con === "")return;
		if(cod === null || cam === null || con === null)return;
		if(cod === undefined || cam === undefined || con === undefined)return;
		var data = {CodArtigo: cod, Campo: cam, Conteudo: con};
		var url = "http://localhost:49822/api/artigos?CodArtigo=" + cod + "&Campo=" + cam + "&Conteudo=" + con;
		var urlSql = "http://localhost:8080/api/atualizarArtigo";
		if(cam === 'Autor' || cam === 'autor') changeAutor(urlSql, {CodArtigo: cod, autor: con});
		else changePrimavera(url);
	}
	
	function changeAutor(url, body) {
		$http.post(url,body, {
            headers: {
                "content-type" : "application/json"
            }
        }).then(function (response) {
            console.log(response);
			if(response.data.message === 1) $scope.cancro = "Update Success!";
			else $scope.cancro = "Error editing product!";
        }, function (x) {
			$scope.cancro = "Error editing product!";
        });
	}
	
	function changePrimavera(url) {
		$http.get(url, {
            headers: {
                "content-type" : "application/json"
            }
        }).then(function (response) {
            console.log(response);
			if(response.data.changed) $scope.cancro = "Update Success!";
			else $scope.cancro = "Error editing product!";
        }, function (x) {
			$scope.cancro = "Error editing product!";
        });
	}
	
    $scope.changeViewAdmin = function (val) {

        $scope.showDash = false;
        $scope.showSales = false;
        $scope.showWarehouse = false;
        $scope.showStock= false;
        $scope.showNewP = false;

        $scope.stockList = [];

        document.getElementById('dashboard').classList.remove('active');
        document.getElementById('sales').classList.remove('active');
        document.getElementById('warehouse').classList.remove('active');
        document.getElementById('stock').classList.remove('active');
        document.getElementById('newProd').classList.remove('active');

        if (val === 'dashboard') {
            $scope.content = "Dashboard";
            $scope.showDash = true;
            document.getElementById('dashboard').classList.add('active');
        } else if (val === 'sales') {
            $scope.showSales = true;
            document.getElementById('sales').classList.add('active');

            $http.get("http://localhost:49822/api/doccompra?limite=1", {
                headers: {
                    "content-type" : "application/json"
                }
            }).then(function (response) {
                console.log(response);

                var product = response.data;
                $scope.labels = product.Tipos;
                $scope.data = product.Totais;

            }, function (x) {
            });

        }else if (val === 'warehouse') {
            $scope.content = "Warehouses";
            $scope.showWarehouse = true;
            document.getElementById('warehouse').classList.add('active');

        } else if (val === 'stock') {
            $scope.showStock = true;
            document.getElementById('stock').classList.add('active');

            for(var i = 0; i < 3; i++){
                var products = [{id: 3, name: 'Darkside',price: '9.99', stk: 2,  img: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png'},{id: 47, name: 'Nonagon Infinity', price: '0.10', stk: 4,  img: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png'}];
                $scope.stockList.push({name: i, products: products});
            }

        } else if (val === 'newProd') {
            $scope.showNewP = true;
            document.getElementById('newProd').classList.add('active');

        }

    }

    $scope.updateStock = function(prod){
        console.log(prod.id + " " + prod.stk);
    }
});
