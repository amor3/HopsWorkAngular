'use strict';

angular.module('hopsWorksApp')

  .controller('SecurityCtrl', ['$scope', '$cookies', '$http', '$location', function ($scope, $cookies, $http, $location) {

  	// those are the parameters that we are passing by
  	$scope.user = {username: '', password: ''};
  	$scope.isLoggedIn = false;
  	$scope.message = '';
  	$scope.projectName = '';


  	// So that we dont have to define type every time
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


	$scope.login = function() {

  		$http.post(
  			'http://localhost:8080/hopsworks/webresources/auth/login', 
  			'email=' + $scope.user.username + '&' + 'password=' + $scope.user.password // Convert it to form data for now
  			)
  		.success(function(data) {
  			console.log('You are now logged in.. Great.. Really');
  			console.log(data);
  			//$location.url('/about');

  			// Save the auth_token to session
  			$cookies.auth_token = data.auth_token;

  			// Toggle the ng-show
  			$scope.isLoggedIn = true;
  			//$scope.$apply();
  		})
  		.error(function(data) {
  			console.log('Error: Sorry, you are not welcome here...');
  			console.log(data);
  		});

	  	$scope.user.password = '';
  };



  $scope.logout = function() {
  		
  		$http.post(
  			'http://193.10.67.43:8080/HopsWorks/rest-api/auth/logout/', 
  			null, // Payload empty this time
  			{headers: { 'auth_token': $cookies.auth_token }} // Send the auth_token in header
		    )
  		.success(function(data) {
  			console.log('Success, logged out the user');
  			console.log(data);

  			// Delete the stored auth token
  			delete $cookies['auth_token'];
  			console.log('RemoveSession, Removes auth_token...');

  			// Toggle the ng-show when logged out
  			$scope.isLoggedIn = false;
  			//$scope.$apply();
  		})
  		.error(function() {
  			console.log('Error: Could not logout');
  		});
  };


  $scope.doPostMethod = function(){
		$http.post('http://localhost:8080/HopsWorks/rest-api/auth/postMethod/', 
  			null, // Payload empty this time
  			{headers: { 'auth_token': $cookies.auth_token, 
  						'project': $scope.projectName }
  					   }
		    )
				.success(function(data) {
					console.log('postMethod ran successfully');
					$scope.message = data.message;
				})
				.error(function(data) {
					console.log('Error: In postMethod');
					$scope.message = 'Error: In postMethod';
				});
  };


    $scope.doGetMethod = function(){
		$http.get('http://localhost:8080/HopsWorks/rest-api/auth/getMethod/',
  			{headers: { 'auth_token': $cookies.auth_token }} // Send the auth_token in header
		    )
				.success(function(data) {
					console.log('getMethod ran successfully');
					$scope.message = data.message;
				})
				.error(function(data) {
					console.log('Error: In getMethod');
					$scope.message = 'Error: In getMethod';
				});
  };











  }]);