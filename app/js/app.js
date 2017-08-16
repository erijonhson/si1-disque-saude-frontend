(function () {

	const app = angular.module(
		"vs", ["ngRoute", "ngMessages","ngAnimate", "toastr"])
		.config(config)
		.run(run);

	config.$inject = ['$locationProvider', '$routeProvider', '$httpProvider'];
	function config config($locationProvider, $routeProvider, $httpProvider) {

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
		otherwise({
			redirectTo: '/'
		});
	}

	run.$inject = ['$rootScope', '$location', '$http', 'endPointsService'];
	function run($rootScope, $location, $http, endPointsService) {

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			// redirect to login page if not logged in and trying to access a restricted page
			const restrictedPage = $.inArray($location.path(), endPointsService.authorized) === -1;
			const loggedIn = localStorage.getItem('admin');
			if (restrictedPage && !loggedIn) {
				$location.path('/login');
			}
		});

	}

})();
