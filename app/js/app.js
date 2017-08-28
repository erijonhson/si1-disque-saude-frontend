'use strict';
var app = angular.module(
	"vs", ["ngRoute", "ngMessages","ngAnimate", "toastr"])
	.config(config)
	.run(run);

config.$inject = ['$locationProvider', '$routeProvider', '$httpProvider', '$provide'];
function config($locationProvider, $routeProvider, $httpProvider, $provide) {
	$routeProvider.
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
		controller : "loginCtrl"
	}).
	when("/main",{
		templateUrl: "view/include/main-toolbar.html",
		controller : "mainToolbarCtrl"
	}).
	when("/registerHealthUnit",{
		templateUrl: "view/registerHealthUnit.html",
		controller : "registerHealthUnitCtrl"
	}).
	otherwise({
		redirectTo: '/searchcomplaint'
	});

	function jwtInterceptor($q, $location) {
		return {
			'request': function(config) {
				config.headers = config.headers || {};
				if (config.url.includes("/administrador")) {
					const adminStorage = localStorage.getItem('admin');
					if (adminStorage !== "null") {
						const admin = JSON.parse(adminStorage);
						config.headers.Authorization = 'Bearer ' + admin.token;
					}
				}
				return config;
			},
			'responseError': function (response){
				if(response.status === 401) {
					$location.path("/login");
				}
				return $q.reject(response);
			}
		}
	}

	$provide.factory('jwtInterceptor', ['$q', '$location', jwtInterceptor]);

	$httpProvider.interceptors.push("jwtInterceptor");

}

run.$inject = ['$rootScope', '$location', '$http', 'endPointsService', 'adminService'];
function run($rootScope, $location, $http, endPointsService, adminService) {
	$rootScope.$on('$locationChangeStart', function (event, next, current) {
		// redirect to login page if not logged in and trying to access a restricted page
		const authorizedPage = $.inArray($location.path(), endPointsService.unauthorized) === -1;
		const loggedIn = adminService.getAdminLogado();
		if (!authorizedPage && !loggedIn) {
			$location.path('/login');
		}
	});
}
