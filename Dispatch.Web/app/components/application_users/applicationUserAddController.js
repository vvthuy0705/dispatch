(function (app) {
    'use strict';

    app.controller('applicationUserAddController', applicationUserAddController);

    applicationUserAddController.$inject = ['$scope', 'apiService', 'notificationService', '$location', 'commonService'];

    function applicationUserAddController($scope, apiService, notificationService, $location, commonService) {
        $scope.account = {
            Groups: [],
            GroupName:''
        }

        $scope.addAccount = addAccount;

        function addAccount() {
            apiService.post('/api/applicationUser/add', $scope.account, addSuccessed, addFailed);
        }

        function addSuccessed(result) {
            console.log(result);
            EachCheckboxInput(result);
        }
        function addFailed(response) {
            notificationService.displayError(response.data.Message);
            //notificationService.displayErrorValidation(response);
        }

        function loadGroups() {
            apiService.get('/api/applicationGroup/getlistall',
                null,
                function (response) {
                    $scope.groups = response.data;
                }, function (response) {
                    notificationService.displayError('Không tải được danh sách nhóm.');
                });
        }

        function deleteItem(id) {
            var config = {
                params: {
                    id: id
                }
            }
            apiService.del('/api/applicationUser/delete', config,
                function () {
                    notificationService.displaySuccess('Đã xóa sql');
                },
                function () {
                    notificationService.displayError('Xóa không sql');
                });
        }

        //-------------------------------- Phần xử  lý nghiệp vụ cho user---------------------------------------

        function AddUser(result, paramPermision) {
            switch (paramPermision) {
                case 'ManagerUnit':
                    $scope.DataDepartUnit = {
                        $class: 'org.dispatch.network.ManagerUnit',
                        unit: 'HV_KTQS',
                        id: result.data.Id,
                        fullName: result.data.FullName,
                        userName: result.data.UserName,
                        password: result.data.PasswordHash,
                        address: 'Hà Nội',
                        email: result.data.Email,
                        gender: 'Nam',
                    };

                    break;
                case 'ClericalUnit':
                    $scope.DataDepartUnit = {
                        $class: 'resource:org.dispatch.network.ClericalUnit',
                        unit: 'HV_KTQS',
                        id: result.data.Id,
                        fullName: result.data.FullName,
                        userName: result.data.UserName,
                        password: result.data.PasswordHash,
                        address: 'Hà Nội',
                        email: result.data.Email,
                        gender: 'Nam',
                    };
                    break;
                default:
                    $scope.DataDepartUnit = {
                        $class: 'org.dispatch.network.User',
                        department: 'KH_CNTT',
                        id: result.data.Id,
                        fullName: result.data.FullName,
                        userName: result.data.UserName,
                        password: result.data.PasswordHash,
                        address: 'Hà Nội',
                        email: result.data.Email,
                        gender: 'Nam',
                    };
                    break;
            }

            var url = 'http://' + hostlink + ':3000/api/' + paramPermision;
            var data = $scope.DataDepartUnit;
            apiService.post(url,data,
                function () {
                    notificationService.displaySuccess($scope.account.UserName + ' đã được thêm mới.');
                    $location.url('application_users');
                }, function (error) {
                    deleteItem(result.data.Id);
                    console.log(error.data);
                    notificationService.displayError('Tạo trên mạng không thành!');
                });
        }

        $scope.checkAuthen = checkAuthen;
        function checkAuthen() {
            $("input[type='checkbox']").change(function () {
                if (this.checked == true) {
                    $('.checkAuthen').prop('disabled', 'true');
                    $(this).removeAttr('disabled');
                    $scope.account.GroupName = $(this).attr('nameAuthen');
                    $('#positionGroup').val($(this).attr('nameAuthen'));
                    console.log($scope.account.GroupName)
                }
                else {
                    $('.checkAuthen').removeAttr('disabled');
                    $('#positionGroup').val('');
                    $scope.account.GroupName = '';
                }
            });
        }

        function EachCheckboxInput(result) {
            $('input[type=checkbox]').each(function () {
                if (this.checked) {
                    var paramPermision = $(this).attr('nameAuthen');
                    AddUser(result, paramPermision);
                }
            });
        }
        loadGroups();
    }
})(angular.module('dispatch.application_users'));