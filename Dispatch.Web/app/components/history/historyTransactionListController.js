
/// <reference path="../../../assets/admin/libs/ngbootbox/ngbootbox.js" />

// controller productCategory
(function (app) {
    // khởi tạo 1 controller thực chất là khởi tạo phương thức cotroller 
    app.controller('historyTransactionListController', historyTransactionListController);
    // khởi tạo tự động các đối tượng service , và inject vào trong hàm productCategoryListController
    historyTransactionListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$filter'];

    function historyTransactionListController($scope, apiService, notificationService, $ngBootbox, $filter) {
        // khai báo mảng rỗng, đây là dữ liệu được truyền ra khi mà server trả vể, nó sẽ lưu vào tên biến mảng này 
        $scope.dispatchAways = [];
        // khai báo biến ban đầu
        $scope.page = 0;
        $scope.pagesCount = 0;
        // keyword cho phần tìm kiếm 
        $scope.keyword = '';
        $scope.urlDispatch = 'https://ipfs.io/ipfs/';
        $scope.searchProduct = searchProduct;
        $scope.AddProduct = AddProduct;
        $scope.deleteProduct = deleteProduct;
        // sự kiện selecy all
        $scope.selectAll = selectAll;
        // sự kiện delete multi
        $scope.deleteMultiple = deleteMultiple;


        function deleteMultiple() {
            var listId = [];
            $.each($scope.selected, function (i, item) {
                listId.push(item.ID);
            });
            var config = {
                params: {
                    checkedProduct: JSON.stringify(listId)
                }
            }
            apiService.del('/api/product/deletemultiple', config, function () {
                notificationService.displaySuccess('Xóa không thành công!');
                $scope.searchProduct();
            }, function () {
                notificationService.displayError('Không cho phép xóa nhiều công văn!');
            });
        }

        $scope.isAll = false;

        function selectAll() {
            if ($scope.isAll === false) {
                angular.forEach($scope.dispatchAways, function (item) {
                    item.checked = true;
                });
                $scope.isAll = true;
            } else {
                angular.forEach($scope.dispatchAways, function (item) {
                    item.checked = false;
                });
                $scope.isAll = false;
            }
        }

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


        function deleteProduct(ID) {

            $scope.config = {
                $class: "org.dispatch.network.DeleteDispatchAway",
                dispatchAway: 'org.dispatch.network.DispatchAway#' + ID,
                deleter: 'org.dispatch.network.ClericalUnit#123'
            }

            $ngBootbox.confirm("Bạn chắc chắn muốn xóa!").then(function () {
                apiService.post('http://' + hostlink + ':3000/api/DeleteDispatchAway/', $scope.config, function (result) {
                    notificationService.displaySuccess('Công văn đã xóa!');
                    searchProduct();
                }, function (error) {
                        console.log(error);
                    notificationService.displayWarning('Xóa không thành công!');
                });
            });
        }

        $scope.confirmSenDispatch = confirmSenDispatch;
        function confirmSenDispatch(id,sender) {

            $scope.config = {
                $class: "org.dispatch.network.DeleteDispatchAway",
                dispatchAway: 'org.dispatch.network.DispatchAway#' + id,
                sender: "org.dispatch.network.ClericalUnit#"+sender,
                finished: true
            }

            $ngBootbox.confirm("Xác nhận gửi công văn!").then(function () {
                apiService.post('http://' + hostlink + ':3000/api/SendDispatchAway/', $scope.config, function (result) {
                    notificationService.displaySuccess('Công văn gửi thành công!');
                    searchProduct();
                }, function (error) {
                    console.log(error);
                    notificationService.displayWarning('Gửi công văn không thành công!');
                });
            });
        }

        function AddProduct() {
            // locationpath
        }

        function searchProduct() {
            getProduct();
        }
        // khai báo phương thức lấy dữ liệu từ server
        $scope.getProduct = getProduct;
        // thưc hiện gọi api đến controller lấy dữ liệu
        function getProduct(page) {
            //page = page || 0;
            //var config = {
            //    params: {
            //        keyword: $scope.keyword,
            //        page: page,
            //        pageSize: 6
            //    }
            //}
            ///api/product/getAll
            apiService.get('http://' + hostlink + ':3000/api/system/historian', null,
                function (result) {
                    if (result.data.TotalCount == 0) {
                        notificationService.displayWarning('Không có dữ liệu!');
                    }
                    console.log(result);
                    $scope.dispatchAways = result.data;
                    console.log($scope.dispatchAways.data);
                    //$scope.page = result.data.Page;
                    //$scope.pagesCount = result.data.TotalPages;
                    //$scope.totalCount = result.data.TotalCount;
                }, function (error) {
                    notificationService.displayError('Tải dữ liệu không thành công!');
                    console.log(error.data + 'Load product category failed!');
                });
        }
     
        $scope.exportExcel = exportExcel;

        function exportExcel() {
            var config = {
                params: {
                    keyword: $scope.keyword
                }
            }

            apiService.get('api/product/ExportXls', config,
                function (response) {
                    if (response.status == 200) {
                        window.location.href = response.data.Message;
                    }
                }, function (error) {
                    notificationService.displayError(error);
                });

        }
        $scope.exportPdf = exportPdf;
        function exportPdf(productId) {
            var config = {
                params: {
                    id: productId
                }
            }
            apiService.get('api/product/ExportPdf', config,
                function (response) {
                    if (response.status == 200) {
                        window.open(response.data.Message);
                    }
                }, function (error) {
                    notificationService.displayError(error);
                });
        }

        // ham se chay khi controller khoi tao
        $scope.getProduct();

    }
    // add thư viện, class, namespce để mình có thể gọi được phướng thức và láy dữ liệu
})(angular.module('dispatch.dispatchAway'));