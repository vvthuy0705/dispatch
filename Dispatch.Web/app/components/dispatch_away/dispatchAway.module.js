/// <reference path="../../../Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('dispatch.dispatchAway', ['dispatch.common']).config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('dispatchAway', {
            url: "/dispatchAway",
            parent: 'base',
            templateUrl: "/app/components/dispatch_away/dispatchAwayListView.html",
            controller: "dispatchAwayListController"
        }).state('add_dispatchAway', {
            url: "/add_dispatchAway",
            parent: 'base',
            templateUrl: "/app/components/dispatch_away/dispatchAwayAddView.html",
            controller: "dispatchAwayAddController"
        }).state('import_dispatchAway', {
            url: "/import_dispatchAway",
            parent: 'base',
            templateUrl: "/app/components/dispatch_away/dispatchAwayImportView.html",
            controller: "dispatchAwayImportController"
        }).state('edit_dispatchAway', {
            url: "/edit_dispatchAway/:id",
            parent: 'base',
            templateUrl: "/app/components/dispatch_away/dispatchAwayEditView.html",
            controller: "dispatchAwayEditController"
        }).state('approve_dispatch_away', {
            url: "/approve_dispatch_away/:id",
            parent: 'base',
            templateUrl: "/app/components/dispatch_away/approveDispatchAway.html",
            controller: "dispatchAwayEditController"
        }).state('approve_dispatch_away_list', {
            url: "/approve_dispatch_away_list/",
            parent: 'base',
            templateUrl: "/app/components/dispatch_away/approveDispatchAwayListView.html",
            controller: "approveDispatchAwayListController"
        }).state('send_dispatch_away_list', {
            url: "/send_dispatch_away_list/",
            parent: 'base',
            templateUrl: "/app/components/dispatch_away/sendDispatchAwayListView.html",
            controller: "sendDispatchAwayListController"
        });
        //$urlRouterProvider.otherwise('/admin');
    }
})();


// AngularUI: thay dổi page của app base state not base route URL

// 1. tạo module, tham số add module chung(vì chứa thư viện), 
//2. inject 
//3. viet hàm được đặt ở  mục 1 với  stateProvider
