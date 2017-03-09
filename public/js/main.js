angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'meusServicos']).config(function($routeProvider, $locationProvider){
//angular.module('alurapic').controller('FotoController', ['$scope', 'recursoFoto', '$routeParams', 'cadastroDeFotos'], function($scope, recursoFoto, $routeParams, cadastroDeFotos)
	$locationProvider.html5Mode(true); // faz que que o angurar deixe de trabalhar com # "Hash" e passe a trabalhar com rotas html5... o browser precisa suportar html5 e o back-end precisa tambem estar preparado...
	$routeProvider.when('/fotos', {//função de como registrar minha rota no angular passando o nome fotos o angular ira entender como #/fotos
		templateUrl: 'partials/principal.html',//mostrando para o angular qual arquivo html ele vai buscar o conteúdo
		controller: 'FotosController' //mostrando para angular qual Controller responsável para carregar as fotos subistiuindo o ng-controller que tinha na tag body
	}); 
	$routeProvider.when('/fotos/new', {
		templateUrl: 'partials/foto.html',
		controller: 'FotoController'
	});
	$routeProvider.when('/fotos/edit/:fotoId', {
		templateUrl: 'partials/foto.html',
		controller: 'FotoController'
	});

	$routeProvider.otherwise({ redirectTo: '/fotos'});// caso coloque uma url inválida sera redirecionado para url fotos nesse caso :)
});

//ng-controller="FotosController"