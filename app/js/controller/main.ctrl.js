(function () {

	'use strict';

	app.controller("mainToolbarCtrl", function (adminService, toastr) {
		var ctrl = this;
		ctrl.adminEstaLogado = function () {
			return !!adminService.getAdminLogado();
		}
		ctrl.logout = function () {
			const admin = adminService.getAdminLogado();
			adminService.logout();
			toastr.success("Até breve " + admin.administrador.nome + "!");
		}
	});

	app.controller("registerComplaintCtrl", function ($http, $location, toastr, endPointsService) {
		var ctrl = this;
		ctrl.registerComplaint = function (complaint) {
			$http.post(endPointsService.api + "/queixa/", JSON.stringify(complaint))
			.then(function success(response) {
					// add mensage
					toastr.success("Queixa adicionada com sucesso!");
					$location.path('/createdcomplaint/' + response.data.id);
				}).catch(function error(error) {
					toastr.error(error.data.causa || "Problemas ao tentar adicionar queixa.");
				});
		}
	});
	
	app.controller("searchAverangeCtrl", function ($scope, $http, toastr, endPointsService) {

		$scope.average = null;

		$scope.searchAveragePerPatient = function (id) {
			$http.get(endPointsService.api + "/geral/medicos/" + id).then(function successCallback(response) {
				$scope.average = response.data.obj;
			}).catch(function error(error) {
				toastr.error(error.data.causa || "Unidade não Encontrada");
			});
		}
	});
	
	app.controller("searchComplaintCtrl", function ($scope, $http, toastr, endPointsService) {

		$scope.searchComplaint = function (id) {
			console.log(id);
			$http.get(endPointsService.api + "/queixa/" + id).then(function successCallback(response) {
				$scope.complaint = response.data;
				buscaComentarioQueixa(id);
				console.log($scope.complaint);
				console.log("----");
			}).catch(function error(error) {
				$scope.complaint = null;
				toastr.error(error.data.causa);
			});
		}

		var buscaComentarioQueixa = function(id) {
			console.log(endPointsService.api+ "/queixa/comentario/" + id);
			$http.get(endPointsService.api+ "/queixa/comentario/" + id).then(function successCallback(response) {
				$scope.complaint.comentarios = response.data;
			}).catch(function error(error) {
				toastr.error(error.data.causa || "Sem comentários!");
			});
		}

		// REMOVER ESTA GAMBS
		$scope.novoComentario = {descricao : ''};

		$scope.adicionarComentarioQueixa = function(descricao, id) {

			var copiaDescricao = angular.copy(descricao);
			console.log($scope.novoComentario);

			$http.post(endPointsService.api + "/queixa/comentario/"+id, JSON.stringify(copiaDescricao))
			.then(function success(response) {
					// add mensage
					toastr.success("Comentário adicionado com sucesso!");
					buscaComentarioQueixa(id);
					$scope.novoComentario.descricao = '';
				}).catch(function error(error) {
					toastr.error(error.data.causa || "Problemas ao adicionar comentário");
				});
		}

	});
	
	app.controller("searchHealthUnitCtrl", function ($scope, $http, toastr, endPointsService) {

		$scope.units = [];

		$scope.searchHU = function (neighborhood) {
			$http.get(endPointsService.api + "/unidade/busca?bairro=" + neighborhood)
			.then(function success(response) {
				$scope.units = [];
				$scope.units.push(response.data);
				console.log("Foram encontradas Unidades de saúde");
				console.log(response.data);
			}).catch(function error(error) {
				toastr.error(error.data.causa || "Erro na busca de unidades");
			});
		}
	});
	
	app.controller("generalSituationComplaintsCtrl", function ($scope, $http, toastr, endPointsService) {

		$scope.situation = "";

		var getGeneralSituationComplaints = function (neighborhood) {
			$http.get(endPointsService.api + "/geral/situacao")
			.then(function success(response) {
				console.log(response.data.obj);

				if(response.data.obj == 0){
					$scope.situation = {
						status: "RUIM",
						color: "label-danger"
					};

				} else if(response.data.obj == 1){

					$scope.situation = {
						status: "REGULAR",
						color: "label-primary"
					};
				} else {
					$scope.situation = "";
					$scope.situation = {
						status: "BOM",
						color: "label-success"
					};

				}
			}).catch(function error(error) {
				toastr.error(error.data.causa || "Erro na busca de unidades");
			});
		}

		getGeneralSituationComplaints();
	});
	
	app.controller("messageCreatedComplaintCtrl", function ($scope, $routeParams) {
		$scope.responseComplaintId = "";
		var showMessage = function () {
			$scope.responseComplaintId = $routeParams.id;
		}

		showMessage();
	});

})();