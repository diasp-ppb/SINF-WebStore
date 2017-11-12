angular.module('AdminCtrl', []).controller('AdminController', function ($scope) {
    $scope.content = "Dashboard";

    $scope.showDash = true;
    $scope.showSales = false;
    $scope.showWarehouse = false;
    $scope.showStock= false;
    $scope.showNewP = false;

    $scope.stockList = [];

    $scope.changeViewAdmin = function (val) {

        $scope.showDash = false;
        $scope.showSales = false;
        $scope.showWarehouse = false;
        $scope.showStock= false;
        $scope.showNewP = false;

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

            $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data = [300, 500, 100];

        }else if (val === 'warehouse') {
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
});
