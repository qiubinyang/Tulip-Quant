
$(function () {

    $("#table").bootstrapTable({
        url: './user.json',
        search: true,
        searchAlign: 'right',
        toolbar: '#toolbar',
        pagination: true,
        pageSize: 30,
        pageList: [30, 50, 100],
        showToggle: true,
        showColumns: true,
        clickToSelect: true,
        columns: [
            {
                checkbox: true
            },
            {
                field: "uid",
                title: "用户ID",
                align: "center"
            },
            {
                field: "username",
                title: "用户名",
                align: "center"
            },
            {
                field: "tele",
                title: "tele",
                align: "center"
            }
        ]
    })
})
