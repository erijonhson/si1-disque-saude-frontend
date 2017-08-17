// http://jasonwatmore.com/post/2015/03/10/angularjs-user-registration-and-login-example-tutorial

(function () {

	'use strict';

	app.controller('loginCtrl', ['$location', 'toastr', 'adminService',
	function loginCtrl($location, toastr, adminService) {

		var ctrl = this;
		ctrl.dataLoading = false;

		ctrl.login = function (administrador) {
			ctrl.dataLoading = true;
			administrador.senha = md5(administrador.senha);
			adminService.login(administrador)
				.then(function success(response) {
					toastr.success("Bem vindo " + response.administrador.nome + "!");
					$location.path('/');
				}).catch(function error(error) {
					ctrl.dataLoading = false;
					toastr.error(error.data.causa || 'Erro no login! Verifique email e senha.');
				});
		};

		ctrl.register = function (administrador) {
			ctrl.dataLoading = true;
			administrador.senha = md5(administrador.senha);
			adminService.register(administrador)
				.then(function success(response) {
					toastr.success("Administrador cadastrado com sucesso!");
					$location.path('/');
				}).catch(function error(error) {
					ctrl.dataLoading = false;
					toastr.error(error.data.causa || 'Erro no cadastro! Tente novamente mais tarde.');
				});
		};

	}]);

})();
