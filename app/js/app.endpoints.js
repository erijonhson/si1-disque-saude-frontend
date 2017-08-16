(function () {

	app.service("endPointsService", function () {

		var ctrl = this;

		ctrl.authorized = ['/queixa/*', '/geral/medicos/', '/unidade/busca?bairro=', '/geral/situacao/'];

		// remoto
		// ctrl.api = 'https://disque-saude-backend.herokuapp.com/SpringBootRestApi/api';
		// local
		ctrl.api = 'http://localhost:5000/SpringBootRestApi/api';

		ctrl.statusOk = function (status) {
			return (status >= 200 && status <= 299);
		}

	});

})();