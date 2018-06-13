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
			ngcurd.post('/login',$scope.user,{
				success:function(a,b,c){
					console.log(a,b,c);
					if(a.user){
						window.location = "/";
					}
				else
				{
					$scope.mensagem=a.mensagem;
				}
				}
				, error: console.error
			})	
		}
	$scope.init()
	
});