var common = {
    init: function () {
        common.registerEvents();
    },
    // tự động tìm kiếm khi có nhập text vào
    registerEvents: function () {
        common.loadData();
    },
    loadData: function () {
        $.ajax({
            url: 'http://' + hostlink + ':3000/api/queries/filterDispatchAwayByDepartmentAll',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var template = $('#tplDispatch').html();
                var html = '';
                $.each(data, function (i, item) {
                    html += Mustache.render(template, {
                        url: 'https://ipfs.io/ipfs/',
                        data: item.data,
                        number: item.number,
                        summaryContent: item.summaryContent,
                    });
                });
                if (html == '') {
                    $('.document-new').html('Không có công văn mới nào!');
                }
                $('.document-new').html(html);
            }

        });
    },
}
common.init();