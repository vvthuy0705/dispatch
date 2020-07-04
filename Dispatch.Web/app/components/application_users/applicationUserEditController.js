
(function (app) {
    'use strict';

    app.controller('applicationUserEditController', applicationUserEditController);

    applicationUserEditController.$inject = ['$scope', 'apiService', 'notificationService', '$location', '$stateParams'];

    function applicationUserEditController($scope, apiService, notificationService, $location, $stateParams) {
        $scope.account = {
            GroupName: ''
        }


        $scope.updateAccount = updateAccount;
        $scope.permission = {
        }

        function updateAccount() {
            apiService.put('/api/applicationUser/update', $scope.account, addSuccessed, addFailed);
        }
        function loadDetail() {
            apiService.get('/api/applicationUser/detail/' + $stateParams.id, null,
                function (result) {
                    console.log(result);
                    $scope.permission = result.data.GroupName;
                    $scope.account = result.data;
                },
                function (result) {
                    notificationService.displayError(result.data);
                });
        }
        function addSuccessed(result) {
            console.log(result);
            EachCheckboxInput(result)
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

        //-------------------------------- Phần xử  lý nghiệp vụ cho user---------------------------------------

        function deleteUpdatePermission(id, result, param) {
            var url = 'http://' + hostlink + ':3000/api/' + $scope.permission + '/' + id;
            apiService.del(url, null,
                function () {
                    notificationService.displaySuccess('Xóa user quyền cũ thành công!');
                    AddUser(result, param);
                },
                function (error) {
                    console.log(error);
                    notificationService.displayError('Xóa user quyền cũ không thàn công!');
                });
        }
        $scope.DataDepartUnit = {}
        function ConvertData(result, paramPermision) {
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
        }

        function UpdateUser(result, paramPermision) {
            ConvertData(result, paramPermision);
            var url = 'http://' + hostlink + ':3000/api/' + paramPermision + '/' + $scope.DataDepartUnit.id;
            var data = $scope.DataDepartUnit;
            apiService.put(url, data,
                function () {
                    notificationService.displaySuccess($scope.account.FullName + ' đã được cập nhật thành công.');
                    $location.url('application_users');
                }, function (error) {
                    console.log(error.data);
                    notificationService.displayError('Cập nhật trên mạng không thành công!');
                });
        }

        function AddUser(result, paramPermision) {
            ConvertData(result, paramPermision);
            var url = 'http://' + hostlink + ':3000/api/' + paramPermision + '/';
            var data = $scope.DataDepartUnit;
            apiService.post(url, data,
                function () {
                    notificationService.displaySuccess($scope.account.FullName + ' chuyển quyền thành công!');
                    $location.url('application_users');
                }, function (error) {
                    console.log(error.data);
                    notificationService.displayError('Chuyển quyền user không thành công!');
                });
        }
            
        function EachCheckboxInput(result) {
            $('input[type=checkbox]').each(function () {
                if (this.checked) {
                    var param = $(this).attr('nameAuthen');
                    if (param == $scope.permission) {
                        UpdateUser(result, param);
                    } else {
                        deleteUpdatePermission($scope.account.Id, result, param)
                    }
                }
            });
        }

        $scope.checkAuthen = checkAuthen;
        function checkAuthen() {
            $("input[type='checkbox']").change(function () {
                if (this.checked == true) {
                    $('.checkAuthen').prop('disabled', true);
                    $(this).prop('disabled', false);
                    $scope.account.GroupName = $(this).attr('nameAuthen');
                    $('#positionGroup_1').val($(this).attr('nameAuthen'));
                    console.log($scope.account);
                } else {
                    $('.checkAuthen').removeAttr('disabled');
                    $('#positionGroup_1').val('');
                    $scope.account.GroupName = '';
                }
            });
        }
        loadGroups();
        loadDetail();
    }
})(angular.module('dispatch.application_users'));