var detail_info;

$(document).ready(function () {
    $("#three-days").hide();
    $("#details").hide();
    $(".detail_container").hide();
    $("#btn_three_days").click(function() {

        if($('#city').val() === null) {

            Swal.fire({
                  type: 'error',
                  title: 'Hata',
                  text: 'Lutfen sehir seciniz'
                })
                return false;
        }

        $.ajax({
            url: 'weather',
            type: 'GET',
            data: {
                'city': $('#city').val(),
                'num_of_days': 3
            },
            contentType: 'application/json',
            success: function(data) {
                $("#main-div").hide();
                $("#three-days").show();
                $("#details").show();
                detail_info = data.detail_info;
                $("#three-days").append('<div class="custom-div">'+data.city+'</div>')

                $.each(data.basic_info, function(i, val) {
                    $("#three-days").append('<div class="custom-div">Day: '+val.date+': Max Temp:' + val.max_temp+ '/ Min Temp:'+ val.min_temp+'</div>')
                })
            },
            error: function() {
                console.log('error')
            }
        })

    })

    $("#btn_five_days").click(function() {
        if($('#city').val() === null) {
            Swal.fire({
                  type: 'error',
                  title: 'Hata',
                  text: 'Lutfen sehir seciniz'
                })
                return false;
        }
        $.ajax({
            url: 'weather',
            type: 'GET',
            data: {
                'city': $('#city').val(),
                'num_of_days': 5
            },
            contentType: 'application/json',
            success: function(data) {
                $("#main-div").hide();
                $("#five-days").show();
                $("#details").show();
                detail_info = data.detail_info;
                $("#five-days").append('<div class="custom-div">'+data.city+'</div>')

                $.each(data.basic_info, function(i, val) {
                    $("#five-days").append('<div class="custom-div">Day: '+val.date+': Max Temp:' + val.max_temp+ '/ Min Temp:'+ val.min_temp+'</div>')
                })
            },
            error: function() {
                console.log('error')
            }
        })

    })

    $("#details-btn").click(function() {
        $(".detail_container").show();
        $(".custom-box").addClass("custom-box-detail");
        $.each(detail_info, function(i, val) {
            $("#detail_content").append('<h6 class="custom-div">Details'+(i+1)+'</h6>')
            $("#detail_content").append('<div class="custom-div">Humidity:'
            +val.humidity+' -  Wind: '
            + val.wind+'  -  Rain: '
            + val.rain+'  -  Cloud: '
            + val.cloud+'  -  Visibility: '
            + val.visibility +'  -  Pressure: '
            + val.pressure +'  -  Sun Rise: '
            + val.sun_rise +'  -  Sun Set'
            + val.sun_set +'  -  Moon Rise: '
            + val.moon_rise +'  -  Moon Set: '
            +val.moon_set +'</div>')
        })

    })
    $(".clsbtn").click(function() {
        $(".custom-box").removeClass("custom-box-detail");
        $(".detail_container").hide();
    })

    $("#back").click(function() {
        location.reload()
    })


})

