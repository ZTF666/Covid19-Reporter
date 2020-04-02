// this file contains jquery and Ajax
// we setup the data and set the options for the datatable and load it from Ajax
$(document).ready(function () {
    // var arreglo = ['https://covid2019-api.herokuapp.com/v2/current'];
    $.ajax({
        url: 'https://covid2019-api.herokuapp.com/v2/current',
        dataType: 'json',
        success: function (json) {}
    });
    $('#example').DataTable({
        ajax: {
            url: "https://covid2019-api.herokuapp.com/v2/current",
            dataSrc: 'data'
        },

        columns: [{
                data: 'location'
            },
            {
                data: 'deaths'
            },
            {
                data: 'confirmed'
            },
            {
                data: 'active'
            },
            {
                data: 'recovered'
            }

        ],
        dom: "<'row'<'col-md-6'l><'col-md-6'f>><'row'<'col-md-6'B><'col-md-6'p>><'row'<'col-md-12't>><'row'<'col-md-12'i>>",

        buttons: [

            'excelHtml5',
            'csvHtml5',

        ]

    });
});