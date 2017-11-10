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

        .when('/product', {
            templateUrl: 'views/product.html',
            controller: 'ProductController'
        });

	$locationProvider.html5Mode(true);

}]);