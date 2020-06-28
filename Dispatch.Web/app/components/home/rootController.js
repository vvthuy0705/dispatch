(function (app) {
    app.controller('rootController', rootController);

    rootController.$inject = ['$state', 'authData', 'loginService', '$scope', 'authenticationService'];

    function rootController($state, authData, loginService, $scope) {
        $scope.logOut = function () {
            loginService.logOut();
            $state.go('login');
        }
        $scope.authentication = authData.authenticationData;
        //authenticationservice.validaterequest();
    }
})(angular.module('dispatch'));