var app = angular.module('loginApp',[])
app.controller('loginCtrl', function($scope, $compile, $http){
		$scope.init = function(){
			$scope.mensagem="";
			$scope.user={
				username:"",
				password:""
			};
		}
		$scope.login=function(){
			console.log("Entrou");
			console.log($scope.user);
			$http(
				{
					url: '/login',
					method: 'POST',
					data: $scope.user
				}
			).then(
				function(a,b,c){
					console.log(a,b,c);
					if(a.data.user){
						window.location = "/";
					}
					else
					{
						$scope.mensagem=a.data.mensagem;
					}
				}
			)				
		}
	$scope.init()
	
});