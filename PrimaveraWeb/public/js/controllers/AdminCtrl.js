angular.module('AdminCtrl', ['lr.upload']).controller('AdminController', function ($scope, $http) {
    $scope.content = "Dashboard";

    $scope.showDash = true;
    $scope.showSales = false;
    $scope.showStock= false;
    $scope.showNewP = false;
    $scope.codArtigo = null;
	
	$scope.changeSubmition = function(){
		var cam = document.getElementById('Campo').value;
		$scope.codArtigo = document.getElementById('CodArtigo').value;
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
	
	function displayWarehouses(){
		var url = "http://localhost:49822/api/armazem";
		$http.get(url, {
            headers: {
                "content-type" : "application/json"
            }
        }).then(function (response) {
            $scope.stockList = response.data.map(
				function (item) {
					if(item.Localidade === "" && item.Distrito === "") 
						item.Localidade = "Unspecified location";	
				return item;
			});
        }, function (x) {
			
        });
	}
	
    $scope.changeViewAdmin = function (val) {

        $scope.showDash = false;
        $scope.showSales = false;
        $scope.showStock= false;
        $scope.showNewP = false;

        $scope.stockList = [];

        document.getElementById('dashboard').classList.remove('active');
        document.getElementById('sales').classList.remove('active');
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

        } else if (val === 'stock') {
            $scope.showStock = true;
            document.getElementById('stock').classList.add('active');
			displayWarehouses();
        } else if (val === 'newProd') {
            $scope.showNewP = true;
            document.getElementById('newProd').classList.add('active');

        }

    }

    $scope.updateStock = function(prod){
        console.log(prod.id + " " + prod.stk);
    }
});
