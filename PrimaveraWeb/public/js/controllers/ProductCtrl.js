angular.module('ProductCtrl', []).controller('ProductController', function($scope) {
    $scope.$parent.products = {category: ['rock', 'hip pop', 'eletronic', 'jazz', 'v4p0r w4v3']};
    $scope.tagline = 'The square root of life is pi!';
    $scope.$parent.productP = true;
});