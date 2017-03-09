angular.module('minhasDiretivas', []).directive('meuPainel', function(){//para criar minha diretiva e necess[ario criar um modulo desta ditetiva antes "angular.module('minhasDiretivas', []);"
	//Diretiva ngAnimate é um módulo do angular que so e ativada quando importamos o script angular-animate.min.js
	var ddo = {};

	ddo.restrict = "AE";//atribut e element 
	ddo.scope = {//scopo da minha diretiva
		titulo: '@titulo'//passando informação do mundo externo no caso da view o nome "@titulo" e o atributo que esta na view nome que esta na diretiva ng-model
	};

	ddo.transclude = true;//manter os elementos filhos

	ddo.templateUrl =  'js/directives/meu-painel.html';		

	return ddo;
}).directive('minhaFoto', function(){
	var ddo = {};

	ddo.restrict = "AE";
	ddo.scope = {
		titulo: '@titulo',
		url: '@url'
	};

	//ddo.templateUrl = 'js/directives/minha-foto.html';
	ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}" />';


	return ddo;
}).directive('meuBotaoPerigo' ,function(){//Diretiva que constroi botão
	var ddo = {};
	ddo.restrict = "E";
	ddo.scope = {
		nome: '@nome',
		acao: '&acao'
	};

	ddo.template = '<button ng-click="acao()"class="btn btn-danger btn-block">{{nome}}</button>';

	return ddo;

}).directive('meuFocus', function(){
	var ddo = {}

	ddo.restrict = "A";
	/*ddo.scope ={
		focado : '=focado'//comunicação entre diretiva e o controller que mexem na mesma propriedade focado
	};*/

	ddo.link = function(scope, element){ //scopo e o elemento no qual estou querendo manipular no DOM
		/*scope.$watch('focado', function(){
			if(scope.focado) {
				element[0].focus();
				scope.focado = false;	
			}		
		});*/
		scope.$on('fotoCadastrada', function(){
			element[0].focus();
		});
	}

	return ddo;
}).directive('meusTitulos', function(){
	var ddo = {};

	ddo.restrict = "E"
	ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
	ddo.controller = function($scope, recursoFoto){
		recursoFoto.query(function(fotos){
			$scope.titulos = fotos.map(function(foto){// map intera nossa lista fornecendo acesso ao elemento da interação no caso o titulo
				return foto.titulo;
			});
		});
	};

	return ddo;

});