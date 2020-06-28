(function (app) {
    'use strict';
    app.service('loginService', ['$http', '$q', 'authenticationService', 'authData','apiService',
        function ($http, $q, authenticationService, authData, apiService) {
            let userInfo;
            let deferred;

            this.login = function (userName, password) {
                deferred = $q.defer();
                var data = "grant_type=password&username=" + userName + "&password=" + password;
                $http.post('/oauth/token', data, {
                    headers:
                        { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (response) {
                    console.log(response);
                    userInfo = {
                        accessToken: response.data.access_token,
                        userName: userName
                    };
                    authenticationService.setTokenInfo(userInfo);
                    authData.authenticationData.IsAuthenticated = true;
                    authData.authenticationData.userName = userName;
                    authData.authenticationData.accessToken = response.data.access_token;
                    deferred.resolve(response);
                }, function (err) {
                    authData.authenticationData.IsAuthenticated = false;
                    authData.authenticationData.userName = "";
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            this.logOut = function () {
                apiService.post('/api/account/logout', null, function (response) {
                    authenticationService.removeToken();
                    authData.authenticationData.IsAuthenticated = false;
                    authData.authenticationData.userName = '';
                    authData.authenticationData.accessToken = '';
                }, null);
            }
        }]);
})(angular.module('dispatch.common'));