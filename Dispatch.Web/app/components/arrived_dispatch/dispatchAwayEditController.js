/// <reference path="../../../assets/admin/libs/angular/angular.js" />

(function (app) {
    app.controller('dispatchAwayEditController', dispatchAwayEditController);

    dispatchAwayEditController.$inject = ['$scope', 'notificationService', 'apiService', '$state', '$stateParams', 'commonService']

    function dispatchAwayEditController($scope, notificationService, apiService, $state, $stateParams, commonService) {

        // khai báo các đối tượng binding sang view sử dụng scope

        $scope.idUser = {
            approveBy: '',
            sender: '',
            signer: ''

        }
        $scope.product = {
            $class: 'org.dispatch.network.DispatchAway',
            id: $stateParams.id,
            number: '23',
            releasDate: "2020-06-14T15:20:46.674Z",
            numberPage: 12,
            field: 'chung_khoan',
            summaryContent: 'string',
            unitIssue: 'HV_KTQS',
            data: 'string',
            documentType: 'quyet_dinh',
            statusProcess: 'processing',
            departmentRecived: 'HV_KTQS',
            approveBy: '',
            sender: '',
            signer: '',
            createBy: 'thuy',
            statusSend: false,
            updateDate: "2020-06-14T15:20:46.674Z",
            createDate: "2020-06-14T15:20:46.674Z",
            updateBy: 'thuy'
        }
        $scope.moreImages = [];
        $scope.ChooseMoreImage = function () {
            var finder = new CKFinder();
            // thực hiện upload ảnh luôn

            finder.selectActionFunction = function (fileUrl) {
                $scope.$apply(function () {
                    $scope.moreImages.push(fileUrl);
                });
            }
            finder.popup();
        }

        $scope.UpdateProduct = UpdateProduct;
        $scope.ApproveDispatchAway = ApproveDispatchAway;
        $scope.GetSeoTitle = GetSeoTitle;
        $scope.ckeditorOptions = {
            languague: 'vi',
            height: '200px'
        }

        $scope.ChooseImage = ChooseImage;
        function ChooseImage() {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.product.Image = fileUrl;
            }
            finder.popup();
        }

        function GetSeoTitle() {
            $scope.product.Alias = commonService.getSeoTitle($scope.product.Name);
        }
        function loadProductDetail() {
            apiService.get('http://' + hostlink + ':3000/api/DispatchAway/' + $stateParams.id, null, function (result) {
                
                $scope.product = result.data;
                console.log(result);
            }, function (error) {
                    console.log(error);
                notificationService.displayError(error.data);
            });
        }

        function UpdateProduct() {

            $scope.product.approveBy = 'resource:org.dispatch.network.ManagerUnit#' + $scope.product.approveBy;
            $scope.product.sender = 'resource:org.dispatch.network.ClericalUnit#' + $scope.product.sender;
            $scope.product.signer = 'resource:org.dispatch.network.ManagerUnit#' + $scope.product.signer;
            apiService.post('http://' + hostlink + ':3000/api/UpdateDispatchAway/',
                $scope.product,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' cập nhật thành công!');
                    $state.go('dispatchAway');
                },
                function (error) {
                    console.log(error);
                    notificationService.displayError(error.data.Name + ' cập nhật lỗi!');
                });
        }

        function loadListClericalUnit() {
            apiService.get('http://' + hostlink + ':3000/api/ClericalUnit', null, function (result) {
                $scope.listClericalUnit = result.data;
                console.log($scope.listClericalUnit);
            }, function () {
                console.log(error);
                console.log('không thể lấy danh sách!');
            });
        }

        function loadListManagerUnit() {
            apiService.get('http://' + hostlink + ':3000/api/ManagerUnit', null, function (result) {
                $scope.listManagerUnit = result.data;
                console.log($scope.listManagerUnit);
            }, function (error) {
                console.log(error);
                    console.log('không thể lấy danh sách');
            });
        }


        $scope.approveAway = {
            dispatchAway:'',
            approveBy:'',
            status:''
        }

        function ApproveDispatchAway() {
            $scope.approveAway.dispatchAway = 'resource:org.dispatch.network.DispatchAway#' + $scope.product.id;
            $scope.approveAway.approveBy = 'resource:org.dispatch.network.ManagerUnit#' + $scope.product.approveBy;
            $scope.approveAway.status = 'processed';
            apiService.post('http://' + hostlink + ':3000/api/ApproveDispatchAway/',
                $scope.approveAway,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' duyệt thành công!');
                    $state.go('dispatchAway');
                },
                function (error) {
                    console.log(error);
                    notificationService.displayError(error.data.Name + ' duyệt không thành công');
                });
        }
        loadListClericalUnit();
        loadListManagerUnit();


        loadProductDetail();
    }


})(angular.module('dispatch.dispatchAway'));