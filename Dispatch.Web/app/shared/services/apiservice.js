﻿/// <reference path="../../../Assets/admin/libs/angular/angular.js" />
(function (app) {
    app.factory('apiService', apiService);

    apiService.$inject = ['$http', 'notificationService', 'authenticationService'];

    function apiService($http, notificationService, authenticationService) {
        // public phương thức bằng cách return 
        return {
            get: get,
            post: post,
            put: put,
            del: del
        }
        function post(url, data, success, failure) {
            authenticationService.setHeader();
            $http.post(url, data).then(
                function (result) {
                    success(result);
                }, function (error) {
                    if (error.status == '401') {
                        notificationService.displayError('Authenticate is requiered')
                    } else if (failure != null) {
                        failure(error);
                        notificationService.displayError(error)
                    }
                });
        }
        function del(url, data, success, failure) {
            authenticationService.setHeader();
            $http.delete(url, data).then(
                function (result) {
                    success(result);
                }, function (error) {
                    if (error.status == '401') {
                        notificationService.displayError('Authenticate is requiered')
                    } else if (failure != null) {
                        failure(error);
                    }
                });
        }
        function put(url, data, success, failure) {
            //authenticationService.setHeader();
            $http.put(url, data).then(function (result) {
                success(result);
            }, function (error) {
                if (error.status == '401') {
                    notificationService.displayError('Authenticate is requiered')
                } else if (failure != null) {
                    failure(error);
                }
            });
        }
        function get(url, params, success, failure) {
            authenticationService.setHeader();
            $http.get(url, params).then(function (result) {
                success(result);
            }, function (error) {
                failure(error);
                console.log(error);
            });
        }
    }
})(angular.module('dispatch.common')); // add namespace thuộc tedushop.common
