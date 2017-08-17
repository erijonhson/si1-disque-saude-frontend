(function () {

	'use strict';

	app.service('adminService', ['$http', 'endPointsService', function ($http, endPointsService) {

		var ctrl = this;
		let adminLogado;
	
		ctrl.login = function (administrador) {
			return $http.post(endPointsService.adminLogin, administrador)
				.then(function success(response) {
					adminLogado = response.data;
					salvarAdminNoCache();
					return adminLogado;
				});
		}
	
		ctrl.register = function (administrador) {
			return $http.post(endPointsService.adminRegister, administrador)
				.then(function success(response) {
					adminLogado = response.data;
					return adminLogado;
				});
		};
	
		ctrl.getAdminLogado = function () {
			return adminLogado;
		};
	
		ctrl.logout = function () {
			adminLogado = null;
			removerAdminDoCache();
		};

		function removerAdminDoCache() {
			localStorage.setItem('admin', null);
		}
	
		function salvarAdminNoCache() {
			localStorage.setItem('admin', JSON.stringify(adminLogado));
		}
	
		function pegarAdminDoCache() {
			const admin = localStorage.getItem('admin');
			if (!admin) {
				return undefined;
			}
			return JSON.parse(admin);
		}

		(function() {
			const cacheDeAdmin = pegarAdminDoCache();
			if (cacheDeAdmin) {
				adminLogado = cacheDeAdmin;
			}
		})();

	}]);

})();