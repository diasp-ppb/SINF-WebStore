angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})

		.when('/signin', {
			templateUrl: 'views/signin.html',
			controller: 'NavBarController'	
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