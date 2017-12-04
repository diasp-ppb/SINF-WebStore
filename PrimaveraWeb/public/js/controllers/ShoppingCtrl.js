angular.module('ShoppingCtlr', []).controller('ShoppingController', function ($scope, $location, $http) {
    $scope.show = function () {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.message = "You said " + result;
            });
        });
    };
})