(function () {

	'use strict';

	app.service("endPointsService", function () {

		var ctrl = this;

		ctrl.unauthorized = ['/administrador/'];

		// remoto
		// ctrl.api = 'https://disque-saude-backend.herokuapp.com/SpringBootRestApi/api';
		// local
		ctrl.api = 'http://localhost:5000/SpringBootRestApi/api';

		ctrl.statusOk = function (status) {
			return (status >= 200 && status <= 299);
		}

	});

})();