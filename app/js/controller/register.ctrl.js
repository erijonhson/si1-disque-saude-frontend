// http://jasonwatmore.com/post/2015/03/10/angularjs-user-registration-and-login-example-tutorial

(function () {

	'use strict';

	app.controller('registerCtrl', ['$location', 'endPointsService', 'toastr',
	function registerCtrl($location, endPointsService, toastr) {
		var ctrl = this;
		ctrl.administrador = {};
		ctrl.dataLoading = false;
		ctrl.register = function () {
			ctrl.dataLoading = true;
			const usuario = angular.copy(ctrl.administrador);
			usuario.senha = md5(usuario.senha);
			$http.post(endPointsService.api + "/cadastrar/administrador/", usuario)
				.then(function success(response) {
					toastr.success("Administrador cadastrado com sucesso!");
					localStorage.setItem('admin', response.data);
					$location.path('/login');
				}, function error(error) {
					console.log(error.causa);
					toastr.error(error.causa | 'Erro no cadastro! Tente novamente mais tarde.');
					ctrl.dataLoading = false;
				});
		};
	}]);
  
})();
