(function () {

    'use strict';

    app.controller("registerComplaintCtrl", function ($scope, $http, toastr, $location, endPointsService) {

        $scope.registerComplaint = function (complaint) {
            $http.post(endPointsService.api + "/queixa/", JSON.stringify(complaint))
            .then(function success(response) {
                    // add mensage
                    toastr.success("Queixa adicionada com sucesso!");
                    $location.path('/createdcomplaint/' + response.data.id);
                }, function error(error) {
                    console.log(error);
                    console.log("Problemas ao tentar adicionar queixa.");
                });
        }
    });
    
    app.controller("searchAverangeCtrl", function ($scope, $http, endPointsService) {

        $scope.average = null;

        $scope.searchAveragePerPatient = function (id) {
            $http.get(endPointsService.api + "/geral/medicos/" + id).then(function successCallback(response) {
                $scope.average = response.data.obj;
            }, function errorCallback(error) {
                console.log("Unidade Não Encontrada");
            });
        }
    });
    
    app.controller("searchComplaintCtrl", function ($scope, $http, endPointsService, toastr) {

        $scope.searchComplaint = function (id) {
            console.log(id);
            $http.get(endPointsService.api + "/queixa/" + id).then(function successCallback(response) {
                $scope.complaint = response.data;
                buscaComentarioQueixa(id);
                console.log($scope.complaint);
                console.log("----");
            }, function errorCallback(error) {
                $scope.complaint = null;
                console.log(error);
            });
        }

        var buscaComentarioQueixa = function(id) {
            var result = {data : undefined}
            console.log(endPointsService.api+ "/queixa/comentario/"+id);
            return $http.get(endPointsService.api+ "/queixa/comentario/"+id).then(function successCallback(response) {
                $scope.complaint.comentarios = response.data;
            }, function errorCallback(error) {
                console.log("nao encontrou comentarios");
                return result;
            });
        }

        $scope.adicionarComentarioQueixa = function(descricao, id) {
            $http.post(endPointsService.api + "/queixa/comentario/"+id, JSON.stringify(descricao))
            .then(function success(response) {
                    // add mensage
                    toastr.success("Comentário adicionado com sucesso!");
                    limparCampo("textarea[name = novoComentario]")
                    buscaComentarioQueixa(id);
                }, function error(error) {
                    console.log(error);
                    console.log("Problemas ao tentar adicionar comentario");
                });
        }

        var limparCampo = function(campo) {
            $(campo).val("");
        };
    });
    
    app.controller("searchHealthUnitCtrl", function ($scope, $http, endPointsService) {

        $scope.units = [];

        $scope.searchHU = function (neighborhood) {
            $http.get(endPointsService.api + "/unidade/busca?bairro=" + neighborhood)
            .then(function success(response) {
                $scope.units = [];
                $scope.units.push(response.data);
                console.log("Foram encontradas Unidades de saúde");
                console.log(response.data);
            }, function failed(error) {
                console.log("Erro na busca de unidades");
                console.log(error.data.errorMessage);
            });
        }
    });
    
    app.controller("generalSituationComplaintsCtrl", function ($scope, $http, endPointsService) {

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
            }, function failed(error) {
                console.log("Erro na busca de unidades");
                console.log(error.data.errorMessage);
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