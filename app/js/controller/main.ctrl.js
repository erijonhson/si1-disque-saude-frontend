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
					toastr.error(error.data.causa || error.data.message || "Problemas ao tentar adicionar queixa.");
				});
			}
		});
	
	app.controller("searchComplaintCtrl", function ($scope, $http, toastr, endPointsService, adminService) {

		$scope.searchComplaint = function (id) {
			console.log(id);
			$http.get(endPointsService.api + "/queixa/" + id)
			.then(function successCallback(response) {
				$scope.complaint = response.data;
				buscaComentarioQueixa(id);
			}).catch(function error(error) {
				$scope.complaint = null;
				toastr.error(error.data.causa);
			});
		}

		$scope.novoComentario = {descricao : ''};

		$scope.adicionarComentarioQueixa = function(descricao, id) {

			var copiaDescricao = angular.copy(descricao);

			$http.post(endPointsService.api + "/queixa/comentario/"+id, JSON.stringify(copiaDescricao))
			.then(function success(response) {
					// add mensage
					toastr.success("Comentário adicionado com sucesso!");
					buscaComentarioQueixa(id);
					$scope.novoComentario.descricao = '';
			}).catch(function error(error) {
				toastr.error(error.data.causa || error.data.message || "Problemas ao adicionar comentário");
			});
		}

		$scope.novaSituacao = {valor: ''};

		$scope.atualizaSituacao = function(){
			var copiaComentarios = angular.copy($scope.complaint.comentarios);
			$http.post(endPointsService.api + "/administrador/queixa/fechamento", JSON.stringify($scope.complaint))
			.then(function success(response) {
				// add mensage
				toastr.success("Situação da queixa alterada com sucesso");
				$scope.complaint = response.data;
				$scope.complaint.comentarios = copiaComentarios;
			}).catch(function error(error) {
				toastr.error(error.data.causa || error.data.message || "Problemas ao alterar situação da queixa");
			});
		}

		$scope.adminEstaLogado = function () {
			return !!adminService.getAdminLogado();
		}

		var fecharQueixa = function(){
			console.log($scope.novaSituacao)
			delete $scope.novaSituacao.valor;
			$http.post(endPointsService.api + "/administrador/queixa/fechamento", JSON.stringify($scope.complaint))
			.then(function success(response) {
				// add mensage
				toastr.success("Situação da queixa alterada com sucesso");
				$scope.complaint = response.data;
			}).catch(function error(error) {
				toastr.error(error.data.causa || error.data.message || "Problemas ao alterar situação da queixa");
			});

		}

		var reabrirQueixa = function(){
			console.log($scope.novaSituacao)
			delete $scope.novaSituacao.valor;
			$http.post(endPointsService.api + "/administrador/queixa/reabrir", JSON.stringify($scope.complaint))
			.then(function success(response) {
				// add mensage
				toastr.success("Situação da queixa alterada com sucesso");
				$scope.complaint = response.data;
			}).catch(function error(error) {
				toastr.error(error.data.causa || error.data.message || "Problemas ao alterar situação da queixa");
			});

		}

		var buscaComentarioQueixa = function(id) {
			console.log(endPointsService.api+ "/queixa/comentario/" + id);
			$http.get(endPointsService.api+ "/queixa/comentario/" + id)
			.then(function successCallback(response) {
				$scope.complaint.comentarios = response.data;
			}).catch(function error(error) {
				toastr.error(error.data.causa || error.data.message || "Sem comentários!");
			});
		}
	});
	
	app.controller("generalSituationComplaintsCtrl", function ($scope, $http, toastr, endPointsService) {

		$scope.situation = "";

		var getGeneralSituationComplaints = function () {
			$http.get(endPointsService.api + "/administrador/geral/situacao")
			.then(function success(response) {

				if(response.data == 0) {
					$scope.situation = {
						status: "RUIM",
						color: "label-danger"
					};

				} else if(response.data == 1) {

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
				toastr.error(error.data.causa || error.data.message || "Erro na busca de unidades");
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