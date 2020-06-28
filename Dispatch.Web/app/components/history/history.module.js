/// <reference path="../../../Assets/admin/libs/angular/angular.js" />

(function () {
    angular.module('dispatch.history', ['dispatch.common']).config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('history', {
            url: "/history_transaction",
            parent: 'base',
            templateUrl: "/app/components/dispatch_away/historyTransactionListView.html",
            controller: "historyTransactionListController"
        });
        //$urlRouterProvider.otherwise('/admin');
    }
})();


// AngularUI: thay dổi page của app base state not base route URL

// 1. tạo module, tham số add module chung(vì chứa thư viện), 
//2. inject 
//3. viet hàm được đặt ở  mục 1 với  stateProvider
