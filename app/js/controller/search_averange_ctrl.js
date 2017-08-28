(function () {

	'use strict';

	app.controller("searchAverangeCtrl", function ($http, toastr, endPointsService) {

		var ctrl = this;
		ctrl.average = null;

		ctrl.searchAveragePerPatient = function (id) {
			$http.get(endPointsService.buscarMediaDeMedicosPorUnidadeDeSaude + id)
				.then(function successCallback(response) {
					ctrl.average = response.data;
					if (ctrl.average == 0.0)
						toastr.success("Média Médico Por Paciente da Unidade Pesquisada é 0");
				}).catch(function error(error) {
					toastr.error(error.data.causa || error.data.message || "Unidade não Encontrada");
				});
		}
	});

})();
