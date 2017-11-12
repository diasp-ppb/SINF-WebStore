angular.module('ProfileCtrl', []).controller('ProfileController', function ($scope) {

    // TODO fazer get
    $scope.user = {name: 'User Name', img: 'https://d3n8a8pro7vhmx.cloudfront.net/themes/57d734b533893fddfc000001/attachments/original/1473881108/default-profile-pic.jpg?1473881108'};
    $scope.content = "User overview content";

    $scope.showOverview = true;
    $scope.showWishList = false;
    $scope.showHistory = false;
    $scope.showOrders = false;

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
            $scope.totalOrders = 3;
            for(var i = 0; i < 3; i++){
                var products = [{id: 3, name: 'Darkside',price: '9.99'},{id: 47, name: 'Nonagon Infinity', price: '0.10'}];
                $scope.historyList.push({orderId: 80+i,orderPrice: '10.09', date: '19/9/2019', products: products});
            }

        } else if (val == 'orders') {
            $scope.showOrders = true;
            document.getElementById('orders').classList.add('active');
            // TODO fazer get e atualizar este ciclo manhoso
            $scope.totalOrders = 3;
            for(var i = 0; i < 3; i++){
                var products = [{id: 3, name: 'Darkside',price: '9.99'},{id: 47, name: 'Nonagon Infinity', price: '0.10'}];
                $scope.activeOrders.push({orderId: 80+i,orderPrice: '10.09', date: '19/9/2019', products: products});
            }
        }

    }

});