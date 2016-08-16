var app = angular.module('app', ['ngRoute']);

//------------------------ROUTE-PROVIDER----------------------------
app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'partials/players.html',
		controller: 'playerController'
	})
	.when('/teams',{
		templateUrl: 'partials/teams.html',
		controller: 'teamController'
	})
	.when('/associations',{
		templateUrl: 'partials/associations.html',
		controller: 'associationsController'
	})
	.otherwise({
		redirectTo: '/'
	});
});

//---------------------------PLAYER-FACTORY----------------------------
app.factory('playerFactory', ['$http', function($http){
	var factory = {};
	var players = [];

	factory.getPlayers = function(callback){
		callback(players);
	};
	factory.createPlayer = function(player){
		player.team = '';
		players.push(player);
	};
	factory.removePlayer = function($index) {
		players.splice($index,1);
	};
	factory.addPlayerTeam = function(data){
		players[data.playerIndex].team = data.team;
	};
	factory.removePlayerTeam = function($index){
		players[$index].team = '';
	};
	return factory;
}]);

//---------------------------PLAYER-CONTROLLER---------------------------

app.controller('playerController', ['$scope', 'playerFactory', function($scope, playerFactory) {
	$scope.players = [];

	playerFactory.getPlayers(function(players){
		$scope.players = players;
	});
	$scope.createPlayer = function(){
		playerFactory.createPlayer($scope.player);
		$scope.player = {};
	};
	$scope.removePlayer = function($index){
		playerFactory.removePlayer($index);
	};
}]);

//---------------------------TEAM-FACTORY----------------------------
app.factory('teamFactory', ['$http', function($http) {
	var factory = {};
	var teams = [];

	factory.getTeams = function(callback){
		callback(teams);
		};
	factory.createTeam = function(team) {
		teams.push(team);
		};
	factory.removeTeam = function($index) {
		teams.splice($index,1);
		};
	return factory;

}]);
//---------------------------TEAM-CONTROLLER---------------------------

app.controller('teamController', ['$scope', 'teamFactory', function($scope, teamFactory) {
	$scope.teams = [];

	teamFactory.getTeams(function(teams){
		$scope.teams = teams;
	});
	$scope.createTeam = function(){
		teamFactory.createTeam($scope.team);
		$scope.team = {};
	};
	$scope.removeTeam = function($index){
		teamFactory.removeTeam($index);
	};
}]);
//---------------------------ASSOCIATIONS-CONTROLLER---------------------------

app.controller('associationsController', function($scope, playerFactory, teamFactory) {
	$scope.players = [];
	$scope.teams = [];

	playerFactory.getPlayers(function(players){
		$scope.players = players;
	});

	teamFactory.getTeams(function(teams){
		$scope.teams = teams;
	});

	$scope.addPlayerTeam = function(){
		playerFactory.addPlayerTeam($scope.newAssociation);
	};
	$scope.removePlayerTeam = function($index){
		playerFactory.removePlayerTeam($index);
	};
});
