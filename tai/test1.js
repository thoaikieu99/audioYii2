function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}
var checkk = 0;
function getCookie(cname) {
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
    return ""
}
function checkCookie() {
    let user = getCookie("username");
    if (user != "") {} else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365)
        }
    }
}
function secondsToTime(secs) {
    var hours = Math.floor(current_time / (60 * 60));
    var divisor_for_minutes = current_time % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj
}
function sm(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));
    if (min < 10) {
        min = "0" + min
    }
    if (sec < 10) {
        sec = "0" + sec
    }
    return hr + ':' + min + ':' + sec
}
function timingSlider() {
    websol_audio.ontimeupdate = function() {
        var websol_audio = document.getElementById('websol-audio');
        var audio_source = document.getElementById('websol-audio-source');
        var slider1 = document.getElementById("seekBar");
        slider1.setAttribute('value', Math.ceil(websol_audio.currentTime));
        jQuery('.startTime1').text(sm(websol_audio.currentTime))
    }
}
function togglePlay() {
    if (checkk != 1){
        checkk = 1;
    console.log("apau");
    } 
    jQuery('.track-control-group div:nth-child(4)').removeClass('pause');
    jQuery('.track-control-group div:nth-child(4)').addClass('play');
    jQuery('.track-control-group div:nth-child(4)').find('.glyphicon').removeClass('glyphicon-pause');
    jQuery('.track-control-group div:nth-child(4)').find('.glyphicon').addClass('glyphicon-play')
}
function togglePause() {
    if (checkk != 2){
        checkk = 2;
    console.log("aplay");
    } 
    
    jQuery('.track-control-group div:nth-child(4)').removeClass('play');
    jQuery('.track-control-group div:nth-child(4)').addClass('pause');
    jQuery('.track-control-group div:nth-child(4)').find('.glyphicon').removeClass('glyphicon-play');
    jQuery('.track-control-group div:nth-child(4)').find('.glyphicon').addClass('glyphicon-pause')
}
function hasValue(data) {
    return (data !== undefined) && (data !== null) && (data !== "")
}
function setPostIds() {
    var post_id = document.querySelector('.status-publish').getAttribute('id').replace("post-", "");
    var prev_post_ids = getCookie('post_ids');
    if (hasValue(prev_post_ids) == !1) {
        setCookie('post_ids', post_id, 7)
    } else {
        var index = prev_post_ids.indexOf(post_id);
        if (index == -1) {
            prev_post_ids += ',' + post_id;
            setCookie('post_ids', prev_post_ids, 7)
        }
    }
}
function setTimer(value) {
    var startDate = new Date();
    var currentRealTime = startDate.getTime() / 1000;
    jQuery('#stop-timer').attr('value', value);
    const hms = value;
    const [hours,minutes,seconds] = hms.split(':');
    const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);
    setCookie('start-real-time', currentRealTime, 7);
    setCookie('stop-time', totalSeconds, 7);
    var interval = setInterval(()=>{
        var websol_audio = document.getElementById('websol-audio');
        var start_real_time = getCookie('start-real-time');
        var stop_timer_time = getCookie('stop-time');
        var startDate = new Date();
        var realTime = startDate.getTime() / 1000;
        var ongoing_time = Math.ceil(realTime) - Math.ceil(start_real_time);
        var remaing_time = Math.ceil(stop_timer_time) - Math.ceil(ongoing_time);
        var remaing_time_hours = sm(remaing_time);
        var websol_audio = document.getElementById('websol-audio');
        var audio_source = document.getElementById('websol-audio-source');
        jQuery('#remaining-time-output').attr('value', remaing_time_hours);
        if (Math.ceil(ongoing_time) >= Math.ceil(stop_timer_time)) {
            jQuery('#stop-timer').attr('value', '00:00:00');
            jQuery('#remaining-time-output').attr('value', '00:00:00');
            websol_audio.pause();
            togglePlay();
            clearInterval(interval)
        }
    }
    , 1000)
}
var audio = document.getElementById('audio');
function websol_constructor() {
    
    jQuery('.post-views').insertBefore(jQuery('.tad-audio-plylist-container'));
    var audio = document.getElementById('audio');
    var plugin_dir = jQuery('#plugin-dir').val();
    var post_id = document.querySelector('.status-publish').getAttribute('id').replace("post-", "");
    var current_time = getCookie('start-time-' + post_id);
    
    var prev_audio_speed = getCookie('start-speed-' + post_id);
    var recent_audio = getCookie('recent-audio-' + post_id);
    var audio_src = '';

    
    

    if (recent_audio != '') {
        audio_src = recent_audio;
        jQuery('div#play-prev-audio').attr('data-src', audio_src);
        jQuery('div#play-prev-audio').attr('data-time', current_time);
        jQuery('div#play-prev-audio').attr('data-speed', parseFloat(prev_audio_speed))
    } else {
    }
    jQuery("#player2").vpplayer({
        src: "",
        trackName: "",
        view: "minimal",
        type: "audio/mp3"
    });
    
    var post_id = document.querySelector('.status-publish').getAttribute('id').replace("post-", "");
    if (getCookie('start-time-' + post_id) !== '' || getCookie('recent-audio-' + post_id) !== '' || getCookie('recent-audio-title-' + post_id) !== '') {
        jQuery('.prev-audio-container').removeClass('d-none')
    }
    var time = getCookie('start-time-' + post_id);
    var audio_title = getCookie('recent-audio-title-' + post_id);
    jQuery('#play-prev-audio time, #prev-audio-time').text(sm(Math.ceil(time)));
    jQuery('#title-text, #prev-audio-title').text(audio_title);
    var default_audio = jQuery('.server-1 .tad-field-content-items:first-child');
    var src = jQuery(default_audio).find('b').attr('id');
    var audio = '<audio id="websol-audio" class="custom-audio websol-audio" controls="controls" style="display:none;"><source id="websol-audio-source" src="' + src + '"></source></audio>';
    jQuery(audio).insertAfter(jQuery("#title-id"));
    var range = document.createElement("INPUT");
    range.setAttribute("id", "websol-range");
    range.setAttribute("class", "custom-range websol-range");
    range.setAttribute("type", "range");
    range.setAttribute("min", "0");
    range.setAttribute("max", "130");
    range.setAttribute("value", "1");
    range.setAttribute("style", "display:none;");
    jQuery(range).insertBefore(jQuery("#seekBar"));
    var websol_audio = document.getElementById('websol-audio');
    var audio_source = document.getElementById('websol-audio-source');
    websol_audio.onloadeddata = function() {
        var slider1 = document.getElementById("seekBar");
        jQuery('.startTime1').text(sm(websol_audio.currentTime));
        jQuery('.endTime1').text(sm(websol_audio.duration));
        slider1.setAttribute('value', '0');
        slider1.setAttribute('min', '0');
        slider1.setAttribute('max', Math.ceil(websol_audio.duration))
    }
    websol_audio.ontimeupdate = function() {
        togglePause();
        var slider = document.getElementById("websol-range");
        var slider1 = document.getElementById("seekBar");
        var websol_audio = document.getElementById('websol-audio');
        var audio_source = document.getElementById('websol-audio-source');
        slider1.setAttribute('max', Math.ceil(websol_audio.duration));
        slider1.setAttribute('min', '0');
        jQuery('#seekBar').prop('value', Math.ceil(websol_audio.currentTime));
        jQuery('.startTime1').text(sm(websol_audio.currentTime));
        var span_speed_value = document.getElementById("playback-speed-value-id").innerHTML;
        span_speed_value = parseFloat(span_speed_value);
        websol_audio.playbackRate = span_speed_value;
        var audio = document.getElementById('websol-audio');
        var recent_audio_title = jQuery('.current-audio #single-audio-title').text();
        var src = jQuery('#websol-audio-source').attr('src');
        document.cookie = "start-time=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "recent-audio=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "start-speed-" + post_id + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "recent-audio-title-" + post_id + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        var post_id = document.querySelector('.status-publish').getAttribute('id').replace("post-", "");
        setCookie("start-time-" + post_id, Math.ceil(audio.currentTime), 7);
        setCookie("start-speed-" + post_id, parseFloat(span_speed_value), 7);
        setCookie('recent-audio-' + post_id, src, 7);
        setCookie('recent-audio-title-' + post_id, recent_audio_title, 7)
    }
    var default_audio = jQuery('.server-1 .tad-field-content-items:first-child');
    var audio_title = jQuery(default_audio).find('#single-audio-title').text();
    jQuery('h1#title-id').text(audio_title)
}
jQuery(document).ready(function() {
    websol_constructor();
    jQuery('.tad-audio-playlist .server-container #server-1').addClass('active-server');
    jQuery('.tad-audio-field-items.tad-audio-field-items.server-1').addClass('active-playlist');
    jQuery('.track-control-group .next').click(function(e) {
        var websol_audio = document.getElementById('websol-audio');
        var audio_source = document.getElementById('websol-audio-source');
        var audio_number = jQuery(".current-audio").attr('id');
        var next_audio_id = Number(audio_number) + 1;
        var next = jQuery('.active-playlist').find('#' + next_audio_id);
        if (next.length == 0) {
            next = jQuery('.active-playlist .tad-field-content-items:first-child')
        }
        var audio_title = jQuery(next).find('#single-audio-title').text();
        jQuery('h1#title-id').text(audio_title);
        jQuery(".tad-field-content-items").removeClass('current-audio');
        jQuery(next).addClass('current-audio');
        var src = jQuery(next).find('b').attr('id');
        audio_source.src = src;
        websol_audio.load();
        websol_audio.onloadeddata = function() {
            var slider1 = document.getElementById("websol-range");
            var audio_input_slider = document.getElementById("seekBar");
            audio_input_slider.setAttribute('max', '0');
            audio_input_slider.setAttribute('min', 0);
            jQuery('#seekBar').prop('value', 0);
            jQuery('.startTime1').text(sm(websol_audio.currentTime));
            jQuery('.endTime1').text(sm(websol_audio.duration));
            websol_audio.play()
        }
    });
    jQuery('.track-control-group .previous').click(function(e) {
        var websol_audio = document.getElementById('websol-audio');
        var audio_source = document.getElementById('websol-audio-source');
        var audio_number = jQuery(".current-audio").attr('id');
        var prev_audio_id = Number(audio_number) - 1;
        var prev = jQuery('.active-playlist').find('#' + prev_audio_id);
        if (prev.length == 0) {
            prev = jQuery('.active-playlist .tad-field-content-items:last-child')
        }
        var audio_title = jQuery(prev).find('#single-audio-title').text();
        jQuery('h1#title-id').text(audio_title);
        jQuery(".tad-field-content-items").removeClass('current-audio');
        jQuery(prev).addClass('current-audio');
        var src = jQuery(prev).find('b').attr('id');
        audio_source.src = src;
        websol_audio.load();
        websol_audio.onloadeddata = function() {
            var slider1 = document.getElementById("websol-range");
            var audio_input_slider = document.getElementById("seekBar");
            slider1.value = Math.ceil(websol_audio.currentTime);
            slider1.setAttribute('value', '0');
            slider1.setAttribute('min', '0');
            slider1.setAttribute('max', '0');
            audio_input_slider.setAttribute('max', websol_audio.duration);
            jQuery('.startTime1').text(sm(websol_audio.currentTime));
            jQuery('.endTime1').text(sm(websol_audio.duration));
            websol_audio.play()
        }
    });
    jQuery(".tad-field-content-items").click(function() {
        var websol_audio = document.getElementById('websol-audio');
        var id = jQuery(this).find('b').attr('id');
        var src = id;
        var audio_title = jQuery(this).find('#single-audio-title').text();
        var audio_source = jQuery('#websol-audio-source').attr('src', src);
        websol_audio.load();
        var post_id = document.querySelector('.status-publish').getAttribute('id').replace("post-", "");
        var span_speed_value = document.getElementById("playback-speed-value-id").innerHTML;
        span_speed_value = parseFloat(span_speed_value);
        document.cookie = "start-time=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "recent-audio=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "start-speed-" + post_id + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "recent-audio-title-" + post_id + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setCookie('recent-audio-title-' + post_id, audio_title, 7);
        setCookie("start-time-" + post_id, Math.ceil(websol_audio.currentTime), 7);
        setCookie("start-speed-" + post_id, parseFloat(span_speed_value), 7);
        setCookie('recent-audio-' + post_id, src, 7);
        jQuery(".tad-field-content-items").removeClass('current-audio');
        jQuery(this).addClass('current-audio');
        jQuery(".tad-field-content-items a").removeClass('download-style');
        jQuery(this).find('a').addClass('download-style');
        jQuery('.tad-audio-main-player h1').text(audio_title);
        var start_time = jQuery('.startTime1').text();
        websol_audio.onloadeddata = function() {
            var slider1 = document.getElementById("websol-range");
            var audio_input_slider = document.getElementById("seekBar");
            audio_input_slider.setAttribute('max', websol_audio.duration);
            audio_input_slider.setAttribute('min', 0);
            jQuery('#seekBar').prop('value', 0);
            jQuery('.startTime1').text(sm(websol_audio.currentTime));
            jQuery('.endTime1').text(sm(websol_audio.duration));
            websol_audio.play()
        }
    });
    jQuery('.stop').click(function() {
        togglePlay();
        var websol_audio = document.getElementById('websol-audio');
        websol_audio.load();
        jQuery('.pause').find[0].setAttribute("class", "glyphicon glyphicon-play");
        jQuery('.pause').setAttribute("class", "play")
    });
    jQuery('#play-prev-audio').click(function() {
        togglePlay();
        var time = jQuery('div#play-prev-audio').attr('data-time');
        var prev_audio_speed = jQuery('div#play-prev-audio').attr('data-speed');
        var formated_time = jQuery('#play-prev-audio time').attr('id');
        var prev_audio_title = jQuery('span#prev-audio-title').text();
        var slider1 = document.getElementById("seekBar");
        var post_id = document.querySelector('.status-publish').getAttribute('id').replace("post-", "");
        var playback_speed_value = document.getElementById('playback-speed-value-id');
        var playback_speed_slider = document.getElementById('playback-speed');
        var src = getCookie('recent-audio-' + post_id);
        var audio = document.getElementById('websol-audio');
        var audio_source = document.getElementById('websol-audio-source');
        audio_source.src = src;
        audio.load();
        audio.onloadeddata = function() {
            jQuery('#seekBar').prop('value', Math.ceil(time));
            slider1.setAttribute('min', '0');
            slider1.setAttribute('max', Math.ceil(audio.duration));
            audio.currentTime = Math.ceil(time);
            audio.playbackRate = parseFloat(prev_audio_speed);
            jQuery('.startTime1').text(formated_time);
            jQuery('.endTime1').text(sm(audio.duration));
            playback_speed_value.innerHTML = parseFloat(prev_audio_speed) + 'x';
            playback_speed_slider.setAttribute('value', parseFloat(prev_audio_speed));
            audio.play()
        }
        jQuery(".tad-field-content-items").removeClass('current-audio');
        jQuery("b[id='" + src + "']").parent(".tad-field-content-items").addClass("current-audio");
        jQuery(".tad-audio-field-items").addClass('d-none');
        jQuery("b[id='" + src + "']").closest(".tad-audio-field-items").removeClass('d-none');
        if (jQuery("b[id='" + src + "']").closest(".tad-audio-field-items").hasClass('server-1')) {
            jQuery('#server-1').addClass('active-server');
            jQuery('#server-2').removeClass('active-server');
            jQuery('#server-3').removeClass('active-server');
            jQuery('#server-4').removeClass('active-server');
            jQuery('#server-5').removeClass('active-server');
            jQuery(".tad-audio-field-items").removeClass('active-playlist');
            jQuery(".server-1").addClass('active-playlist')
        } else if (jQuery("b[id='" + src + "']").closest(".tad-audio-field-items").hasClass('server-2')) {
            jQuery('#server-2').addClass('active-server');
            jQuery('#server-1').removeClass('active-server');
            jQuery('#server-3').removeClass('active-server');
            jQuery('#server-4').removeClass('active-server');
            jQuery('#server-5').removeClass('active-server');
            jQuery(".tad-audio-field-items").removeClass('active-playlist');
            jQuery(".server-2").addClass('active-playlist')
        } else if (jQuery("b[id='" + src + "']").closest(".tad-audio-field-items").hasClass('server-3')) {
            jQuery('#server-3').addClass('active-server');
            jQuery('#server-2').removeClass('active-server');
            jQuery('#server-1').removeClass('active-server');
            jQuery('#server-4').removeClass('active-server');
            jQuery('#server-5').removeClass('active-server');
            jQuery(".tad-audio-field-items").removeClass('active-playlist');
            jQuery(".server-3").addClass('active-playlist')
        } else if (jQuery("b[id='" + src + "']").closest(".tad-audio-field-items").hasClass('server-4')) {
            jQuery('#server-4').addClass('active-server');
            jQuery('#server-2').removeClass('active-server');
            jQuery('#server-1').removeClass('active-server');
            jQuery('#server-3').removeClass('active-server');
            jQuery('#server-5').removeClass('active-server');
            jQuery(".tad-audio-field-items").removeClass('active-playlist');
            jQuery(".server-4").addClass('active-playlist')
        } else {
            jQuery('#server-5').addClass('active-server');
            jQuery('#server-2').removeClass('active-server');
            jQuery('#server-1').removeClass('active-server');
            jQuery('#server-3').removeClass('active-server');
            jQuery('#server-4').removeClass('active-server');
            jQuery(".tad-audio-field-items").removeClass('active-playlist');
            jQuery(".server-5").addClass('active-playlist')
        }
        document.getElementById('title-id').innerHTML = prev_audio_title
    });
    var websol_audio = document.getElementById("websol-audio");
    websol_audio.onpause = function() {
        togglePlay()
    }
    websol_audio.onended = function() {
        if (document.title !== "Nghe Truyện"){
            var websol_audio = document.getElementById('websol-audio');
            var audio_source = document.getElementById('websol-audio-source');
            jQuery('.startTime1').text(sm(websol_audio.currentTime));
            togglePause();
            var audio_number = jQuery(".current-audio").attr('id');
            var next_audio_id = Number(audio_number) + 1;
            var next = jQuery('.active-playlist').find('#' + next_audio_id);
            if (next.length == 0) {
                next = jQuery('.active-playlist .tad-field-content-items:first-child')
            }
            var audio_title = jQuery(next).find('#single-audio-title').text();
            jQuery('h1#title-id').text(audio_title);
            jQuery(".tad-field-content-items").removeClass('current-audio');
            jQuery(next).addClass('current-audio');
            var src = jQuery(next).find('b').attr('id');
            audio_source.src = src;
            websol_audio.load();
            var span_speed_value = document.getElementById("playback-speed-value-id").innerHTML;
            span_speed_value = parseFloat(span_speed_value);
            websol_audio.playbackRate = span_speed_value;
            websol_audio.onloadeddata = function() {
                var slider1 = document.getElementById("websol-range");
                slider1.value = Math.ceil(websol_audio.currentTime);
                slider1.setAttribute('value', '0');
                slider1.setAttribute('min', '0');
                slider1.setAttribute('max', '0');
                jQuery('.startTime1').text(sm(websol_audio.currentTime));
                jQuery('.endTime1').text(sm(websol_audio.duration))
            }
            websol_audio.play()
        }

    }
    jQuery('#websol-audio-timer-container').insertBefore(jQuery('.prev-audio-container'));
    jQuery('.server-container #server-2').click(function() {
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-2').removeClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-1').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-3').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-4').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-5').addClass('d-none');
        jQuery(this).addClass('active-server');
        jQuery('.server-container #server-1').removeClass('active-server');
        jQuery('.server-container #server-3').removeClass('active-server');
        jQuery('.server-container #server-4').removeClass('active-server');
        jQuery('.server-container #server-5').removeClass('active-server')
    });
    jQuery('.server-container #server-1').click(function() {
        jQuery(this).addClass('active-server');
        jQuery('.server-container #server-2').removeClass('active-server');
        jQuery('.server-container #server-3').removeClass('active-server');
        jQuery('.server-container #server-4').removeClass('active-server');
        jQuery('.server-container #server-5').removeClass('active-server');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-1').removeClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-2').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-3').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-4').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-5').addClass('d-none')
    });
    jQuery('.server-container #server-3').click(function() {
        jQuery(this).addClass('active-server');
        jQuery('.server-container #server-2').removeClass('active-server');
        jQuery('.server-container #server-1').removeClass('active-server');
        jQuery('.server-container #server-4').removeClass('active-server');
        jQuery('.server-container #server-5').removeClass('active-server');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-3').removeClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-2').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-1').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-4').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-5').addClass('d-none')
    });
    jQuery('.server-container #server-4').click(function() {
        jQuery(this).addClass('active-server');
        jQuery('.server-container #server-2').removeClass('active-server');
        jQuery('.server-container #server-1').removeClass('active-server');
        jQuery('.server-container #server-3').removeClass('active-server');
        jQuery('.server-container #server-5').removeClass('active-server');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-4').removeClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-2').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-1').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-3').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-5').addClass('d-none')
    });
    jQuery('.server-container #server-5').click(function() {
        jQuery(this).addClass('active-server');
        jQuery('.server-container #server-2').removeClass('active-server');
        jQuery('.server-container #server-1').removeClass('active-server');
        jQuery('.server-container #server-3').removeClass('active-server');
        jQuery('.server-container #server-4').removeClass('active-server');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-5').removeClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-2').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-1').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-3').addClass('d-none');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-4').addClass('d-none')
    });
    jQuery('#server-2').click(function() {
        jQuery('.tad-audio-field-items').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-1').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-3').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-4').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-5').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-2').addClass('active-playlist')
    });
    jQuery('#server-1').click(function() {
        jQuery('.tad-audio-field-items').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-2').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-3').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-4').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-5').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-1').addClass('active-playlist')
    });
    jQuery('#server-3').click(function() {
        jQuery('.tad-audio-field-items').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-2').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-1').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-4').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-5').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-3').addClass('active-playlist')
    });
    jQuery('#server-4').click(function() {
        jQuery('.tad-audio-field-items').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-2').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-1').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-3').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-5').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-4').addClass('active-playlist')
    });
    jQuery('#server-5').click(function() {
        jQuery('.tad-audio-field-items').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-2').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-1').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-3').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-4').removeClass('active-playlist');
        jQuery('.tad-audio-field-items.tad-audio-field-items.server-5').addClass('active-playlist')
    });
    jQuery(document).on('input change', '#playback-speed', function() {
        jQuery('#playback-speed-value-id').html(jQuery(this).val() + 'x')
    });
    jQuery(document).on('input change', '#seekBar', function() {
        jQuery('.startTime1').html(sm(jQuery(this).val()));
        togglePause();
        var websol_audio = document.getElementById('websol-audio');
        websol_audio.play()
    });
    jQuery('.stop').click(function() {
        var websol_audio = document.getElementById('websol-audio');
        console.log("apau");
        websol_audio.stop()
    })
});
