/// <reference path="../../../Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('dispatch.arrivedDispatch', ['dispatch.common']).config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('arrivedDispatch', {
            url: "/arrivedDispatch",
            parent: 'base',
            templateUrl: "/app/components/arrived_dispatch/arrivedDispatchListView.html",
            controller: "arrivedDispatchListController"
        }).state('add_arrivedDispatch', {
            url: "/add_arrivedDispatch",
            parent: 'base',
            templateUrl: "/app/components/arrived_dispatch/arrivedDispatchAddView.html",
            controller: "arrivedDispatchAddController"
        }).state('edit_arrivedDispatch', {
            url: "/edit_arrivedDispatch/:id",
            parent: 'base',
            templateUrl: "/app/components/arrived_dispatch/arrivedDispatchEditView.html",
            controller: "arrivedDispatchEditController"
        });
        //$urlRouterProvider.otherwise('/admin');
    }
})();


// AngularUI: thay dổi page của app base state not base route URL

// 1. tạo module, tham số add module chung(vì chứa thư viện), 
//2. inject 
//3. viet hàm được đặt ở  mục 1 với  stateProvider
