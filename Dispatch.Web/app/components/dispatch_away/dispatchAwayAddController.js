
(function (app) {
    'use strict';
    app.controller('dispatchAwayAddController', dispatchAwayAddController);
    // $state đối tượng  của ui-router để điều hướng 
    dispatchAwayAddController.$inject = ['$scope', 'apiService', 'notificationService', '$state'];

    function dispatchAwayAddController($scope, apiService, notificationService, $state) {
        $scope.idUser = {
            approveBy: '',
            sender: '',
            signer: ''

        }
        $scope.product = {
            $class: 'org.dispatch.network.DispatchAway',
            id: '242',
            number: '23',
            releasDate: "2020-06-14T15:20:46.674Z",
            numberPage: 12,
            field: 'chung_khoan',
            summaryContent: 'string',
            unitIssue: 'HV_KTQS',
            data: 'string',
            documentType: 'quyet_dinh',
            statusProcess: 'processing',
            departmentRecived: 'cntt',
            approveBy: '',
            sender: '',
            signer: '',
            createBy: 'thuy',
            statusSend: false,
            updateDate: new Date(),
            createDate: new Date(),
            updateBy: 'thuy'
        }


        $scope.moreImages = [];
        $scope.ChooseMoreImage = function () {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.$apply(function () {
                    $scope.moreImages.push(fileUrl);
                });
            }
            finder.popup();
        }
        $scope.listClericalUnit = [];
        $scope.listManagerUnit = [];
        $scope.AddProduct = AddProduct;
        $scope.ckeditorOptions = {
            languague: 'vi',
            height: '200px'
        }

        $scope.ChooseImage = ChooseImage;
        function ChooseImage() {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.$apply(function () {
                    $scope.product.Image = fileUrl;
                });
            }
            finder.popup();
        }

        function AddProduct() {
            $scope.product.approveBy = 'resource:org.dispatch.network.ManagerUnit#' + $scope.idUser.approveBy;
            $scope.product.sender = 'resource:org.dispatch.network.ClericalUnit#' + $scope.idUser.sender;
            $scope.product.signer = 'resource:org.dispatch.network.ManagerUnit#' + $scope.idUser.signer;
            //$scope.product.MoreImages = JSON.stringify($scope.moreImages);
            apiService.post('http://' + hostlink + ':3000/api/CreateDispatchAway', $scope.product,
                function (result) {
                    notificationService.displaySuccess('Công văn số ' + result.data.number + ' tạo thành công!');
                    $state.go('products');
                }, function (error) {
                    console.log(error.data);
                    notificationService.displayError('Tạo mới không thành công!');
                });
        }
        function loadListClericalUnit() {
            apiService.get('http://' + hostlink + ':3000/api/ClericalUnit', null, function (result) {
                $scope.listClericalUnit = result.data;
                console.log($scope.listClericalUnit);
            }, function () {
                console.log(error);
                console.log('can not get list');
            });
        }

        function loadListManagerUnit() {
            apiService.get('http://' + hostlink + ':3000/api/ManagerUnit', null, function (result) {
                $scope.listManagerUnit = result.data;
                console.log($scope.listManagerUnit);
            }, function (error) {
                console.log(error);
                console.log('can not get list');
            });
        }

        $scope.uploadFile = uploadFile;
        function uploadFile() {
            var input = document.getElementById('fileinput');

            var file = input.files[0];

            var fileReader = new FileReader();

            fileReader.readAsBinaryString(file);

            fileReader.onload = function (progressEvent) {
                //appendLog("onload!");

                var stringData = fileReader.result;
                //appendLog(stringData);

                const repoPath = 'ipfs-' + Math.random();
                const ipfs = new Ipfs({ repo: repoPath });
                //const ipfs = new Ipfs({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

                ipfs.on('ready', () => {
                    const Buffer = window.Ipfs.Buffer
                    console.log(Buffer.from(btoa(fileReader.result), "base64"));
                    const files = [
                        {
                            path: 'image1.png',
                            content: Buffer.from(btoa(fileReader.result), "base64")
                        }
                    ]
                    ipfs.add(files, function (err, files) {
                        let url = "https://ipfs.io/ipfs/" + files[0].hash;
                        console.log(url);
                        $scope.product.data = files[0].hash;
                        log("Storing file on IPFS using Javascript. HASH: https://ipfs.io/ipfs/" + files[0].hash);
                        var ipfsPath = files[0].hash
                        ipfs.cat(ipfsPath, function (err, result) {
                            if (err) {
                                throw err
                            }
                            img = file.toString("base64");
                            document.getElementById("dataEncode").src = "data:image/png;base64," + img;
                        });
                    });

                    const log = (line) => {
                        document.getElementById('dataEncode').appendChild(document.createTextNode(`${line}\r\n`))
                    }

                });
            }

        }
        // chạy khi controller khởi tạog
        loadListClericalUnit();
        loadListManagerUnit();
    }

})(angular.module('dispatch.dispatchAway'));


