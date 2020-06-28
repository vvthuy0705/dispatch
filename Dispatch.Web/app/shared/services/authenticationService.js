(function (app) {
    'use strict';
    // $q: là service sử dụng bottom promise : giúp đảm bảo thực thi trước sau như phương thức then ở phần apiService
    // $window: service cho phép lưu sesstionStorage 

    app.service('authenticationService', ['$http', '$q', 'localStorageService', 'authData',
        function ($http, $q, localStorageService, authData) {
            var tokenInfo;

            this.setTokenInfo = function (data) {
                tokenInfo = data;
                //$window.sessionStorage["TokenInfo"] = JSON.stringify(tokenInfo);
                // lưu trữ token ben client khi load lại không bị mất
                localStorageService.set("TokenInfo", JSON.stringify(tokenInfo));
            }

            this.getTokenInfo = function () {
                return tokenInfo;
            }

            this.removeToken = function () {
                tokenInfo = null;
                //$window.sessionStorage["TokenInfo"] = null;
                localStorageService.set("TokenInfo",null);
            }

            this.init = function () {
              var  tokenInfo = localStorageService.get("TokenInfo");
                if (tokenInfo) {
                    //tokenInfo = JSON.parse($window.sessionStorage["TokenInfo"]);
                    tokenInfo = JSON.parse(tokenInfo);
                    authData.authenticationData.IsAuthenticated = true;
                    authData.authenticationData.userName = tokenInfo.userName;
                    authData.authenticationData.accessToken = tokenInfo.accessToken;
                }
            }

            this.setHeader = function () {
                delete $http.defaults.headers.common['X-Requested-With'];
                if ((authData.authenticationData != undefined) && (authData.authenticationData.accessToken != undefined) && (authData.authenticationData.accessToken != null) && (authData.authenticationData.accessToken != "")) {
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + authData.authenticationData.accessToken;
                    $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                }
            }

            this.validateRequest = function () {
                var url = '/api/home/TestMethod';
                var deferred = $q.defer();
                $http.get(url).then(function (reponse) {
                    deferred.resolve(reponse);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }

            this.init();
        }
    ]);
})(angular.module('dispatch.common'));