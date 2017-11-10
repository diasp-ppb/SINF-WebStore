angular.module('ProfileCtrl', []).controller('ProfileController', function ($scope) {

        $scope.content = "overview content";

        $scope.showOverview = true;
        $scope.showWishList = false;
        $scope.showHistory = false;
        $scope.showOrders = false;

        $scope.changeView = function (val) {

                $scope.showOverview = false;
                $scope.showWishList = false;
                $scope.showHistory = false;
                $scope.showOrders = false;

                document.getElementById('overview').classList.remove('active');
                document.getElementById('wishlist').classList.remove('active');
                document.getElementById('history').classList.remove('active');
                document.getElementById('orders').classList.remove('active');

                if (val == 'overview') {
                        $scope.content = "overview content";
                        $scope.showOverview = true;
                        document.getElementById('overview').classList.add('active');

                } else if (val == 'wishlist') {
                        $scope.content = "wishlist content";
                        $scope.showWishList = true;
                        document.getElementById('wishlist').classList.add('active');

                } else if (val == 'history') {
                        $scope.content = "history content";
                        $scope.showHistory = true;
                        document.getElementById('history').classList.add('active');

                } else if (val == 'orders') {
                        $scope.content = "orders content";
                        $scope.showOrders = true;
                        document.getElementById('orders').classList.add('active');
                }

        }

});