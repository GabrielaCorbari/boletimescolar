var app = angular.module('mostrardadosApp', [])
app.controller('mostrardadosCtrl', function($scope, $compile, $http) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.dados = {}
    }



    //init current app.controller
    $scope.init()

});
