
var app = angular.module("viApp", ['ngTable', 'angular.filter']);

//var app = angular.module("viApp", []);
app.controller('fControl', function($scope) {
    $scope.langues = [" ","Anglais", "Arabe", "Allemand", "Creole", "Espagnol", "Francais", "Italien","Portugais", "Langues africaines", "Autre"];
	$scope.rythmes = [" ", "Documentaire, tutorial", "Country", "Rock", "Hip Hop", "RnB", "Blues", "Rap", "Beat", "Bachata", "Boléro", "Bossa nova", "Biguine", "Jazz","Rumba","Salsa", "Merengue", "Compas", "Gospel","", "Langues africaines", "Autre"];
	$scope.pays = _pays;
});

//app.controller('viControl', function($scope, $http, NgTableParams){
app.controller('viControl', function($scope, $http){
    //tous les enregistrements
	$scope.data01 = [];
	var request1 = $http.get('/data01');
	request1.success(function(data) {
		$scope.data01 = data;	
	});
	
	//fonction pour trier
	$scope.orderBythis = function(keke){
		$scope.tSorter = keke;
	}
	
	//Fiche par id
	$scope.data02 = [];
	var request2 = $http.get('/detailo/:id');
	request2.success(function(data) {
		$scope.data02 = data;	
	});
	
	
	
	
	
	
	

	/*
	else {
		request2.success(function(data){
			$scope.data01=data;
		});
	}
		
	request2.error(function(data1){
        var request1 = $http.get('/data01');
		request1.success(function(data) {
			$scope.data01 = data;	
		});
    });
	*/
	//$scope.tableParams = new NgTableParams({}, { dataset: $scope.data01});  		
});	
	