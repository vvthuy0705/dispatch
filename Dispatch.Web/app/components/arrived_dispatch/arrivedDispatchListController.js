
/// <reference path="../../../assets/admin/libs/ngbootbox/ngbootbox.js" />

// controller productCategory
(function (app) {
    // khởi tạo 1 controller thực chất là khởi tạo phương thức cotroller 
    app.controller('arrivedDispatchListController', arrivedDispatchListController);
    // khởi tạo tự động các đối tượng service , và inject vào trong hàm productCategoryListController
    arrivedDispatchListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$filter'];

    function arrivedDispatchListController($scope, apiService, notificationService, $ngBootbox, $filter) {;
        // khai báo phương thức lấy dữ liệu từ server
        $scope.getProduct = getProduct;
        // keyword cho phần tìm kiếm 
        $scope.keyword = '';
        $scope.urlDispatch = 'https://ipfs.io/ipfs/';
        $scope.deleteProduct = deleteProduct;
        $scope.searchProduct = searchProduct;
        // thưc hiện gọi api đến controller lấy dữ liệu
        function getProduct() {
            apiService.get('http://' + hostLam + ':3000/api/CongVanDen', null,
                function (result) {
                    if (result.data.TotalCount == 0) {
                        notificationService.displayWarning('Không có dữ liệu!');
                    }
                    console.log(result);
                    console.log(result.data);
                }, function (error) {
                    notificationService.displayError('Tải dữ liệu không thành công!');
                    console.log(error.data + 'Load product category failed!');
                });
        }
        // ham se chay khi controller khoi tao
        $scope.getProduct();
        // function lắng nghe sự thay đổi của productCategories, $filter sẽ check khi mà có dối tượng của prodctcategories thay đổi , với function call, n: new, o: old
        // filter giá trị mới 
        $scope.$watch("dispatchAways", function (n, o) {
            var checked = $filter("filter")(n, { checked: true });
            // lengt lớn hơn 0
            if (checked.length) {
                $scope.selected = checked;
                $('#btnDelete').removeAttr('disabled');
            } else {
                $('#btnDelete').attr('disabled', 'disabled');
            }
        }, true);

        function searchProduct() { }

        function deleteProduct(ID) {

            $scope.config = {
                $class: "org.dispatch.network.DeleteDispatchAway",
                dispatchAway: 'org.dispatch.CongVanDen#' + ID,
                deleter: 'org.dispatch.network.ClericalUnit#123'
            }

            $ngBootbox.confirm("Bạn chắc chắn muốn xóa!").then(function () {
                apiService.post('http://' + hostLam + ':3000/api/CongVanDen/', $scope.config, function () {
                    notificationService.displaySuccess('Công văn đã xóa!');
                    getProduct();
                }, function (error) {
                    console.log(error);
                    notificationService.displayWarning('Xóa không thành công!');
                });
            });
        }
    }
    // add thư viện, class, namespce để mình có thể gọi được phướng thức và láy dữ liệu
})(angular.module('dispatch.CongVanDen'));