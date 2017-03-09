//angular.module('alurapic').controller('FotoController', function($scope, $http, $routeParams, $resource) {
//angular.module('alurapic').controller('FotoController', function($scope, recursoFoto, $routeParams) {//antes de criar servico cadastroDeFotos	
angular.module('alurapic').controller('FotoController', function($scope, recursoFoto, cadastroDeFotos, $routeParams) {	
	$scope.foto = {};
	$scope.mensagem = '';

	/*var recursoFoto = $resource('v1/fotos/:fotoId', null, { //null seria query string... mas no nosso caso estamos usando o 1 parametro como recurso de busca
		update : {
			method: 'PUT'
		}
	}); foi construido o servico para essa requisicao*/


	if($routeParams.fotoId){

		recursoFoto.get({fotoId : $routeParams.fotoId}, function(foto){
			$scope.foto = foto;
		},function(erro){
			console.log(erro);
			$scope.mensagem = 'Não foi possível obter a foto';
		});
		//antes de usar resources
		/*$http.get('v1/fotos/' + $routeParams.fotoId)
		.success(function(foto){
			$scope.foto = foto;
		}).error(function(erro){
			console.log(erro);
			$scope.mensagem = 'Não foi possível obter a foto';
		});*/
	}
	console.log($routeParams.fotoId);

	$scope.submeter = function() {
		//console.log($scope.foto);// maneira de testar se os dados esão chegando no controller
		if($scope.formulario.$valid){
			cadastroDeFotos.cadastrar($scope.foto)
			.then(function(dados){
				$scope.mensagem = dados.mensagem;
				if(dados.inclusao) $scope.foto = {}//limpando form caso for inclusao
				//$scope.focado = true;	
				//$scope.$broadcast('fotoCadastrada');//dispara evento
			})
			.catch(function(dados){
				$scope.mensagem = dados.mensagem;
			});
		}	
	};

});