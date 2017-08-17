// http://jasonwatmore.com/post/2015/03/10/angularjs-user-registration-and-login-example-tutorial

(function () {

	'use strict';

	app.controller('loginCtrl', ['$http', '$location', 'endPointsService', 'toastr',
	function loginCtrl($http, $location, endPointsService, toastr) {

		var ctrl = this;
		ctrl.dataLoading = false;

		ctrl.login = function (administrador) {
			ctrl.dataLoading = true;
			const usuario = angular.copy(administrador);
			usuario.senha = md5(usuario.senha);
			$http.post(endPointsService.api + "/admin/login/", usuario)
				.then(function success(response) {
					toastr.success("Bem vindo " + response.data.administrador.nome + "!");
					localStorage.setItem('admin', JSON.stringify(response.data));
					$location.path('/admin');
				}).catch(function error(error) {
					toastr.error(error.causa || 'Erro no login! Verifique email e senha.');
					ctrl.dataLoading = false;
				});
		};

		ctrl.register = function (administrador) {
			ctrl.dataLoading = true;
			const usuario = angular.copy(administrador);
			usuario.senha = md5(usuario.senha);
			$http.post(endPointsService.api + "/admin/cadastrar/", usuario)
				.then(function success(response) {
					toastr.success("Administrador cadastrado com sucesso!");
					$location.path('/login');
				}).catch(function error(error) {
					toastr.error(error.causa || 'Erro no cadastro! Tente novamente mais tarde.');
					ctrl.dataLoading = false;
				});
		};
	}]);
  
})();
