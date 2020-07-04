(function (app) {
    'use strict';

    app.controller('applicationUserListController', applicationUserListController);

    applicationUserListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];

    function applicationUserListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.loading = true;
        $scope.data = [];
        $scope.page = 0;
        $scope.pageCount = 0;
        $scope.search = search;
        $scope.clearSearch = clearSearch;
        $scope.deleteItem = deleteItem;

        function deleteItem(id,groupName) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?')
                .then(function () {
                    var config = {
                        params: {
                            id: id
                        }
                    }
                    apiService.del('/api/applicationUser/delete', config,
                        function () {
                            deleteUpdatePermission(id, groupName);
                        },
                        function (error) {
                            console.log(error)
                        });
                });
        }
        function deleteUpdatePermission(id, permission) {
            var url = 'http://' + hostlink + ':3000/api/' + permission + '/' + id;
            apiService.del(url, null,
                function () {
                    notificationService.displaySuccess('Đã xóa thành công.');
                    search();
                },
                function (error) {
                    notificationService.displayError('Xóa không thành công.');
                    console.log(error)
                });
        }
        function search(page) {
            page = page || 0;

            $scope.loading = true;
            var config = {
                params: {
                    page: page,
                    pageSize: 1,
                    filter: $scope.filterExpression
                }
            }

            apiService.get('api/applicationUser/getlistpaging', config, dataLoadCompleted, dataLoadFailed);
        }

      

        function dataLoadCompleted(result) {
            console.log(result);
            $scope.data = result.data.Items;
            $scope.page = result.data.Page;
            $scope.pagesCount = result.data.TotalPages;
            $scope.totalCount = result.data.TotalCount;
            $scope.loading = false;

            if ($scope.filterExpression && $scope.filterExpression.length) {
                notificationService.displayInfo(result.data.Items.length + ' items found');
            }
        }
        function dataLoadFailed(response) {
            notificationService.displayError(response.data);
        }

        function clearSearch() {
            $scope.filterExpression = '';
            search();
        }

        $scope.search();
    }
})(angular.module('dispatch.application_users'));