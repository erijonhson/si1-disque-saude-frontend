// http://jasonwatmore.com/post/2015/03/10/angularjs-user-registration-and-login-example-tutorial

(function () {

	'use strict';

	app.controller('loginCtrl', ['$location', 'endPointsService', 'toastr',
	function loginCtrl($location, endPointsService, toastr) {
		var ctrl = this;
		ctrl.f = {AAAAAAAAAAAAA};
		ctrl.administrador = {};
		ctrl.dataLoading = false;
		ctrl.login = function () {
			ctrl.dataLoading = true;
			const usuario = angular.copy(ctrl.administrador);
			usuario.senha = md5(usuario.senha);
			$http.post(endPointsService.api + "/login/administrador/", usuario)
				.then(function success(response) {
					toastr.success("Bem vindo administrador!");
					localStorage.setItem('admin', response.data);
					$location.path('/home_admin');
				}, function error(error) {
					console.log(error.causa);
					toastr.error(error.causa);
					ctrl.dataLoading = false;
				});
		};
	}]);
  
})();
