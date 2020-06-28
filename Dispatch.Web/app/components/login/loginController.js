(function (app) {
    app.controller('loginController', loginController);
    loginController.$inject = ['$scope', 'loginService', '$injector', 'notificationService']
    function loginController($scope, loginService, $injector, notificationService) {
        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.loginSubmit = function () {
            $scope.loading = true;
            loginService.login($scope.loginData.userName, $scope.loginData.password).then(function (response) {
                if ((response != null && response.error != undefined) || response.error == 'invalid_grant' || response.status == '400') {
                    notificationService.displayError('lỗi');
                    $scope.loading = false;
                }
                else {
                    var stateService = $injector.get('$state');
                    $scope.loading = false;
                    stateService.go('home');
                }
            }, function (error) {
                    var stateService = $injector.get('$state');
                    $scope.loading = false;
                    stateService.go('home');
                    notificationService.displayError('Account and password not falsed!');

            });
        }
    }
})(angular.module('dispatch'));