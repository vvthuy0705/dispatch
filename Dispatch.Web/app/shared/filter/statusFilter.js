(function (app) {
    app.filter('statusFilter', function () {
        return function(input){
            if (input == true) {
                return "Đã gửi";
            } else {
                return "Chưa gửi";
            }
        }
    });
    app.filter('statusProcess', function () {
        return function (input) {
            if (input == 'processed') {
                return "Đã duyệt";
            } else {
                return "Chưa duyệt";
            }
        }
    });
    app.filter('statusSuccess', function () {
        return function (input) {
            if (input == true) {
                return "OK";
            } else {
                return "Unsuccessful";
            }
        }
    });
})(angular.module('dispatch.common'));