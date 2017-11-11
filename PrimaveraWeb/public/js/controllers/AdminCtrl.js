angular.module('AdminCtrl', []).controller('AdminController', function ($scope) {
    $scope.content = "Administrator Dashboard";

    $scope.showDash = true;
    $scope.showSales = false;
    $scope.showWarehouse = false;
    $scope.showStock= false;
    $scope.showNewP = false;

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
            $scope.content = "Administrator Dashboard";
            $scope.showDash = true;
            document.getElementById('dashboard').classList.add('active');
        } else if (val === 'sales') {
            $scope.content = "Sales numbers";
            $scope.showSales = true;
            document.getElementById('sales').classList.add('active');
        }else if (val === 'warehouse') {
            $scope.content = "Warehouse Details";
            $scope.showWarehouse = true;
            document.getElementById('warehouse').classList.add('active');
        } else if (val === 'stock') {
            $scope.content = "Stock Management Board";
            $scope.showStock = true;
            document.getElementById('stock').classList.add('active');

        } else if (val === 'newProd') {
            $scope.content = "Add new Product";
            $scope.showNewP = true;
            document.getElementById('newProd').classList.add('active');

        }

    }
});
