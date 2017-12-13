angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController',
		})
		.when('/signin', {
			templateUrl: 'views/signin.html',
			controller: 'SigninController',
            controllerAs: 'vu'
		})
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController',
			controllerAs: 'vm'
        })
		.when('/profile', {
			templateUrl: 'views/profile.html',
			controller: 'ProfileController'	
		})

        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController'
        })

        .when('/product', {
            templateUrl: 'views/product.html',
            controller: 'ProductController'
		})
		.when('/shoppingCart', {
            templateUrl: 'views/shoppingcart.html',
            controller: 'ShoppingController'
		})
		.when('/search', {
            templateUrl: 'views/search.html',
            controller: 'SearchController'
        });

	$locationProvider.html5Mode(true);

}]);