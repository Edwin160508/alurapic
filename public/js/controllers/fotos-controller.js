//angular.module('alurapic').controller('FotosController', function($scope, $http, $resource){
angular.module('alurapic').controller('FotosController', function($scope, recursoFoto){	
/*como vamos ter varias fotos precisamos guarda em uma coleção*/
/*$scope = Serviço do angular responsavel de realizar databinding alimentar a view*/
/*$http = Serviço do angular responsável para fazer requisisções ajax*/
	$scope.fotos = [];
	$scope.filtro = '';//pegar dados digitados no campo filtro
	$scope.mensagem = '';

	//var recursoFoto = $resource('v1/fotos/:fotoId'); 	
	
	recursoFoto.query(function(fotos){
		$scope.fotos = fotos;
	}, function(erro){
		console.log(erro);
	});

	/*Resumo do código abaixo da requisição ajax*/
	/*$http.get('v1/fotos').success(function(retorno){
		$scope.fotos = retorno;
	}).error(function(erro){
		console.log(erro);
	});*/

	$scope.remover = function(foto){
		// remove a foto
		console.log(foto);
		//substituindo $http por $resource atraves da variavel recursoFoto
		recursoFoto.delete({fotoId : foto._id}, function(){ //pegando o coringa na linha 9 " :fotoId "
			var indiceFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(indiceFoto, 1);// indice quanto elemento no caso 1
			$scope.mensagem ='Foto' + foto.titulo + ' foi removida com sucesso';
		}, function(erro){
			console.log(erro);
			$scope.mensagem ='Não foi possível remover a foto '+ foto.titulo;
		});

		/*Recurso com $http*/
		/*$http.delete('v1/fotos/' + foto._id)
		.success(function(){
			var indiceFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(indiceFoto, 1);// indice quanto elemento no caso 1
			$scope.mensagem ='Foto' + foto.titulo + ' foi removida com sucesso';

		}).error(function(erro){
			console.log(erro);
			$scope.mensagem='Não foi possível remover a foto '+ foto.titulo;
		});*/

	} //Fim da função remover
	
	/*Alimentando o array vazio com a requisição Ajax que vem do servidor Backend via Get
		2 linha  quando os dados estiverem totalmente carregados eu alimento o array vazio eu prometo...
		3 linha array sendo alimentado
		4 linha caso não consiga fazer a requisição ao servidor pegar o erro
		5 linha mostrar o erro que ocorreu na requisição no console do navegador
	*/
	/*var promise = $http.get('v1/fotos'); 
	promise.then(function(retorno){
		$scope.fotos = retorno.data;
	}).catch(function(error){
		console.log(error);
	});*/
});