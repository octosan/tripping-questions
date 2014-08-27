var gamesApp = angular.module('gamesApp', [
   'ngRoute',
   'gamesAppControllers',
   'usersService'
]);

gamesApp.config(['$routeProvider',
           function($routeProvider) {
             $routeProvider.
               when('/', {
                 templateUrl: 'landingPage.html',
                 controller: 'landingPageCtr'
               }).
               when('/game_1/', {
                 templateUrl: 'game_1.html',
                 //controller: ''
               }).
               when('/createUser/', {
                 templateUrl: 'createUser.html',
                 controller: 'createUserCtr'
               }).
               otherwise({
                 redirectTo: 'error.html'
               });
           }]);


var gamesAppControllers = angular.module('gamesAppControllers', []);

gamesAppControllers.controller('landingPageCtr', ['$scope', 'Users', function($scope, Users) {
  $scope.currentUser = {isLogged : false, isAdmin : false};
  $scope.games = [
    {'name': 'Game 1',
      'id' : 'game_1'},
    {'name': 'Game 2',
     'id' : 'game_2'}
  ];
  $scope.users = Users.query()

  $scope.submitLoginUser = function() {
    $scope.currentUser.isLogged = true;
    $scope.currentUser.email = $scope.fields.user;
  }


}]);

gamesAppControllers.controller('createUserCtr', ['$scope', '$http', function($scope, $http) {
    $scope.list = [];
    $scope.submitCreateUser = function() {
        var data=$scope.fields;
        $scope.list.push(data);
        $http.post('services/users', data);
    }
}]);


var usersService = angular.module('usersService', ['ngResource']);

usersService.factory('Users', ['$resource',
  function($resource){
    return $resource('services/users', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);