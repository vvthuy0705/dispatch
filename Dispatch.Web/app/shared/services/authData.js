//// chứa các thông tin authen khi đăng nhập xong
//(function (app) {
//    // function chưa thông tin đăng nhập, xem thông tin này đăng nhập chưa
//    // tọa ra để chứa dữ liệu client
//    'use strict';
//    // cách viết ngắn gọn so các viết thông thường
//    app.factory('authData', [
//        function () {
//            var authDataFactory = {};
//            var authentication = {
//                IsAuthenticated: false,// chua dăng nhập
//                userName: ""
//            };
//            authDataFactory.authenticationData = authentication;
//            return authDataFactory;
//        }
//    ]);


//})(angular.module('tedushop.common'));
  
//chứa thông thin authentication sau khi đăng nhập xong
// single page nên server và client tách biệt, nên client tạo athData để lưu thông tin đăng nhập của client
(function (app) {
    'use strict';
    app.factory('authData', [function () {
        var authDataFactory = {};
        var authentication = {
            IsAuthenticated: false,// chưa đăng nhập
            userName: "",
            accessToken:""
        };
        authDataFactory.authenticationData = authentication;

        return authDataFactory; 
    }]);
})(angular.module('dispatch.common'));
