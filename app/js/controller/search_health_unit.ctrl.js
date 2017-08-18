(function () {

	'use strict';

	app.controller("searchHealthUnitCtrl", function ($http, toastr, endPointsService) {

		var ctrl = this;
		ctrl.units = [];

		ctrl.searchHU = function (neighborhood) {
			$http.get(endPointsService.buscarUnidadesDeSaude + neighborhood)
				.then(function success(response) {
					ctrl.units = response.data;
				}).catch(function error(error) {
					toastr.error(error.data.causa || error.data.message || "Erro na busca de unidades");
				});
		}

	});

})();
