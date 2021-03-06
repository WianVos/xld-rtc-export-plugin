angular.module('myRepo', ['ngDialog']).config(function ($httpProvider){
    // The following code retrieves credentials from the main XL Deploy application
    // and tells AngularJS to append them to every request.
    var flexApp = parent.document.getElementById("flexApplication");
    if (flexApp) $httpProvider.defaults.headers.common.Authorization = flexApp.getBasicAuth();

}).controller('RepoController', function ($http, $scope, $rootScope, ngDialog) {
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

	$scope.loadSingleCi = function(id) {
	    $http.get('/api/extension/test/singleci',{"params": {"ci": id}, timeout: 5000000}).success(
	    function (response) {
	        $scope.singleCi = response.entity;
	    })
	}

        // selected fruits
    $scope.selection = [];

      // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(id) {
        var idx = $scope.selection.indexOf(id);

        // is currently selected
        if (idx > -1) {
          $scope.selection.splice(idx, 1);
        }

        // is newly selected
        else {
          $scope.selection.push(id);
        }
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

	$scope.openDialog = function (id) {
	            $scope.selection = [];
                $rootScope.theme = 'ngdialog-theme-plain';
                $scope.id = id;
                $scope.loadSingleCi(id)

                ngDialog.open({
                    template: 'partials/modals/configDialog.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope,
                    backdrop : 'static',
                    showClose: false
                });

            };



    $scope.loadRepos();
    $scope.loadClients();
    $scope.loadCis();

    $scope.ssh = function(id, selection) {

	$http.get('/api/extension/test/ssh', {"params": {"ciid": id, "cis": selection.toString(), "repo": $scope.selectedRepository, "client": $scope.selectedClientServer },timeout: 5000000}).success(
            function (response) {

            // TODO: Have more robust error reporting.
		
		      $scope.execution = "The export was successful.";

            }).error(
            function(response){

            // TODO: Have more robust error reporting.

              $scope.execution = "There was an error during the export.";

            });

	};

    $scope.export = function(id, selection) {
      $http.get('/deployit/export/deploymentpackage/' + id, {timeout: 500000}).success(
	function(response) {
	  $scope.execution = "The export was partially successful.";
          $scope.ssh(response, selection);

	}).error(

        function(response){

           $scope.execution = "That did not go well at all" ;

	});
    };

});
