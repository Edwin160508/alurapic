angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto',function($resource){

	return $resource('v1/fotos/:fotoId', null, { //null seria query string... mas no nosso caso estamos usando o 1 parametro como recurso de busca
		'update' : {
			method: 'PUT'
		}
	});

}).factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope){
	var servico = {};

	var evento = 'fotoCadastrada';

	servico.cadastrar = function(foto){
		return $q(function(resolve, reject){
			if(foto._id) {
				recursoFoto.update({fotoId: foto._id}, foto, function() {
					$rootScope.$broadcast(evento);//dispara evento
					resolve({
						mensagem : 'Foto' + foto.titulo + ' alterada com sucesso!',
						inclusao : false 
					});
				}, function(erro){
					console.log(erro)
					reject({
						mensagem: 'Não foi possível alterar a foto ' + foto.titulo
					});
				});
			}else {
				recursoFoto.save(foto, function(){
					$rootScope.$broadcast(evento);//dispara evento	
					resolve({
						mensagem : 'Foto' + foto.titulo + ' incluída com sucesso!',
						inclusao : true
					});
				}, function(erro){
					console.log(erro);
					reject({
						mensagem : 'Não foi possível incluir a foto ' + foto.titulo
					});
				});
			}
		});
	};
	return servico;
});

/*
cadastroDeFotos.cadastrar(foto)
then(function(retorno){
	$scope.mensagem = retorno.mensagem;
	if retorno.inclusao
})
.catch(function(erro){
	$scope.mensagem = erro;
});
*/