(function () {

	'use strict';

	app.controller("searchHealthUnitCtrl", function ($http, toastr, endPointsService) {

		var ctrl = this;
		ctrl.units = [];

		ctrl.searchHU = function (neighborhood) {
			$http.get(endPointsService.buscarUnidadesDeSaude + neighborhood)
				.then(function success(response) {
					ctrl.units = response.data;
					ctrl.units.forEach(function(data){
						ctrl.searchHUEsp(data.id).then(function(esps){
							data.especialidades = esps;
						});
					});
				}).catch(function error(error) {
					toastr.error(error.data.causa || error.data.message || "Erro na busca de unidades");
				});
		}

		ctrl.searchHUEsp = function(id) {
			return $http.get(endPointsService.api + "/especialidade/unidade/" + id)
				.then(function successCallback(response) {
					return response.data;
				}).catch(function error(error) {
					toastr.error(error.data.causa || error.data.message || "Sem comentários!");
				});
		}

	});

})();
