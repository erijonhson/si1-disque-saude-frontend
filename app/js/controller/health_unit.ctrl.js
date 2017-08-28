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

	app.controller("registerHealthUnitCtrl", function ($http, toastr, endPointsService) {

		var ctrl = this;
		ctrl.unidade = {"type": "Posto"};
		ctrl.esp = "";
		ctrl.especialidades = [];

		ctrl.registerHU = function () {
			console.log(ctrl.especialidades);
			ctrl.unidade.especialidades = ctrl.especialidades;
			console.log(ctrl.unidade);
			$http.post(endPointsService.adicionarUnidadeDeSaude, ctrl.unidade)
				.then(function success(response) {
					toastr.success("Unidade de Saúde Cadastrada");
					console.log('Vai Dragão, incendeia!');
				}).catch(function error(error) {
					toastr.error(error.data.causa || error.data.message || "Erro na busca de unidades");
				});
		}

		ctrl.addEspecialidade = function() {
			if (ctrl.esp !== "" && novaEspecialidade()) {
				ctrl.especialidades.push({"descricao": ctrl.esp});
				ctrl.esp = "";
			}
		}

		function novaEspecialidade() {
			var existe = false;
			ctrl.especialidades.forEach(e => {
				if (e.descricao === ctrl.esp.descricao)
					existe = true;
			});
			return !existe;
		}

	});

})();
