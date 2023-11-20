
jQuery('#111').click(function() {
    myFunction111();
});
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}
function myFunction111() {
    var val = document.getElementById('qerid111');
    var url = val.value;
    var csr = val.className;
    var id = val.name;

    var startt  =  getCookie('start-time-' + id);
    var starts  =  getCookie('start-speed-' + id);
    var recenta  =  getCookie('recent-audio-' + id);
    var recentat  =  getCookie('recent-audio-title-' + id)

    jQuery.ajax({
        type: "POST",
        url: url,
        data: { id:id, startt: startt, starts: starts ,recenta: recenta, recentat: recentat,_csrf : csr }
    }).done(function( msg ) {
        console.log(msg);
        swal(msg);
    });
    return true;
}

jQuery('#222').click(function() {
    myFUnction222();
});
function myFUnction222(){
    var val = document.getElementById('qerid222');
    var url = val.value;
    var csr = val.className;
    var id = val.name;
    jQuery.ajax({
        type: "POST",
        url: url,
        data: { id:id, _csrf : csr}
    }).done(function( msg ) {
        var aaa = JSON.parse(msg);
        if(aaa['recaudio'] != null){
            var idd = id;
            console.log(aaa);
            setCookie("start-time-" + idd, aaa['startime'], 7);
            setCookie("start-speed-" + idd, aaa['startspeed'], 7);
            setCookie('recent-audio-' + idd, aaa['recaudio'], 7);
            setCookie('recent-audio-title-' + idd, aaa['rectile'], 7);
            location.reload();
        }
    });
}

function getver() {
    let cname = "ver-id"
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    var id123 = document.getElementById("1233");
    if (id123){
        document.getElementById("1233").style.display = "none";
    }

    return ""
}

var ac = null;
$(document).ready(function() {
    $.ajax({
        url: '/updatee/test.php',
        success: function(data) {
            var aaa = parseFloat(getver());
            if(aaa == null){
                document.getElementById("nottti").style.display = "none";
            }else {
                ac = data;
                ac = parseFloat(ac);
                if (ac > aaa){
                    document.getElementById("nottti").style.color = "red";
                }
            }
            
        }
    });
});

var ac = null;
$(document).ready(function() {
    $.ajax({
        url: '/updatee/test.php',
        success: function(data) {
            var aaa = parseFloat(getver());
            if(aaa == null){
                document.getElementById("nottti").style.display = "none";
            }else {
                ac = data;
                ac = parseFloat(ac);
                if (ac > aaa){
                    document.getElementById("nottti").style.color = "red";
                }
            }
            
        }
    });
});


$("#1233").click(function(e){
    console.log(ac);
    var aaa = getver();
    var bbb = parseFloat(aaa);

    if(aaa == null){
        document.getElementById("nottti").style.display = "none";
    }else {
        if(ac>bbb){
            console.log('aaaa');
            swal({
                title: "Có bản cập nhật mới: "+ ac,
                text: "Bạn có muốn cập nhật không?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        console.log("updateapp");
                    } else {
                        swal("Vui lòng cập nhật lên bản mới nhất để có thể sử dụng tính năng mới nhất.");
                    }
                });
        }else{
            swal("Đã là phiên bản mới nhất");
        }
    }
    

})