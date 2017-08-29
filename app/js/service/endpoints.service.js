(function () {

	'use strict';

	app.service('endPointsService', function () {

		var ctrl = this;

		ctrl.unauthorized = ['/administrador/'];

		// remoto
		ctrl.api = 'https://disque-saude-backend.herokuapp.com/SpringBootRestApi/api';
		// local
		//ctrl.api = 'http://localhost:5000/SpringBootRestApi/api';

		ctrl.adminLogin = ctrl.api + '/admin/login/';
		ctrl.adminRegister = ctrl.api + '/admin/cadastrar/';

		ctrl.adicionarUnidadeDeSaude = ctrl.api + "/administrador/unidade/";
		ctrl.buscarUnidadesDeSaudePorBairro = ctrl.api + "/unidade/busca?bairro=";
		ctrl.buscarUnidadesDeSaudePorEspecialidade = ctrl.api + "/unidade/busca/";
		ctrl.buscarMediaDeMedicosPorUnidadeDeSaude = ctrl.api + "/administrador/geral/medicos/";

	});

})();