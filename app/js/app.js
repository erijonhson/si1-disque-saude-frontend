	var app = angular.module(
		"vs", ["ngRoute", "ngMessages","ngAnimate", "toastr"])
		.config(config)
		.run(run);

	config.$inject = ['$locationProvider', '$routeProvider', '$httpProvider', '$provide'];
	function config($locationProvider, $routeProvider, $httpProvider, $provide) {

		$routeProvider.
		when("/",{
			templateUrl: "view/search.html"
		}).
		when("/complaint/register", {
			templateUrl: "view/registerComplaint.html",
			controller : "registerComplaintCtrl",
		}).
		when("/searchcomplaint", {
			templateUrl : "view/search_complaint.html",
			controller: "searchComplaintCtrl"
		}).
		when("/search_health_unit", {
			templateUrl: "view/searchHealthUnit.html",
			controller : "searchHealthUnitCtrl",
		}).
		when("/searchaverage",{
			templateUrl : "view/search_average_per_patient.html",
			controller: "searchAverangeCtrl"
		}).
		when("/createdcomplaint/:id", {
			templateUrl : "view/successPage.html",
			controller : "messageCreatedComplaintCtrl"
		}).
		when("/generalSituationComplaints", {
			templateUrl : "view/generalSituationComplaints.html",
			controller : "generalSituationComplaintsCtrl"
		}).
		when("/login",{
			templateUrl: "view/login.html",
			controller : "loginCtrl"
		}).
		when("/register",{
			templateUrl: "view/register.html",
			controller : "registerCtrl"
		}).
		otherwise({
			redirectTo: '/'
		});

		function tokenInterceptor($q, $location, $rootScope) {
			return {
				'request': function(config){
					const admin = localStorage.getItem('admin');
					if (admin && config.url.includes("/administrador")) {
						config.headers.Authorization = 'Bearer ' + admin.token;
					}
					return config;
				},
				'responseError': function (rejection){
					if(rejection.status === 401){
						$location.path("/login");
					}
					return rejection;
				}
			}
		}

		$provide.factory('tokenInterceptor', ['$q', '$location', '$rootScope', tokenInterceptor]);

		$httpProvider.interceptors.push("tokenInterceptor");
	}

	run.$inject = ['$rootScope', '$location', '$http', 'endPointsService'];
	function run($rootScope, $location, $http, endPointsService) {

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			// redirect to login page if not logged in and trying to access a restricted page
			const authorizedPage = $.inArray($location.path(), endPointsService.unauthorized) === -1;
			const loggedIn = localStorage.getItem('admin');
			if (!authorizedPage && !loggedIn) {
				$location.path('/login');
			}
		});

	}
