app.service("endPointsService", function () {
	var ctrl = this;
	// remoto
	ctrl.api = 'https://disque-saude-backend.herokuapp.com/SpringBootRestApi/api';
	// local
	//ctrl.api = 'http://localhost:5000/SpringBootRestApi/api';
});
