var app=angular.module('myapp',['ngRoute']);
// npm i -g http-server
// http-server
app.config(function($routeProvider,$locationProvider){
	console.log('Hello config');
	// $routeProvider.when(string,object)
	// String->Path, Object -> Information(content,controller)
	$routeProvider.when('/',{
		templateUrl:'views/home.html',
		controller:'AllController'
	});
	$routeProvider.when('/xyz',{
		templateUrl:'views/addcontact.html',
		controller:'addController'
	});
	$routeProvider.when('/viewcontact/:id',{
		templateUrl:'views/card.html',
		controller:'cardController'
	});
	$locationProvider.html5Mode(true);
});


app.controller('AllController',function($scope,$q,$location,$http){
	console.log('All Contacts Controller called!!');
	$scope.calldata=function(){
		$http({
			method:'GET',
			url:'https://zenways-contact.herokuapp.com/api/contacts',
			headers:{
			'key':'ZENWAYS01MAYANK'
			} 
		}).then(function(response){
			console.log(response)
			$scope.data=response.data.contacts;
		},function(resposne){});
	}
	$scope.calldata();
	$scope.del=function(user){
		a=user._id;
		$http({
			method:'DELETE',
			url:'https://zenways-contact.herokuapp.com/api/contact/'+a,
			headers:{
			'key':'ZENWAYS01MAYANK'
			}
		}).then(function(response){
			console.log(response);
		},function(resposne){});
		
	}
	$scope.view=function(id){
		$location.path('/viewcontact/'+id);
		/*
		$http({
			method:'GET',
			url:'https://zenways-contact.herokuapp.com/api/contacts',
			headers:{
			'key':'ZENWAYS01MAYANK'
			} 
		}).then(function(response){
			console.log(response);
			console.log("hi view from view button");
			$scope.data=response.data.contacts;
			$location.href('views/card.html');
		},function(resposne){});
		*/
	}
});




app.controller('addController',function($scope,$q,$http){
	console.log('Add Contacts Controller called!!');
	$scope.subForm=function(){
		console.log($scope.user);
		$http({
			method:'POST',
			url:'https://zenways-contact.herokuapp.com/api/contact',
			headers:{
			'key':'ZENWAYS01MAYANK'
			},
			data:$scope.user
		}).then(function(response){
			console.log(response);
			console.log(alert("Form submitted successfully!"));
		},function(resposne){
			
		})
	}
	

});
app.controller('cardController',function($scope,$q,$http,$routeParams){
	console.log('Card Controller called!!');
		$scope.calldata=function(){
		$http({
			method:'GET',
			url:'https://zenways-contact.herokuapp.com/api/contact/'+$routeParams.id,
			headers:{
			'key':'ZENWAYS01MAYANK'
			} 
		}).then(function(response){
			console.log(response)
			$scope.data=response.data.contact;
		},function(resposne){});
	}
	$scope.calldata();
	$scope.sendmsg=function(){
		$http({
			method:'POST',
			url:'https://AC9465f3f6fb3a9ea21ead829e658ffff8:217b80ef1da110e094e26dae6c65e2bc@api.twilio.com/2010-04-01/Accounts/AC9465f3f6fb3a9ea21ead829e658ffff8/Messages.json',
			headers:{
			'Content-Type': 'x-www-form-urlencoded',
			'To':'+917042304090',
			'From':'+13179618047',
			'Body':'{{txtmsg}}'
			} 
		}).then(function(response){
			console.log(response)
			$scope.data=response.data.contact;
		},function(resposne){});
	}
	$scope.sendemail=function(){
		$http({
			method:'POST',
			url:'https://zenways-contact.herokuapp.com/api/secure_email',
			headers:{
			'key':'ZENWAYS01MAYANK',
			'to':'maynkmohta@gmail.com',
			'subject':'Mail From phone book',
			'text':'hello test mail'
			} 
		}).then(function(response){
			console.log(response)
			$scope.data=response.data.contact;
		},function(resposne){});
	}

});
