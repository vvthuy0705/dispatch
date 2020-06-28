var contact = {
    init: function () {

        contact.registerEvent();
    },
    registerEvent: function () {

        contact.initMap();
            

    },
    initMap: function () {
        // This example displays a marker at the center of Australia.
        // When the user clicks the marker, an info window opens.
        // lat: vĩ độ 
        // lng: kinh độ
            var uluru = { lat: parseFloat($('#hidLat').val()), lng: parseFloat($('#hidLng').val() ) };
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 17,
                center: uluru
            });
        // địa chỉ hiện thị alert trên bản đồ
            var contentString = $('#hidAddress').val();

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            })

            var marker = new google.maps.Marker({
                position: uluru,
                map: map,
                title: $('#hidName').val()
            });
                infowindow.open(map, marker);
    }
}
contact.init();