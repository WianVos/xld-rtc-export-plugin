angular.module('myRepo', []).config(function ($httpProvider){
    // The following code retrieves credentials from the main XL Deploy application
    // and tells AngularJS to append them to every request.
    var flexApp = parent.document.getElementById("flexApplication");
    if (flexApp) $httpProvider.defaults.headers.common.Authorization = flexApp.getBasicAuth();

}).controller('RepoController', function ($http, $scope, ngDialog) {
    $scope.dataLoading = true;

    
    $scope.loadCis = function() {
        $http.get('/api/extension/test/py', {timeout: 5000000}).then(
            function (response) {
                // response.data.entity is the serialized version of what Jython script puts into
                // response.entity in the script.
		
                $scope.resultCis = response.data.entity;
                
            }).finally(function(){
                $scope.dataLoading = false;
            });

	};

    $scope.loadClients = function() {
        $http.get('/api/extension/test/clients', {timeout: 5000000}).then(
            function (response) {
                // response.data.entity is the serialized version of what Jython script puts into
                // response.entity in the script.

                $scope.resultClientCis = response.data.entity;

            }).finally(function(){
                $scope.dataLoading = false;
            });

	};
    $scope.loadRepos = function() {
        $http.get('/api/extension/test/repos', {timeout: 5000000}).then(
            function (response) {
                // response.data.entity is the serialized version of what Jython script puts into
                // response.entity in the script.

                $scope.resultRtcRepos = response.data.entity;

            }).finally(function(){
                $scope.dataLoading = false;
            });

	};



    $scope.loadRepos();
    $scope.loadClients();
    $scope.loadCis();

    $scope.ssh = function(id) {
	$http.get('/api/extension/test/ssh', {"params": {"ciid": id, "repo": $scope.selectedRepository, "client": $scope.selectedClientServer },timeout: 5000000}).success(
            function (response) {

            // TODO: Have more robust error reporting.
		
		      $scope.execution = "The export was successful.";

            }).error(
            function(response){

            // TODO: Have more robust error reporting.

              $scope.execution = "There was an error during the export.";

            });

	};

    $scope.export = function(id) {
      $http.get('/deployit/export/deploymentpackage/' + id, {timeout: 500000}).success(
	function(response) {
	  $scope.execution = "The export was partially successful.";
          $scope.ssh(response);

	}).error(

        function(response){

           $scope.execution = "That did not go well at all" ;

	});
    };

});

