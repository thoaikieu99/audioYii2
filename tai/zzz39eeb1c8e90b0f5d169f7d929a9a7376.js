var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(f) {
    var b = 0;
    return function() {
        return b < f.length ? {
            done: !1,
            value: f[b++]
        } : {
            done: !0
        }
    }
};
$jscomp.arrayIterator = function(f) {
    return {
        next: $jscomp.arrayIteratorImpl(f)
    }
};
$jscomp.makeIterator = function(f) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && f[Symbol.iterator];
    return b ? b.call(f) : $jscomp.arrayIterator(f)
};
(function(f) {
    function b(h, p, l, C, y, M, D, G) {
        G = l.length / 2;
        D = Math.round(G * D);
        var z = Math.round(1 * G) + 1;
        G = p.width / (z - D - 1);
        M = y + M;
        C /= y;
        h.beginPath();
        h.moveTo((D - D) * G, M);
        h.lineTo((D - D) * G, M - Math.round((l[2 * D] || 0) / C));
        for (y = D; y < z; y++) {
            var n = l[2 * y] || 0;
            n = Math.round(n / C);
            h.lineTo((y - D) * G + p.halfPixel, M - n)
        }--z;
        for (z; z >= D; z--) n = l[2 * z + 1] || 0, n = Math.round(n / C), h.lineTo((z - D) * G + p.halfPixel, M - n);
        h.lineTo((D - D) * G, M - Math.round((l[2 * D + 1] || 0) / C));
        h.closePath();
        h.fill()
    }
    var A = function() {};
    A.isEmpty = function(h) {
        return 0 == h.replace(/^\s+|\s+$/g, "").length
    };
    A.strip = function(h) {
        return h.replace(/^\s+|\s+$/g, "")
    };
    A.isNumber = function(h) {
        return !isNaN(parseFloat(h)) && isFinite(h)
    };
    A.isMobile = function() {
        return /Android|webOS|iPhone|iPad|iPod|sony|BlackBerry/i.test(navigator.userAgent)
    };
    A.isChrome = function() {
        return !!f.chrome && (!!f.chrome.webstore || !!f.chrome.runtime)
    };
    A.isSafari = function() {
        return 0 < Object.prototype.toString.call(f.HTMLElement).indexOf("Constructor")
    };
    A.isIE = function() {
        var h = -1;
        if ("Microsoft Internet Explorer" == navigator.appName) {
            var p = navigator.userAgent,
                l = /MSIE ([0-9]{1,}[.0-9]{0,})/;
            null != l.exec(p) && (h = parseFloat(RegExp.$1))
        } else "Netscape" == navigator.appName && (p = navigator.userAgent, l = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/, null != l.exec(p) && (h = parseFloat(RegExp.$1)));
        return -1 != h ? !0 : !1
    };
    A.isIOS = function() {
        return navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
    };
    A.isAndroid = function() {
        return -1 < navigator.userAgent.indexOf("Android")
    };
    A.hasDownloadSupport = function() {
        return "download" in document.createElement("a")
    };
    A.qualifyURL = function(h) {
        var p = document.createElement("a");
        p.href = h;
        return p.href
    };
    A.relativePath = function(h) {
        return /^(?:[a-z]+:)?\/\//i.test(h)
    };
    A.closestNumber = function(h, p) {
        return h.reduce(function(l, C) {
            return Math.abs(C - p) < Math.abs(l - p) ? C : l
        })
    };
    A.b64DecodeUnicode = function(h) {
        return decodeURIComponent(atob(h).split("").map(function(p) {
            return "%" + ("00" + p.charCodeAt(0).toString(16)).slice(-2)
        }).join(""))
    };
    A.hasLocalStorage = function() {
        try {
            return "localStorage" in f && null !== f.localStorage
        } catch (h) {
            return !1
        }
    };
    A.volumeCanBeSet = function() {
        var h = document.createElement("audio");
        if (!h) return !1;
        h.volume = 0;
        return 0 == h.volume ? !0 : !1
    };
    A.arrayContainsAnotherArray = function(h, p) {
        var l, C = h.length;
        for (l = 0; l < C; l++)
            if (-1 < p.indexOf(h[l])) return !0;
        return !1
    };
    A.randomiseArray = function(h) {
        var p = [],
            l = [],
            C;
        for (C = 0; C < h; C++) p[C] = C;
        for (C = 0; C < h; C++) {
            var y = Math.round(Math.random() * (p.length - 1));
            l[C] = p[y];
            p.splice(y, 1)
        }
        return l
    };
    A.valueLimit = function(h, p, l) {
        return h < p ? p : h > l ? l : h
    };
    A.sortArray = function(h, p) {
        var l, C = h.length,
            y = [];
        for (l = 0; l < C; l++) y[l] = h[p[l]];
        return y
    };
    A.sortNumericArray = function(h) {
        h.sort(function(p, l) {
            return p - l
        })
    };
    A.shuffleArray = function(h) {
        for (var p = h.length - 1; 0 < p; p--) {
            var l = Math.floor(Math.random() * (p + 1)),
                C = $jscomp.makeIterator([h[l], h[p]]);
            h[p] = C.next().value;
            h[l] = C.next().value
        }
        return h
    };
    A.keysrt = function(h, p, l) {
        var C = 1;
        l && (C = -1);
        return h.sort(function(y, M) {
            var D = y[p],
                G = M[p];
            return C * (D < G ? -1 : D > G ? 1 : 0)
        })
    };
    A.keysrt2 = function(h, p, l, C) {
        var y = 1;
        C && (y = -1);
        return h.sort(function(M, D) {
            var G = M[p][l],
                z = D[p][l];
            return y * (G < z ? -1 : G > z ? 1 : 0)
        })
    };
    A.keysrt3 = function(h, p, l) {
        h.sort(function(C, y) {
            var M = y[l];
            return p.indexOf(C[l]) > p.indexOf(M) ? 1 : -1
        });
        return h
    };
    A.parseXML = function(h) {
        if (f.ActiveXObject && f.GetObject) {
            var p = new ActiveXObject("Microsoft.XMLDOM");
            p.loadXML(h);
            return p
        }
        if (f.DOMParser) return (new DOMParser).parseFromString(h, "text/xml");
        throw Error("No XML parser available")
    };
    A.formatTime = function(h) {
        h = Math.round(h, 10);
        var p = Math.floor(h / 3600),
            l = Math.floor((h - 3600 * p) / 60);
        h = h - 3600 * p - 60 * l;
        if (0 < p) return 10 > p && (p = "0" + p), 10 > l && (l = "0" + l), 10 > h && (h = "0" + h), p + ":" + l + ":" + h;
        10 > l && (l = "0" + l);
        10 > h && (h = "0" + h);
        return l + ":" + h
    };
    A.formatTimeWithMiliseconds = function(h) {
        var p = parseInt(h.split(":")[0]),
            l = parseInt(h.split(":")[1]),
            C = parseInt(h.split(":")[2]);
        h = parseInt(h.split(",")[1] || h.split(".")[1]);
        return Math.round(100 * (3600 * p + 60 * l + C + h / 1E3)) / 100
    };
    A.toSeconds = function(h) {
        h = h.split(/[\.:,]+/);
        return Number(3600 * +h[0] + 60 * +h[1] + +h[2])
    };
    A.formatNumber = function(h) {
        return 9 > h ? "0" + (h + 1) : h + 1
    };
    A.nFormatter = function(h, p) {
        var l = [{
                value: 1E18,
                symbol: "E"
            }, {
                value: 1E15,
                symbol: "P"
            }, {
                value: 1E12,
                symbol: "T"
            }, {
                value: 1E9,
                symbol: "G"
            }, {
                value: 1E6,
                symbol: "M"
            }, {
                value: 1E3,
                symbol: "k"
            }],
            C = /\.0+$|(\.[0-9]*[1-9])0+$/,
            y;
        for (y = 0; y < l.length; y++)
            if (h >= l[y].value) return (h / l[y].value).toFixed(p).replace(C, "$1") + l[y].symbol;
        return h.toFixed(p).replace(C, "$1")
    };
    A.hmsToSecondsOnly = function(h) {
        h = h.split(":");
        for (var p = 0, l = 1; 0 < h.length;) p += l * parseInt(h.pop()), l *= 60;
        return p
    };
    A.canPlayMp3 = function() {
        var h = document.createElement("audio");
        return !(!h.canPlayType || !h.canPlayType("audio/mpeg;").replace(/no/, ""))
    };
    A.canPlayWav = function() {
        var h = document.createElement("audio");
        return !(!h.canPlayType || !h.canPlayType("audio/wav;").replace(/no/, ""))
    };
    A.canPlayAac = function() {
        var h = document.createElement("audio");
        return !(!h.canPlayType || !h.canPlayType("audio/aac;").replace(/no/, ""))
    };
    A.canPlayOgg = function() {
        var h = document.createElement("audio");
        return !(!h.canPlayType || !h.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ""))
    };
    A.canPlayFlac = function() {
        var h = document.createElement("audio");
        return !(!h.canPlayType || !h.canPlayType("audio/flac;").replace(/no/, ""))
    };
    A.hasCanvas = function() {
        return !!document.createElement("canvas")
    };
    A.getElementOffsetTop = function(h) {
        h = h.getBoundingClientRect();
        var p = document.body,
            l = document.documentElement;
        return Math.round(h.bottom - 100 + (f.pageYOffset || l.scrollTop || p.scrollTop) - (l.clientTop || p.clientTop || 0))
    };
    A.getScrollTop = function(h) {
        h = document.documentElement;
        return (f.pageYOffset || h.scrollTop) - (h.clientTop || 0)
    };
    A.getEvents = function() {
        var h = {};
        "ontouchstart" in f ? (h.downEvent = "touchstart mousedown", h.moveEvent = "touchmove mousemove", h.upEvent = "touchend mouseup") : f.PointerEvent ? (h.downEvent = "pointerdown", h.moveEvent = "pointermove", h.upEvent = "pointerup") : (h.downEvent = "mousedown", h.moveEvent = "mousemove", h.upEvent = "mouseup");
        return h
    };
    A.getUrlParameter = function(h) {
        var p = {};
        f.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(l, C, y) {
            p[C] = y
        });
        return h ? p[h] : p
    };
    A.drawBars = function(h, p, l, C, y, M) {
        var D = 1 / l.barHeight;
        if (l.normalize) {
            D = util.max(C);
            var G = util.min(C);
            D = -G > D ? -G : D
        }
        var z = [].some.call(C, function(B) {
            return 0 > B
        });
        G = l.height * l.pixelRatio / 2;
        z = z ? 2 : 1;
        var n = l.barWidth * l.pixelRatio,
            v = n + (null === l.barGap ? Math.max(l.pixelRatio, ~~(n / 2)) : Math.max(l.pixelRatio, l.barGap * l.pixelRatio)),
            E = C.length / z / l.width,
            m = y;
        for (m; m < M; m += v) {
            var u = C[Math.floor(m * E * z)] || 0;
            u = Math.round(u / D * G);
            0 == u && l.barMinHeight && (u = l.barMinHeight);
            h.fillRect(m + l.halfPixel, G - u, n + l.halfPixel, 2 * u, l.barRadius)
        }
        m = y;
        for (m; m < M; m += v) u = C[Math.floor(m * E * z)] || 0, u = Math.round(u / D * G), 0 == u && l.barMinHeight && (u = l.barMinHeight), p.fillRect(m + l.halfPixel, G - u, n + l.halfPixel, 2 * u, l.barRadius)
    };
    A.drawWave = function(h, p, l, C, y, M) {
        var D = 1 / l.barHeight;
        if (l.normalize) {
            D = util.max(C);
            var G = util.min(C);
            D = -G > D ? -G : D
        }
        var z = [].some.call(C, function(E) {
            return 0 > E
        });
        G = l.height * l.pixelRatio / 2;
        if (!z) {
            z = [];
            var n = C.length,
                v = 0;
            for (v; v < n; v++) z[2 * v] = C[v], z[2 * v + 1] = -C[v];
            C = z
        }
        void 0 !== y && (b(h, l, C, D, G, 0, y, M), b(p, l, C, D, G, 0, y, M));
        h.fillRect(0, G + 0 - l.halfPixel, l.width, l.halfPixel, l.barRadius);
        p.fillRect(0, G + 0 - l.halfPixel, l.width, l.halfPixel, l.barRadius)
    };
    f.HAPUtils = A
})(window);
(function(f, b) {
    f.HAPPlaylistManager = function(A) {
        function h() {
            v = HAPUtils.randomiseArray(y);
            console.log(v)
        }
        var p = this,
            l = A.loop,
            C = A.random,
            y, M = !1,
            D = -1,
            G, z, n = !1,
            v = [],
            E = !1;
        this.setCounter = function(m, u) {
            "undefined" === typeof u && (u = !0);
            D = u ? D + parseInt(m, 10) : parseInt(m, 10);
            if (isNaN(D)) alert("HAPPlaylistManager message: No active media, counter = " + D);
            else if (M = !1, "playlist" == l || "single" == l) {
                if (C)
                    if (D > y - 1) {
                        D = v[y - 1];
                        h();
                        if (v[0] == D) {
                            var B = v.splice(0, 1);
                            v.push(B)
                        }
                        D = 0
                    } else 0 > D && (D = v[0], h(), v[y - 1] == D && (B = v.splice(y - 1, 1), v.unshift(B)), D = y - 1);
                else D > y - 1 ? D = 0 : 0 > D && (D = y - 1);
                b(p).trigger("HAPPlaylistManager.COUNTER_READY", p.getCounter())
            } else "off" == l && (D > y - 1 ? (D = y - 1, M = !0) : 0 > D && (D = 0, M = !0), M ? b(p).trigger("HAPPlaylistManager.PLAYLIST_END") : b(p).trigger("HAPPlaylistManager.COUNTER_READY", p.getCounter()))
        };
        this.getCounter = function() {
            return C ? E ? D : v[D] : D
        };
        this.advanceHandler = function(m) {
            E = !1;
            n ? (n = !1, z + m > y - 1 ? (D = y - 1, b(p).trigger("HAPPlaylistManager.COUNTER_READY", p.getCounter())) : 0 > z + m ? (D = 0, b(p).trigger("HAPPlaylistManager.COUNTER_READY", p.getCounter())) : p.setCounter(z + m, !1)) : p.setCounter(m)
        };
        this.processPlaylistRequest = function(m) {
            E = !1;
            C && (E = !0, G = m, n || (z = D, n = !0));
            p.setCounter(m, !1)
        };
        this.setPlaylistItems = function(m, u) {
            "undefined" === typeof u && (u = !0);
            u && (D = -1);
            y = m;
            C && h()
        };
        this.reSetCounter = function(m) {
            "undefined" === typeof m ? D = -1 : (m = parseInt(m, 10), y ? (m > y - 1 ? m = y - 1 : 0 > m && (m = 0), D = m) : D = -1)
        };
        this.setRandom = function(m) {
            (C = m) && h();
            if (C) {
                var u = v.length;
                for (m = 0; m < u; m++)
                    if (v[m] == D) {
                        if (0 == m) break;
                        m = v.splice(m, 1);
                        v.unshift(parseInt(m, 10));
                        break
                    }
                D = 0
            } else n ? (D = G, n = !1) : D = v[D]
        };
        this.setLooping = function(m) {
            l = m
        };
        this.getPosition = function(m) {
            return v.indexOf(m)
        }
    }
})(window, jQuery);
(function(f, b) {
    f.HAPCirclePlayer = function(A) {
        function h(u) {
            C.length && (n.clearRect(0, 0, G, G), n.beginPath(), n.arc(G / 2, G / 2, m - y / 2, -E, v * u - E, !1), n.strokeStyle = z, n.lineCap = "butt", n.lineWidth = y, n.stroke())
        }
        A = A.parent;
        var p = A.find(".hap-circle-player"),
            l = A.find(".hap-load-canvas"),
            C = A.find(".hap-progress-canvas"),
            y = parseInt(p.attr("data-stroke-size"), 10);
        if (l.length) var M = l.attr("data-color"),
            D = l[0].getContext("2d"),
            G = l.width();
        if (C.length) {
            var z = C.attr("data-color"),
                n = C[0].getContext("2d");
            G = C.width()
        }
        var v = 2 * Math.PI,
            E = Math.PI / 2,
            m = G / 2;
        this.drawSeekbar = function(u, B, K) {
            l.length && l.length && (D.clearRect(0, 0, G, G), D.beginPath(), D.arc(G / 2, G / 2, m - y / 2, -E, v * u - E, !1), D.strokeStyle = M, D.lineCap = "butt", D.lineWidth = y, D.stroke());
            C.length && h(B / K)
        };
        this.clear = function() {
            C.length && n.clearRect(0, 0, G, G);
            l.length && D.clearRect(0, 0, G, G)
        };
        this.setProgress = function(u) {
            var B = u.pageX - p.offset().left - G / 2;
            u = u.pageY - p.offset().top - G / 2;
            B = Math.atan2(u, B);
            B > -1 * Math.PI && B < -.5 * Math.PI && (B = 2 * Math.PI + B);
            B = Math.max(0, Math.min((B + Math.PI / 2) / 2 * Math.PI * 10)) / 100;
            C.length && (n.clearRect(0, 0, G, G), h(B));
            return B
        };
        this.trackTooltip = function(u) {
            var B = u.pageX - p.offset().left;
            u = u.pageY - p.offset().top;
            B = Math.atan2(u - G / 2, B - G / 2);
            B > -1 * Math.PI && B < -.5 * Math.PI && (B = 2 * Math.PI + B);
            return Math.max(0, Math.min((B + Math.PI / 2) / 2 * Math.PI * 10)) / 100
        }
    }
})(window, jQuery);
(function(f, b) {
    f.HAPAdManager = function(A, h, p, l, C, y, M) {
        function D() {
            l.removeEventListener("loadedmetadata", D, !1);
            b(B).trigger("HAPAdManager.ADPRE_PLAY");
            T = l;
            T.addEventListener("timeupdate", u, !1);
            u()
        }

        function G() {
            J++;
            if (J < ea.adPre.length) {
                T.src = ea.adPre[J];
                var na = T.play();
                void 0 !== na && na.then(function() {})["catch"](function(za) {})
            } else T.removeEventListener("timeupdate", u, !1), l.removeEventListener("ended", G, !1), r = !1, J = 0, b(B).trigger("HAPAdManager.ADPRE_ENDED")
        }

        function z() {
            K && !q ? q = !0 : (R && (b(B).trigger("HAPAdManager.ADMID_PLAY"), T = k, T.addEventListener("timeupdate", u, !1)), N = !0, k.volume = ja, b(h).trigger("adMidPlay", {
                instance: h,
                instanceName: A.instanceName,
                media: ea.adMid
            }))
        }

        function n() {
            K && !X ? X = !0 : (R && (T.removeEventListener("timeupdate", u, !1), b(B).trigger("HAPAdManager.ADMID_ENDED")), N = !1, b(h).trigger("adMidEnded", {
                instance: h,
                instanceName: A.instanceName,
                media: ea.adMid
            }), v())
        }

        function v() {
            x && clearTimeout(x);
            x = setTimeout(function() {
                x = null;
                h.getMediaPlaying() && (J++, J > ea.adMid.length - 1 && (J = 0), k.src = ea.adMid[J], k.play())
            }, parseInt(ea.adMidInterval || 1E4, 10) + A.dataInterval)
        }

        function E() {
            l.removeEventListener("loadedmetadata", E, !1);
            b(B).trigger("HAPAdManager.ADEND_PLAY");
            T = l;
            T.addEventListener("timeupdate", u, !1)
        }

        function m() {
            J++;
            if (J < ea.adEnd.length) {
                T.src = ea.adEnd[J];
                var na = T.play();
                void 0 !== na && na.then(function() {})["catch"](function(za) {})
            } else T.removeEventListener("timeupdate", u, !1), T.removeEventListener("ended", m, !1), ca = !1, b(B).trigger("HAPAdManager.ADEND_ENDED")
        }

        function u() {
            if (r || ca) var na = l.currentTime,
                za = l.duration;
            else N && (na = k.currentTime, za = k.duration);
            HAPUtils.isNumber(na) && HAPUtils.isNumber(za) && (y.width(na / za * Aa), na = parseInt(za - na, 10), M.find("span").html(HAPUtils.formatTime(na)))
        }
        var B = this,
            K = navigator.userAgent.match(/(iPad|iPhone|iPod)/g),
            R = A.pauseAudioDuringAds,
            T, r, k, x, N, q, X, ca, J = 0,
            ea = p,
            ja = A.volume,
            Aa;
        this.initAdPre = function() {
            r = !0;
            l.addEventListener("loadedmetadata", D, !1);
            l.addEventListener("ended", G, !1);
            l.src = ea.adPre[J]
        };
        this.forceAdMidAudio = function() {
            b(B).trigger("HAPAdManager.IOS_ADMID_FIX_START", !0);
            k || (k = document.createElement("audio"), k.addEventListener("play", z, !1), k.addEventListener("ended", n, !1));
            k.src = A.sourcePath + "data/silence.mp3";
            k.play()
        };
        this.adMidStartHandler = function() {
            k || (k = document.createElement("audio"), k.addEventListener("play", z, !1), k.addEventListener("ended", n, !1));
            K ? X && v() : v()
        };
        this.adMidPlayHandler = function() {
            x || (K ? X && v() : v())
        };
        this.clearAdMidTimeout = function() {
            x && (clearTimeout(x), x = null)
        };
        this.toggleAdMidAudio = function() {
            if (k && R)
                if (k.paused) {
                    var na = k.play();
                    void 0 !== na && na.then(function() {})["catch"](function(za) {})
                } else k.pause()
        };
        this.setAdEnd = function() {
            ca = !0;
            J = 0;
            l.addEventListener("loadedmetadata", E, !1);
            l.addEventListener("ended", m, !1);
            l.src = ea.adEnd[J];
            var na = l.play();
            void 0 !== na && na.then(function() {})["catch"](function(za) {})
        };
        this.isAdOn = function() {
            return r || N || ca
        };
        this.isAdPreOn = function() {
            return r
        };
        this.isAdMidOn = function() {
            return N
        };
        this.isAdEndOn = function() {
            return ca
        };
        this.setAdData = function(na) {
            ea = na;
            J = 0
        };
        this.setSeekBarSize = function(na) {
            Aa = na
        };
        this.setVolume = function(na) {
            ja = na;
            k && (k.volume = ja)
        };
        this.cleanAds = function() {
            T && T.removeEventListener("timeupdate", u, !1);
            r && (l.removeEventListener("loadedmetadata", D, !1), l.removeEventListener("ended", G, !1), r = !1);
            x && (clearTimeout(x), x = null);
            N && (k && (k.pause(), k.src = ""), N = !1);
            ca && (l.removeEventListener("loadedmetadata", E, !1), l.removeEventListener("ended", m, !1), ca = !1)
        }
    }
})(window, jQuery);
(function(f, b) {
    f.HAPRadioData = function(A, h) {
        function p() {
            var q = z.path;
            ";" == q.substring(q.length - 1) && (q = q.substring(0, q.length - 1));
            "/" == q.substring(q.length - 1) && (q = q.substring(0, q.length - 1));
            if (A.enableCors) {
                f.radioDataXHR && f.radioDataXHR.abort();
                var X = new XMLHttpRequest;
                X.onerror = function(J) {};
                X.onreadystatechange = function() {
                    if (4 === this.readyState) {
                        if (200 === this.status) {
                            if (z.version && 1 == z.version) var J = X.responseText.split(","),
                                ea = J[6];
                            else J = JSON.parse(X.responseText), ea = J.songtitle;
                            n = J;
                            var ja = ea.split("-");
                            J = b.trim(ja[0]);
                            ja = b.trim(ja[1]);
                            v = {
                                artist: J,
                                title: ja,
                                thumb: null
                            };
                            E ? E != ea && (A.getRadioArtwork ? y(J, ja) : u || b(G).trigger("HAPRadioData.DATA_READY", v)) : A.getRadioArtwork ? y(J, ja) : u || b(G).trigger("HAPRadioData.DATA_READY", v)
                        }
                        E = ea
                    } else m || (r && clearInterval(r), r = setInterval(function() {
                        p()
                    }, k))
                };
                if (z.version && 1 == z.version) X.open("GET", R[T] + q + "/7.html", !0);
                else {
                    var ca = A.sid || "1";
                    X.open("GET", R[T] + q + "/stats?sid=" + ca + "&json=1", !0)
                }
                X.send();
                f.radioDataXHR = X
            } else ca = z.sid || "1", b.ajax({
                dataType: "jsonp",
                url: q + "/stats?sid=" + ca + "&json=1",
                success: function(J) {
                    console.log(J);
                    var ea = J.songtitle;
                    n = J;
                    var ja = J.songtitle.split("-");
                    J = b.trim(ja[0]);
                    ja = b.trim(ja[1]);
                    v = {
                        artist: J,
                        title: ja,
                        thumb: null
                    };
                    E ? E != ea ? A.getRadioArtwork ? y(J, ja) : u || b(G).trigger("HAPRadioData.DATA_READY", v) : console.log("data hasnt changed") : A.getRadioArtwork ? y(J, ja) : u || b(G).trigger("HAPRadioData.DATA_READY", v);
                    E = ea
                },
                error: function() {
                    console.log("Error getShoutcastData")
                }
            })
        }

        function l() {
            var q = z.path;
            ";" == q.substring(q.length - 1) && (q = q.substring(0, q.length - 1));
            "/" == q.substring(q.length - 1) && (q = q.substring(0, q.length - 1));
            f.radioXHR && f.radioXHR.abort();
            var X = new XMLHttpRequest;
            X.onerror = function(ca) {};
            X.onreadystatechange = function() {
                if (4 === this.readyState)
                    if (200 === this.status) {
                        if (-1 < this.responseText.indexOf('{"icestats":')) {
                            var ca = JSON.parse(this.responseText);
                            if (void 0 === ca.icestats.source.length) var J = ca.icestats.source;
                            else {
                                var ea, ja = ca.icestats.source.length;
                                for (ea = 0; ea < ja; ea++)
                                    if (0 <= ca.icestats.source[ea].listenurl.indexOf(z.mountpoint)) {
                                        J = ca.icestats.source[ea];
                                        break
                                    }
                            }
                            n = J;
                            if (J.yp_currently_playing) var Aa = J.yp_currently_playing;
                            else ca = J.artist, J = J.title, ca && J ? Aa = ca + "-" + J : J && (Aa = J)
                        } else -1 < this.responseText.indexOf('class="streamdata"') ? -1 < this.responseText.indexOf("Mount Point /" + z.mountpoint) && (J = this.responseText.substr(this.responseText.indexOf("Mount Point /" + z.mountpoint)), J = J.substr(J.indexOf("Current Song:")), J = J.substr(J.indexOf('<td class="streamdata">') + 23), J = J.substr(0, J.indexOf("</td>")), HAPUtils.isEmpty(J) || (Aa = J)) : -1 < this.responseText.indexOf('class="streamstats"') && -1 < this.responseText.indexOf("Mount Point /" + z.mountpoint) && (J = this.responseText.substr(this.responseText.indexOf("Mount Point /" + z.mountpoint)), J = J.substr(J.indexOf("Currently playing:")), J = J.substr(J.indexOf('<td class="streamstats">') + 24), J = J.substr(0, J.indexOf("</td>")), HAPUtils.isEmpty(J) || (Aa = J));
                        Aa ? (J = Aa.split("-"), ca = b.trim(J[0]), J = b.trim(J[1]), v = {
                            artist: ca,
                            title: J,
                            thumb: null
                        }, E ? E != Aa && (A.getRadioArtwork ? y(ca, J) : u || b(G).trigger("HAPRadioData.DATA_READY", v)) : A.getRadioArtwork ? y(ca, J) : u || b(G).trigger("HAPRadioData.DATA_READY", v), E = Aa) : (v = {
                            artist: x,
                            title: N,
                            thumb: null
                        }, u || b(G).trigger("HAPRadioData.DATA_READY", v))
                    } else 404 == this.status && "Not Found" == this.statusText ? (console.log(B[K] + " does not exist!"), K++, B[K] ? m || (r && clearInterval(r), l()) : (v = {
                        artist: x,
                        title: N,
                        thumb: null
                    }, u || b(G).trigger("HAPRadioData.DATA_READY", v))) : m || (r && clearInterval(r), r = setInterval(function() {
                        l()
                    }, k))
            };
            A.enableCors ? X.open("GET", R[T] + q + B[K], !0) : X.open("GET", q + B[K], !0);
            X.send();
            f.radioXHR = X
        }

        function C() {
            f.radioDataXHR && f.radioDataXHR.abort();
            var q = new XMLHttpRequest;
            q.onerror = function(ca) {};
            q.onreadystatechange = function() {
                if (4 === this.readyState)
                    if (200 === this.status) {
                        var ca = JSON.parse(q.responseText),
                            J = ca.artist,
                            ea = ca.title,
                            ja = J + " - " + ea,
                            Aa = ca.thumb || null;
                        n = ca;
                        v = {
                            artist: J,
                            title: ea,
                            thumb: Aa
                        };
                        E ? E != ja && (A.getRadioArtwork && null == Aa ? y(J, ea) : u || b(G).trigger("HAPRadioData.DATA_READY", v)) : A.getRadioArtwork && null == Aa ? y(J, ea) : u || b(G).trigger("HAPRadioData.DATA_READY", v);
                        E = ja
                    } else m || (r && clearInterval(r), r = setInterval(function() {
                        C()
                    }, k))
            };
            var X = "http://www.radiojar.com/api/stations/" + z.mountpoint + "/now_playing/";
            A.enableCors ? q.open("GET", R[T] + X, !0) : q.open("GET", X, !0);
            q.send();
            f.radioDataXHR = q
        }

        function y(q, X) {
            if (!u) {
                q = M(q);
                X = D(X);
                var ca = R[T] + "https://itunes.apple.com/search?type=jsonp&term==" + encodeURI(q) + "-" + encodeURI(X) + "&media=music&limit=1",
                    J = new XMLHttpRequest;
                J.onerror = function(ea) {};
                J.onreadystatechange = function() {
                    if (4 === this.readyState)
                        if (200 === this.status) {
                            var ea = JSON.parse(this.responseText);
                            if (ea.resultCount) {
                                var ja = h.width();
                                ja = HAPUtils.closestNumber(A.artworkSize, ja);
                                ea = ea.results[0].artworkUrl100.replace("100x100", ja + "x" + ja)
                            } else ea = z.thumbDefault;
                            v.thumb = ea;
                            u || b(G).trigger("HAPRadioData.DATA_READY", v);
                            r && clearInterval(r);
                            r = setInterval(function() {
                                G.getData()
                            }, k);
                            m = !0
                        } else 403 === this.status && (T++, T > R.length - 1 && (T = 0), y(q, X))
                };
                J.open("GET", ca, !0);
                J.send();
                f.artworkDataXHR = J
            }
        }

        function M(q) {
            q = q.toLowerCase();
            q = b.trim(q);
            q.includes("&") ? q = q.substr(0, q.indexOf(" &")) : q.includes("feat") ? q = q.substr(0, q.indexOf(" feat")) : q.includes("ft.") && (q = q.substr(0, q.indexOf(" ft.")));
            return q
        }

        function D(q) {
            q = q.toLowerCase();
            q = b.trim(q);
            q.includes("&") ? q = q.replace("&", "and") : q.includes("(") ? q = q.substr(0, q.indexOf(" (")) : q.includes("ft") && (q = q.substr(0, q.indexOf(" ft")));
            return q
        }
        var G = this;
        HAPUtils.isMobile();
        var z, n, v, E, m, u, B = ["/status-json.xsl", "/status.xsl"],
            K = 0,
            R = A.cors.split(",").map(function(q) {
                return q.trim()
            }),
            T = 0,
            r, k = A.lastPlayedInterval,
            x = A.defaultSongArtist,
            N = A.defaultSongTitle;
        0 == h.length && (A.getRadioArtwork = !1);
        this.getData = function(q) {
            q && (z = q);
            u = !1;
            "shoutcast" == z.type ? p() : "icecast" == z.type ? l() : "radiojar" == z.type ? C() : console.log("HAPRadioData unknown radio data!")
        };
        this.destroy = function() {
            u = !0;
            r && clearInterval(r);
            r = null;
            f.radioDataXHR && (f.radioDataXHR.abort(), delete f.radioDataXHR);
            f.artworkDataXHR && (f.artworkDataXHR.abort(), delete f.artworkDataXHR);
            T = 0;
            m = !1;
            E = null
        };
        this.getRadioData = function() {
            return n
        }
    }
})(window, jQuery);
(function(f, b) {
    f.HAPYoutubeLoader = function(A) {
        function h(E) {
            b.ajax({
                url: E,
                dataType: "jsonp"
            }).done(function(m) {
                if (m.error && m.error.message) console.log(m.error.message);
                else {
                    var u, B = m.items.length;
                    (z = m.nextPageToken) && (z = G + "&pageToken=" + z);
                    for (u = 0; u < B && M.length != n; u++) {
                        var K = m.items[u];
                        if ("youtube_playlist" == C || "youtube_single" == C || "youtube_single_list" == C) K.status ? "public" == K.status.privacyStatus && M.push(p(K, C)) : K.snippet && "Private video" != K.snippet.title && M.push(p(K, C))
                    }
                    if ("youtube_single" == C || "youtube_single_list" == C) b(l).trigger("HAPYoutubeLoader.END_LOAD", {
                        data: M,
                        nextPageToken: z
                    });
                    else if (M.length < n)
                        if (z) {
                            M.length + D > n && (D = n - M.length, m = z.substr(0, G.indexOf("&maxResults=") + 12), u = z.substr(G.indexOf("&key=")), z = m + D.toString() + u);
                            if ("youtube_playlist" == C) var R = z;
                            h(R)
                        } else b(l).trigger("HAPYoutubeLoader.END_LOAD", {
                            data: M,
                            nextPageToken: z
                        });
                    else b(l).trigger("HAPYoutubeLoader.END_LOAD", {
                        data: M,
                        nextPageToken: z
                    })
                }
            }).fail(function(m, u, B) {
                console.log(m, u, B)
            })
        }

        function p(E, m) {
            var u = jQuery.extend(!0, {}, y);
            u.type = "youtube";
            "youtube_single" == m || "youtube_single_list" == m ? u.mp3 = E.id : "youtube_playlist" == m && (u.mp3 = E.contentDetails.videoId);
            E.snippet && (!u.title && E.snippet.title && (u.title = E.snippet.title), !u.description && E.snippet.description && (u.description = E.snippet.description), E.snippet.publishedAt && (u.date = E.snippet.publishedAt), !E.thumb && E.snippet.thumbnails && (E.snippet.thumbnails.medium ? u.thumb = E.snippet.thumbnails.medium.url : E.snippet.thumbnails.high ? u.thumb = E.snippet.thumbnails.high.url : E.snippet.thumbnails["default"] && (u.thumb = E.snippet.thumbnails["default"].url)));
            if (E.contentDetails && E.contentDetails.duration) {
                var B = E.contentDetails.duration,
                    K = B.match(/\d+/g);
                0 <= B.indexOf("M") && -1 == B.indexOf("H") && -1 == B.indexOf("S") && (K = [0, K[0], 0]);
                0 <= B.indexOf("H") && -1 == B.indexOf("M") && (K = [K[0], 0, K[1]]);
                0 <= B.indexOf("H") && -1 == B.indexOf("M") && -1 == B.indexOf("S") && (K = [K[0], 0, 0]);
                B = 0;
                3 == K.length && (B += 3600 * parseInt(K[0]), B += 60 * parseInt(K[1]), B += parseInt(K[2]));
                2 == K.length && (B += 60 * parseInt(K[0]), B += parseInt(K[1]));
                1 == K.length && (B += parseInt(K[0]));
                u.duration = B
            }
            return u
        }
        var l = this,
            C, y, M = [],
            D = 50,
            G, z, n, v = A.youtubeAppId;
        this.resumeLoad = function(E) {
            M = [];
            E ? (G = E.substr(0, E.lastIndexOf("&pageToken=")), h(E)) : b(l).trigger("HAPYoutubeLoader.END_LOAD", {
                data: M,
                nextPageToken: E
            })
        };
        this.setData = function(E) {
            if (v) {
                M = [];
                y = E;
                n = y.limit || 400;
                D = 50;
                n < D && (D = n);
                C = y.type;
                z = null;
                var m = ""; - 1 < A.playlistItemContent.indexOf("title") && (m += "title,"); - 1 < A.playlistItemContent.indexOf("description") && (m += "description,"); - 1 < A.playlistItemContent.indexOf("date") && (m += "publishedAt,"); - 1 < A.playlistItemContent.indexOf("thumb") && (m += "thumbnails,");
                0 < m.length ? (m = m.substr(0, m.length - 1), E = ",snippet", m = ",snippet(" + m + ")") : m = E = "";
                if ("youtube_single" == C || "youtube_single_list" == C) {
                    "youtube_single_list" == C && (y.path = y.path.replace(/\s+/g, ""));
                    if (-1 < A.playlistItemContent.indexOf("duration")) var u = ",contentDetails",
                        B = ",contentDetails(duration)";
                    else B = u = "";
                    G = "https://www.googleapis.com/youtube/v3/videos?id=" + y.path + "&key=" + v + "&part=id" + E + u + "&fields=items(id" + m + B + ")"
                } else "youtube_playlist" == C && (G = "https://www.googleapis.com/youtube/v3/playlistItems?playlistId=" + y.path + "&maxResults=" + D + "&key=" + v + "&part=contentDetails" + E + "&fields=items(contentDetails(videoId)" + m + "),nextPageToken");
                h(G)
            } else alert("Youtube API key missing! Set API key in settings.")
        };
        this.getNextPageToken = function() {
            return z
        }
    }
})(window, jQuery);
(function(f, b) {
    f.HAPPlaybackRateSlider = function(A) {
        function h(k) {
            if (!G) {
                if ("touchstart" == k.type) {
                    if (k = k.originalEvent.touches, !(k && 0 < k.length)) return !1
                } else k.preventDefault();
                G = !0;
                y.on(K.moveEvent, function(x) {
                    a: {
                        if ("touchmove" == x.type) {
                            if (x.originalEvent.touches && x.originalEvent.touches.length) var N = x.originalEvent.touches;
                            else if (x.originalEvent.changedTouches && x.originalEvent.changedTouches.length) N = x.originalEvent.changedTouches;
                            else break a;
                            if (1 < N.length) break a;
                            N = N[0]
                        } else N = x;
                        x.preventDefault();
                        p(N);
                        l(N)
                    }
                }).on(K.upEvent, function(x) {
                    a: if (G) {
                        G = !1;
                        y.off(K.moveEvent).off(K.upEvent);
                        if ("touchend" == x.type) {
                            if (x.originalEvent.touches && x.originalEvent.touches.length) var N = x.originalEvent.touches;
                            else if (x.originalEvent.changedTouches && x.originalEvent.changedTouches.length) N = x.originalEvent.changedTouches;
                            else break a;
                            if (1 < N.length) break a;
                            N = N[0]
                        } else N = x;
                        x.preventDefault();
                        p(N)
                    }
                })
            }
            return !1
        }

        function p(k) {
            z ? (k = Math.max(0, Math.min(1, (k.pageY - E.offset().top) / B)), k = 1 - k) : k = Math.max(0, Math.min(1, (k.pageX - E.offset().left) / B));
            C.setValue(k)
        }

        function l(k) {
            var x = z ? k.pageY - E.offset().top : k.pageX - E.offset().left;
            0 > x ? x = 0 : x > B && (x = B);
            x = Math.max(0, Math.min(1, x / B));
            if (!HAPUtils.isNumber(x)) return !1;
            z && (x = 1 - x);
            x = R + (T - R) * x;
            x = Math.round(10 * x) / 10;
            v.text(x);
            x = D[0].getBoundingClientRect();
            var N = u[0].getBoundingClientRect();
            if (z) {
                var q = parseInt(N.left - x.left - v.outerWidth() / 2 + u.outerWidth() / 2);
                k = parseInt(k.pageY - M.scrollTop() - x.top - v.outerHeight() - 10);
                k < N.top - x.top - v.outerHeight() - 10 ? k = N.top - x.top - v.outerHeight() - 10 : k > N.top - x.top + u.outerHeight() - v.outerHeight() && (k = N.top - x.top + u.outerHeight() - v.outerHeight())
            } else q = parseInt(k.pageX - M.scrollLeft() - x.left - v.outerWidth() / 2), k = parseInt(N.top - x.top - v.outerHeight()), q < N.left - x.left ? q = N.left - x.left : q > N.left - x.left + u.outerWidth() - v.outerWidth() && (q = N.left - x.left + u.outerWidth() - v.outerWidth());
            v.css({
                left: q + "px",
                top: k + "px"
            }).show()
        }
        var C = this,
            y = b(document),
            M = b(f),
            D = A.wrapper,
            G, z = A.isVertical,
            n = z ? "height" : "width",
            v = A.tooltip,
            E = A.sliderBg,
            m = A.sliderLevel,
            u = A.seekbar,
            B = z ? E.height() : E.width(),
            K = HAPUtils.getEvents(),
            R = Number(A.settings.playbackRateMin),
            T = Number(A.settings.playbackRateMax);
        u.on(K.downEvent, function(k) {
            h(k);
            return !1
        });
        this.setValue = function(k) {
            HAPUtils.isNumber(B) || (B = z ? E.height() : E.width());
            m.css(n, k * B + "px");
            k = R + (T - R) * k;
            k = Math.round(10 * k) / 10;
            b(C).trigger("HAPPlaybackRateSlider.RANGE_CHANGE", {
                value: k
            })
        };
        this.setVisual = function(k) {
            k = (k - R) / (T - R);
            HAPUtils.isNumber(B) || (B = z ? E.height() : E.width());
            m.css(n, k * B + "px")
        };
        if (!HAPUtils.isMobile()) {
            var r = function() {
                u.off(K.moveEvent, l).off("mouseout", r);
                y.off("mouseout", r);
                v.hide()
            };
            u.on("mouseover", function() {
                G || (u.on(K.moveEvent, l).on("mouseout", r), y.on("mouseout", r))
            })
        }
        this.setVisual(A.settings.playbackRate)
    }
})(window, jQuery);
(function(f, b) {
    f.HAPRangeSlider = function(A) {
        function h(z) {
            if (!C) {
                if ("touchstart" == z.type) {
                    if (z = z.originalEvent.touches, !(z && 0 < z.length)) return !1
                } else z.preventDefault();
                C = !0;
                l.on(y.moveEvent, function(n) {
                    a: {
                        if ("touchmove" == n.type) {
                            if (n.originalEvent.touches && n.originalEvent.touches.length) var v = n.originalEvent.touches;
                            else if (n.originalEvent.changedTouches && n.originalEvent.changedTouches.length) v = n.originalEvent.changedTouches;
                            else break a;
                            if (1 < v.length) break a;
                            v = v[0]
                        } else v = n;
                        n.preventDefault();
                        b(p).trigger("HAPRangeSlider.RANGE_CHANGE", {
                            point: v,
                            elem: G,
                            event: v
                        })
                    }
                }).on(y.upEvent, function(n) {
                    a: if (C) {
                        C = !1;
                        l.off(y.moveEvent).off(y.upEvent);
                        if ("touchend" == n.type) {
                            if (n.originalEvent.touches && n.originalEvent.touches.length) var v = n.originalEvent.touches;
                            else if (n.originalEvent.changedTouches && n.originalEvent.changedTouches.length) v = n.originalEvent.changedTouches;
                            else break a;
                            if (1 < v.length) break a;
                            v = v[0]
                        } else v = n;
                        n.preventDefault();
                        b(p).trigger("HAPRangeSlider.RANGE_CHANGE", {
                            point: v,
                            elem: G
                        })
                    }
                })
            }
            return !1
        }
        var p = this,
            l = b(document);
        b(f);
        var C, y = HAPUtils.getEvents(),
            M = A.range_handle_a,
            D = A.range_handle_b,
            G;
        M.on(y.downEvent, function(z) {
            G = b(this).css("z-index", 1);
            D.css("z-index", 0);
            h(z);
            return !1
        });
        D.on(y.downEvent, function(z) {
            G = b(this).css("z-index", 1);
            M.css("z-index", 0);
            h(z);
            return !1
        });
        this.isDrag = function() {
            return C
        }
    }
})(window, jQuery);
(function(f, b) {
    f.HAPLyrics = function(A) {
        function h() {
            var n, v = l.length;
            for (n = 0; n < v; n++) {
                var E = l[n].start;
                var m = n < v - 1 ? l[n + 1].start : l[n].start;
                var u = document.createElement("div");
                u.className = A.itemClass;
                A.scrollContainer.appendChild(u);
                C.push(u);
                u.dataset.start = E;
                u.dataset.end = m;
                u.innerHTML = l[n].text;
                p.useSeekOnLyrics && u.addEventListener("click", function() {
                    var B = Number(this.getAttribute("data-start"));
                    B = new CustomEvent("HAPLyrics.LYRICS_CLICKED", {
                        detail: B
                    });
                    document.dispatchEvent(B)
                })
            }
            n = new CustomEvent("HAPLyrics.LYRICS_READY", {
                detail: l
            });
            document.dispatchEvent(n)
        }
        var p = A.settings,
            l = [],
            C = [],
            y = !0,
            M, D = p.lyricsAutoScroll,
            G = b(A.scrollContainer),
            z = b(A.wrapContainer);
        this.load = function(n) {
            y = !0;
            if ("file:" == f.location.protocol) return console.log("Getting lyrics requires server connection."), !1;
            M && (M.abort(), M = null);
            M = new XMLHttpRequest;
            M.onreadystatechange = function() {
                if (4 == M.readyState && y) {
                    var v = -1 < n.indexOf(".lrc") ? "lrc" : -1 < n.indexOf(".vtt") ? "vtt" : -1 < n.indexOf(".srt") ? "srt" : "lrc";
                    l = [];
                    var E = M.responseText;
                    if ("lrc" == v) {
                        E = E.split("\n");
                        var m, u = E.length;
                        for (m = 0; m < u; m++) {
                            E[m] = E[m].replace(/(^\s*)|(\s*$)/g, "");
                            var B = E[m].substring(E[m].indexOf("[") + 1, E[m].indexOf("]"));
                            B = B.split(":");
                            if (!isNaN(parseInt(B[0]))) {
                                var K = E[m].match(/\[(\d+:.+?)\]/g);
                                v = 0;
                                var R, T = K.length;
                                for (R = 0; R < T; R++) v += K[R].length;
                                v = E[m].substring(v);
                                if (!HAPUtils.isEmpty(v))
                                    for (R = 0; R < T; R++) B = K[R].substring(1, K[R].length - 1), B = B.split(":"), l.push({
                                        start: (60 * parseFloat(B[0]) + parseFloat(B[1])).toFixed(3),
                                        text: v
                                    })
                            }
                        }
                    } else if ("vtt" == v || "srt" == v)
                        for (B in v = E.replace(/\r\n|\r|\n/g, "\n"), v = HAPUtils.strip(v), E = v.split("\n\n"), u = 0, E)
                            if (m = E[B].split("\n"), "WEBVTT" != m && 2 <= m.length && "WEBVTT" != m[0]) {
                                if (2 < m.length) {
                                    if (v = HAPUtils.strip(m[1].split(" --\x3e ")[0]), R = HAPUtils.strip(m[1].split(" --\x3e ")[1]), T = m[2], 3 < m.length)
                                        for (K = 3; K < m.length; K++) T += "\n" + m[K]
                                } else v = HAPUtils.strip(m[0].split(" --\x3e ")[0]), R = HAPUtils.strip(m[0].split(" --\x3e ")[1]), T = m[1];
                                l[u] = {};
                                l[u].start = HAPUtils.formatTimeWithMiliseconds(v);
                                l[u].end = HAPUtils.formatTimeWithMiliseconds(R);
                                l[u].text = T;
                                u++
                            }
                    h()
                }
            };
            M.onerror = function(v) {
                console.log(v)
            };
            M.open("GET", n);
            M.send()
        };
        this.setAutoScroll = function(n) {
            D = n
        };
        this.setData = function(n) {
            l = n;
            h()
        };
        this.synchronize = function(n) {
            G.find(".hap-lyrics-item").each(function() {
                var E = parseFloat(b(this).attr("data-start")),
                    m = parseFloat(b(this).attr("data-end"));
                if (n >= E && n <= m) return b(this).hasClass("hap-lyrics-item-active") || (G.find(".hap-lyrics-item").removeClass("hap-lyrics-item-active"), b(this).addClass("hap-lyrics-item-active"), G.movingHighlight = !0), !1
            });
            G.currentHighlight = G.find(".hap-lyrics-item-active");
            0 == G.currentHighlight.length && (G.currentHighlight = null);
            if (D && G.currentHighlight) {
                var v = Math.floor(z.scrollTop() + G.currentHighlight.position().top - (z.height() / 2 + G.currentHighlight.height() / 2));
                v != Math.floor(z.scrollTop()) && G.movingHighlight && (z.scrollTop(v), G.movingHighlight = !1)
            }
        };
        this.deactivate = function() {
            M && (M.abort(), M = null);
            y = !1;
            A.scrollContainer.innerHTML = ""
        }
    }
})(window, jQuery);
(function(f, b) {
    f.HAPDialog = function(A, h, p) {
        function l(r, k, x, N) {
            if ("lyrics" == r) var q = M("lyrics"),
                X = "hap_lyrics_dialog_" + p.instanceName;
            else "video" == r && (q = M("video"), X = "hap_video_dialog_" + p.instanceName);
            var ca = f.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                J = f.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            k > ca && (k = ca);
            x > J && (x = J);
            q.css({
                width: k + "px",
                height: x + "px"
            });
            x -= 75;
            q.find(".hap-dialog-content").css("height", x + "px");
            "lyrics" == r ? q.find(".hap-lyrics-wrap").css("height", x + "px") : "video" == r && q.find(".hap-video-wrap").css({
                height: x + "px",
                width: k + "px"
            });
            localStorage && N && (r = localStorage.getItem(X) ? JSON.parse(localStorage.getItem(X)) : {}, q = q[0].getBoundingClientRect(), r.pos = q, localStorage.setItem(X, JSON.stringify(r)))
        }

        function C(r) {
            var k, x = z.length;
            for (k = 0; k < x; k++)
                if (r == z[k].itemHandle) {
                    n = z[k];
                    var N = !0;
                    break
                }
            return N
        }

        function y(r) {
            var k, x = z.length;
            for (k = 0; k < x; k++)
                if (r == z[k].itemResizeHandle) {
                    m = z[k];
                    var N = !0;
                    break
                }
            return N
        }

        function M(r) {
            var k, x = z.length;
            for (k = 0; k < x; k++)
                if (r == z[k].element) {
                    var N = b(z[k].itemDialog);
                    break
                }
            return N
        }

        function D(r) {
            if (C(r.target)) {
                if ("touchstart" == r.type)
                    if ((r = r.originalEvent.touches) && 0 < r.length) n.initialX = r[0].pageX - n.xOffset, n.initialY = r[0].pageY - n.yOffset;
                    else return !1;
                else r.preventDefault(), n.initialX = r.pageX - n.xOffset, n.initialY = r.pageY - n.yOffset;
                E.on(v.moveEvent, function(k) {
                    a: if (n) {
                        if ("touchmove" == k.type) {
                            if (k.originalEvent.touches && k.originalEvent.touches.length) var x = k.originalEvent.touches;
                            else if (k.originalEvent.changedTouches && k.originalEvent.changedTouches.length) x = k.originalEvent.changedTouches;
                            else break a;
                            if (1 < x.length) break a;
                            k.preventDefault();
                            n.currentX = x[0].pageX - n.initialX;
                            n.currentY = x[0].pageY - n.initialY
                        } else k.preventDefault(), n.currentX = k.pageX - n.initialX, n.currentY = k.pageY - n.initialY;
                        n.xOffset = n.currentX;
                        n.yOffset = n.currentY;
                        n.itemDialog.style.left = n.currentX + "px";
                        n.itemDialog.style.top = n.currentY + "px"
                    }
                }).on(v.upEvent, function(k) {
                    n && (E.off(v.moveEvent).off(v.upEvent), n.initialX = n.currentX, n.initialY = n.currentY, n.itemDialog.classList.contains("hap-lyrics-holder") ? localStorage && (k = localStorage.getItem("hap_lyrics_dialog_" + p.instanceName) ? JSON.parse(localStorage.getItem("hap_lyrics_dialog_" + p.instanceName)) : {}, k.currentX = n.currentX, k.currentY = n.currentY, localStorage.setItem("hap_lyrics_dialog_" + p.instanceName, JSON.stringify(k))) : n.itemDialog.classList.contains("hap-video-holder") && localStorage && (k = localStorage.getItem("hap_video_dialog_" + p.instanceName) ? JSON.parse(localStorage.getItem("hap_video_dialog_" + p.instanceName)) : {}, k.currentX = n.currentX, k.currentY = n.currentY, localStorage.setItem("hap_video_dialog_" + p.instanceName, JSON.stringify(k))), n = null)
                })
            }
            return !1
        }

        function G(r) {
            if (y(r.target)) {
                if ("touchstart" == r.type)
                    if ((r = r.originalEvent.touches) && 0 < r.length) var k = r[0];
                    else return !1;
                else k = r, r.preventDefault();
                m.startMouseX = k.pageX;
                m.startMouseY = k.pageY;
                m.dragStartWidth = m.itemDialog.offsetWidth;
                m.dragStartHeight = m.itemDialog.offsetHeight;
                E.on(v.moveEvent, function(x) {
                    a: {
                        if ("touchmove" == x.type) {
                            if (x.originalEvent.touches && x.originalEvent.touches.length) var N = x.originalEvent.touches;
                            else if (x.originalEvent.changedTouches && x.originalEvent.changedTouches.length) N = x.originalEvent.changedTouches;
                            else break a;
                            if (1 < N.length) break a;
                            N = N[0]
                        } else N = x;
                        x.preventDefault();
                        x = parseInt(m.dragStartWidth + (N.pageX - m.startMouseX), 10);
                        N = parseInt(m.dragStartHeight + (N.pageY - m.startMouseY), 10);
                        x < m.itemResizeMinW && (x = m.itemResizeMinW);
                        N < m.itemResizeMinH && (N = m.itemResizeMinH);
                        l(m.element, x, N, !0)
                    }
                }).on(v.upEvent, function(x) {
                    m && (m = null, E.off(v.moveEvent).off(v.upEvent))
                })
            }
            return !1
        }
        var z = h,
            n, v = HAPUtils.getEvents(),
            E = b(document),
            m;
        this.setTranslateInit = function(r, k, x) {
            var N, q = z.length;
            for (N = 0; N < q; N++)
                if (z[N].itemDialog.classList.contains("hap-dialog") && z[N].itemDialog.classList.contains(r)) {
                    var X = z[N];
                    break
                }
            X && (r = A[0].getBoundingClientRect(), 0 >= r.top + x && (x = -r.top), 0 >= r.left + k && (k = -r.left), X.itemDialog.style.left = k + "px", X.itemDialog.style.top = x + "px", X.initialX = k, X.initialY = x, X.currentX = k, X.currentY = x, X.xOffset = k, X.yOffset = x, X.dragInited = !0)
        };
        (p.clearDialogCacheOnStart || p.isPopup) && localStorage && (localStorage.removeItem("hap_lyrics_dialog_" + p.instanceName), localStorage.removeItem("hap_video_dialog_" + p.instanceName));
        var u = z.length;
        for (h = 0; h < u; h++) {
            var B = z[h];
            B.xOffset = 0;
            B.yOffset = 0;
            b(B.itemHandle).css("cursor", "move").on(v.downEvent, function(r) {
                D(r);
                return !1
            });
            if (B.itemResizeHandle) b(B.itemResizeHandle).on(v.downEvent, function(r) {
                G(r);
                return !1
            });
            if ("lyrics" == B.element)
                if (b(B.itemDialog).find(".hap-lyrics-autoscroll").on("change", function() {
                        var r = b(this).is(":checked"),
                            k = new CustomEvent("HAPDialog.LYRICS_AUTOSCROLL_CHANGE", {
                                detail: r
                            });
                        document.dispatchEvent(k);
                        localStorage && (k = localStorage.getItem("hap_lyrics_dialog_" + p.instanceName) ? JSON.parse(localStorage.getItem("hap_lyrics_dialog_" + p.instanceName)) : {}, k.autoScroll = r, localStorage.setItem("hap_lyrics_dialog_" + p.instanceName, JSON.stringify(k)))
                    }), localStorage && localStorage.getItem("hap_lyrics_dialog_" + p.instanceName)) {
                    var K = JSON.parse(localStorage.getItem("hap_lyrics_dialog_" + p.instanceName));
                    if (K.pos) {
                        var R = K.pos.width,
                            T = K.pos.height;
                        l("lyrics", R, T)
                    } else f.getComputedStyle(document.querySelector(".hap-lyrics-holder")).getPropertyValue("width");
                    K.currentX && K.currentY && this.setTranslateInit("hap-lyrics-holder", K.currentX, K.currentY);
                    R = K.autoScroll ? "checked" : "";
                    b(B.itemDialog).find(".hap-lyrics-autoscroll").prop("checked", R);
                    B = new CustomEvent("HAPDialog.LYRICS_AUTOSCROLL_CHANGE", {
                        detail: K.autoScroll
                    });
                    document.dispatchEvent(B)
                } else p.lyricsAutoScroll && (b(B.itemDialog).find(".hap-lyrics-autoscroll").prop("checked", "checked"), B = new CustomEvent("HAPDialog.LYRICS_AUTOSCROLL_CHANGE", {
                    detail: p.lyricsAutoScroll
                }), document.dispatchEvent(B)), this.setTranslateInit("hap-lyrics-holder", 0, 0);
            else "video" == B.element && (localStorage && localStorage.getItem("hap_video_dialog_" + p.instanceName) ? (K = JSON.parse(localStorage.getItem("hap_video_dialog_" + p.instanceName)), K.pos && (R = K.pos.width, T = K.pos.height, l("video", R, T)), K.currentX && K.currentY && this.setTranslateInit("hap-video-holder", K.currentX, K.currentY)) : this.setTranslateInit("hap-video-holder", 0, 0))
        }
    }
})(window, jQuery);
(function(f, b) {
    f.HAPVolumeSlider = function(A) {
        function h(r) {
            if (!B) {
                if ("touchstart" == r.type) {
                    if (r = r.originalEvent.touches, !(r && 0 < r.length)) return !1
                } else r.preventDefault();
                B = !0;
                E.on(m.moveEvent, function(k) {
                    a: {
                        if ("touchmove" == k.type) {
                            if (k.originalEvent.touches && k.originalEvent.touches.length) var x = k.originalEvent.touches;
                            else if (k.originalEvent.changedTouches && k.originalEvent.changedTouches.length) x = k.originalEvent.changedTouches;
                            else break a;
                            if (1 < x.length) break a;
                            x = x[0]
                        } else x = k;
                        k.preventDefault();
                        p(x)
                    }
                }).on(m.upEvent, function(k) {
                    a: if (B) {
                        B = !1;
                        E.off(m.moveEvent).off(m.upEvent);
                        if ("touchend" == k.type) {
                            if (k.originalEvent.touches && k.originalEvent.touches.length) var x = k.originalEvent.touches;
                            else if (k.originalEvent.changedTouches && k.originalEvent.changedTouches.length) x = k.originalEvent.changedTouches;
                            else break a;
                            if (1 < x.length) break a;
                            x = x[0]
                        } else x = k;
                        k.preventDefault();
                        p(x)
                    }
                })
            }
            return !1
        }

        function p(r) {
            K ? (u = Math.max(0, Math.min(1, (r.pageY - n.offset().top) / R)), u = 1 - u) : u = Math.max(0, Math.min(1, (r.pageX - n.offset().left) / R));
            C.setValue(u)
        }

        function l(r) {
            var k = K ? r.pageY - n.offset().top : r.pageX - n.offset().left;
            0 > k ? k = 0 : k > R && (k = R);
            k = Math.max(0, Math.min(1, k / R));
            if (!HAPUtils.isNumber(k)) return !1;
            K && (k = 1 - k);
            k = parseInt(100 * k, 10);
            D.text(k + " %");
            k = A.container[0].getBoundingClientRect();
            var x = z[0].getBoundingClientRect();
            if (K) {
                var N = parseInt(x.left - k.left - D.outerWidth() / 2 + z.outerWidth() / 2);
                r = parseInt(r.pageY - M.scrollTop() - k.top - D.outerHeight() - 20);
                r < x.top - k.top - D.outerHeight() - 10 ? r = x.top - k.top - D.outerHeight() - 10 : r > x.top - k.top + z.outerHeight() - D.outerHeight() && (r = x.top - k.top + z.outerHeight() - D.outerHeight())
            } else N = parseInt(r.pageX - M.scrollLeft() - k.left - D.outerWidth() / 2), r = parseInt(x.top - k.top - D.outerHeight()) - 15, N < x.left - k.left ? N = x.left - k.left : N > x.left - k.left + z.outerWidth() - D.outerWidth() && (N = x.left - k.left + z.outerWidth() - D.outerWidth());
            0 > r + k.top && (r = parseInt(x.top - k.top + D.outerHeight() + 20));
            D.css({
                left: N + "px",
                top: r + "px"
            }).show()
        }
        var C = this,
            y = HAPUtils.isMobile(),
            M = b(f),
            D = A.tooltip,
            G = A.container.find(".hap-volume-toggle"),
            z = A.container.find(".hap-volume-seekbar"),
            n = A.container.find(".hap-volume-bg"),
            v = A.container.find(".hap-volume-level"),
            E = b(document),
            m = HAPUtils.getEvents(),
            u = A.volume,
            B, K = z.hasClass("hap-volume-vertical"),
            R = K ? n.height() : n.width();
        if (0 == z.length || G.hasClass("hap-volume-toggable") && !y) G.on("click", function() {
            b(C).trigger("HAPVolumeSlider.TOGGLE_MUTE")
        });
        z.on(m.downEvent, function(r) {
            h(r);
            return !1
        });
        this.setValue = function(r) {
            C.setVisual(r);
            b(C).trigger("HAPVolumeSlider.VOLUME_CHANGE", r)
        };
        this.setVisual = function(r) {
            u = r;
            r = K ? "height" : "width";
            HAPUtils.isNumber(R) || (R = K ? n.height() : n.width());
            v.css(r, u * R + "px");
            G.children().hide();
            0 == u ? G.find(".hap-btn-volume-off").show() : 0 < u && .5 > u ? G.find(".hap-btn-volume-down").show() : G.find(".hap-btn-volume-up").show()
        };
        if (D && !y) {
            var T = function() {
                z.off(m.moveEvent, l).off("mouseout", T);
                E.off("mouseout", T);
                D.hide()
            };
            z.on("mouseover", function() {
                B || (z.on(m.moveEvent, l).on("mouseout", T), E.on("mouseout", T))
            })
        }
        C.setVisual(u)
    }
})(window, jQuery);
var hapjq = jQuery;
(function(f) {
    f.fn.hap = function(b) {
        function A() {
            Object.keys(Cc).forEach(function(O) {
                if (0 == O.indexOf("hap-")) {
                    var V = O.substr(4).replace(/-([a-z])/g, function(sa) {
                        return sa[1].toUpperCase()
                    });
                    if (O = decodeURIComponent(Cc[O]).replace(/\+/g, " ")) b.hasOwnProperty(V) ? ("true" === O ? O = !0 : "false" === O && (O = !1), b[V] = O) : (O = O.split(",").map(function(sa) {
                        return sa.trim()
                    }), -1 < df.indexOf(V) && Dc.push({
                        key: V,
                        value: O
                    }))
                }
            });
            if (Dc.length) {
                var a, c, d = Dc.length,
                    e = Dc[0].value.length;
                for (c = 0; c < e; c++) {
                    var g = {};
                    for (a = 0; a < d; a++) {
                        var t = Dc[a];
                        var F = t.value[c];
                        "true" === F ? F = !0 : "false" === F && (F = !1);
                        g[t.key] = F;
                        "type" === t.key && (g.origtype = F)
                    }
                    Kd.push(g)
                }
            }
        }

        function h() {
            ka = I.mp3 || I.path; - 1 != ka.indexOf("ebsfm:") && (ka = HAPUtils.b64DecodeUnicode(ka.substr(6)));
            if (we) Ra && (c = 0, b.resumeTime ? c = resumeTime : I.start && (c = I.start), Ca ? ba.loadVideoById({
                videoId: ka,
                startSeconds: c,
                endSeconds: I.end,
                suggestedQuality: I.quality
            }) : ba.cueVideoById({
                videoId: ka,
                startSeconds: c,
                endSeconds: I.end,
                suggestedQuality: I.quality
            }));
            else {
                if (0 == Qa.length) {
                    alert("Using Youtube requires player to have thumbnail image in player where Youtube player will be placed. Please use demo which has thumbnail in player! hap-player-thumb element");
                    return
                }
                Xb = f('<div class="hap-youtube-holder"/>').appendTo(Qa);
                var a = "ytplayer" + Math.floor(16777215 * Math.random()),
                    c = "https:" == window.location.protocol ? "https:" : "http:",
                    d = window.location.href.split("/");
                d = d[0] + "//" + d[2];
                var e = "&origin=" + d;
                c = c + "//www.youtube.com/embed/" + ka + "?enablejsapi=1&controls=0&rel=0&showinfo=0&playsinline=1&modestbranding=1&wmode=transparent&iv_load_policy=3&cc_load_policy=0";
                /^http/.test(d) && (c += e);
                b.resumeTime ? (c += "&start=" + b.resumeTime, delete b.resumeTime) : I.start && (c += "&start=" + I.start);
                I.end && (c += "&end=" + I.end);
                Ld = f("<iframe/>", {
                    id: a,
                    frameborder: 0,
                    src: c,
                    width: "100%",
                    height: "100%",
                    webkitAllowFullScreen: !1,
                    mozallowfullscreen: !1,
                    allowFullScreen: !1,
                    allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                }).addClass("hap-media");
                Xb.show().prepend(Ld);
                window.YT || (c = document.createElement("script"), c.src = "https://www.youtube.com/iframe_api", d = document.getElementsByTagName("script")[0], d.parentNode.insertBefore(c, d));
                var g = setInterval(function() {
                    window.YT && window.YT.Player && (g && clearInterval(g), ba = new YT.Player(a, {
                        events: {
                            onReady: p,
                            onStateChange: l,
                            onError: C
                        }
                    }))
                }, 100);
                we = !0
            }
            Xb.show()
        }

        function p(a) {
            Ra = !0;
            b.forceYoutubeChromeless && Ld.addClass("hap-yt-clean");
            xe && Ca && ba.playVideo()
        }

        function l(a) {
            Xb.is(":visible") && -1 != a.data && (0 == a.data ? xb && Fa && !Za && !Yc.isDrag() ? (Za = !0, ba.seekTo(Sa), ba.playVideo()) : Zc || (Zc = !0, Md()) : 1 == a.data ? (Nd || (Zc = !1, ba.setPlaybackRate(Number(b.playbackRate)), ye || (ye = f('<div class="hap-iframe-blocker"></div>').css("display", "block").appendTo(Xb)), xe = Ca = Nd = !0, b.hideYoutubeAfterStart && Xb.css("opacity", 0), xb && (gc.html("00:00"), hc.html(HAPUtils.formatTime(ba.getDuration())))), xb && Fa && setTimeout(function() {
                clearTimeout(this);
                Za = !1
            }, 1E3), Fb && clearInterval(Fb), Fb = setInterval(Ec, ze), $c()) : 2 == a.data && Ae())
        }

        function C(a) {
            f(w).trigger("soundError", {
                instance: w,
                instanceName: b.instanceName,
                media: I,
                error: a
            })
        }

        function y() {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: I.title,
                artist: I.artist || "",
                album: I.album || "",
                artwork: [{
                    src: I.thumb || ""
                }]
            })
        }

        function M(a) {
            var c = H[0].getBoundingClientRect(),
                d = a[0].getBoundingClientRect();
            ma.text(a.attr("data-tooltip"));
            var e = parseInt(d.top - c.top - ma.outerHeight());
            a = parseInt(d.left - c.left - ma.outerWidth() / 2 + a.outerWidth() / 2);
            a + ma.outerWidth() > H.width() ? a = H.width() - ma.outerWidth() : 0 > a && (a = 0);
            0 > e + c.top && (e = parseInt(d.top - c.top + ma.outerHeight() + 15));
            ma.css({
                left: a + "px",
                top: e + "px"
            }).show()
        }

        function D(a) {
            if (Z) {
                if (!yb) {
                    if ("touchstart" == a.type) {
                        if (a = a.originalEvent.touches, !(a && 0 < a.length)) return !1
                    } else a.preventDefault();
                    yb = !0;
                    Gb.on(Yb.moveEvent, function(c) {
                        a: {
                            if ("touchmove" == c.type) {
                                if (c.originalEvent.touches && c.originalEvent.touches.length) var d = c.originalEvent.touches;
                                else if (c.originalEvent.changedTouches && c.originalEvent.changedTouches.length) d = c.originalEvent.changedTouches;
                                else break a;
                                if (1 < d.length) break a;
                                d = d[0]
                            } else d = c;
                            c.preventDefault();
                            G(d)
                        }
                    }).on(Yb.upEvent, function(c) {
                        a: if (yb) {
                            yb = !1;
                            Gb.off(Yb.moveEvent).off(Yb.upEvent);
                            if ("touchend" == c.type) {
                                if (c.originalEvent.touches && c.originalEvent.touches.length) var d = c.originalEvent.touches;
                                else if (c.originalEvent.changedTouches && c.originalEvent.changedTouches.length) d = c.originalEvent.changedTouches;
                                else break a;
                                if (1 < d.length) break a;
                                d = d[0]
                            } else d = c;
                            c.preventDefault();
                            G(d, !0)
                        }
                    })
                }
                return !1
            }
        }

        function G(a, c, d) {
            Fc ? a = ad.setProgress(a) : d || (a = b.useWaveSeekbar ? a.pageX - ic.offset().left : a.pageX - Gc.offset().left, 0 > a ? a = 0 : a > Ka && (a = Ka), a = Math.max(0, Math.min(1, a / Ka)));
            if (c) {
                if ("youtube" == Q) ba && Ra && ba.seekTo(a * ba.getDuration());
                else if (P && !isNaN(P.duration)) {
                    d = P.duration;
                    c = a * d;
                    c > d - 2 && (c = d - 2);
                    try {
                        P.currentTime = c
                    } catch (e) {
                        console.log(e)
                    }
                }
                Hb || $a.width(a * Ka)
            } else $a.width(a * Ka), Od || b.useFixedPlayer && window.hap_fixed_active_player == b.instanceName && Hb && Ga.setProgressData(a, !0)
        }

        function z() {
            var a = Ha.width(),
                c = Ha.height();
            Pd.width = a;
            Qd.width = a;
            Pd.height = c;
            Qd.height = c;
            fb.width = a;
            fb.height = c;
            Zb.fillStyle = b.waveBgColor;
            $b.fillStyle = b.waveProgressColor;
            Ib = I.peaks;
            b.waveBarWidth ? HAPUtils.drawBars(Zb, $b, fb, Ib.split(","), 0, a) : HAPUtils.drawWave(Zb, $b, fb, Ib.split(","), 0, a)
        }

        function n(a) {
            if (Fc) {
                var c = ad.trackTooltip(a),
                    d = H[0].getBoundingClientRect(),
                    e = Ha[0].getBoundingClientRect();
                a = parseInt(e.top - d.top - ma.outerHeight() - 20);
                var g = parseInt(e.left - d.left - ma.outerWidth() / 2 + Ha.outerWidth() / 2);
                g + ma.outerWidth() > H.width() ? g = H.width() - ma.outerWidth() : 0 > g && (g = 0);
                0 > a + d.top && (a = parseInt(e.top - d.top + ma.outerHeight() + 20))
            } else {
                c = b.useWaveSeekbar ? a.pageX - ic.offset().left : a.pageX - Gc.offset().left;
                if (!HAPUtils.isNumber(c)) return !1;
                0 > c ? c = 0 : c > Ka && (c = Ka);
                c = Math.max(0, Math.min(1, c / Ka));
                d = H[0].getBoundingClientRect();
                e = Ha[0].getBoundingClientRect();
                g = parseInt(a.pageX - Be.scrollLeft() - d.left - ma.outerWidth() / 2);
                a = parseInt(e.top - d.top - ma.outerHeight(), 10) - 10;
                g < e.left - d.left ? g = e.left - d.left : g > e.left - d.left + Ha.outerWidth() - ma.outerWidth() && (g = e.left - d.left + Ha.outerWidth() - ma.outerWidth());
                0 > a + d.top && (a = parseInt(e.top - d.top + ma.outerHeight() + 15))
            }
            ma.css({
                left: g + "px",
                top: a + "px"
            });
            if (!HAPUtils.isNumber(c)) return !1;
            if ("youtube" == Q) {
                if (ba && Ra) {
                    var t = ba.getDuration();
                    a = c * t
                }
            } else P && (t = P.duration, a = c * t);
            HAPUtils.isNumber(t) && HAPUtils.isNumber(t) && ma.html(HAPUtils.formatTime(a) + " / " + HAPUtils.formatTime(t)).show()
        }

        function v(a) {
            a = Math.max(0, Math.min(1, a / Va));
            var c = "youtube" == Q ? ba.getDuration() : P.duration;
            return a * c
        }

        function E(a) {
            if (!Z) return !1;
            var c = a.keyCode;
            if (f(a.target).hasClass("hap-search-filter")) return !0;
            if (b.modifierKey) {
                var d, e = b.keyboardControls.length;
                for (d = 0; d < e; d++) {
                    var g = b.keyboardControls[d];
                    if (a[b.modifierKey] && c == g.keycode) {
                        "seekBackward" == g.action ? w.seekBackward(b.seekTime) : "seekForward" == g.action ? w.seekForward(b.seekTime) : "togglePlayback" == g.action ? w.togglePlayback() : "volumeUp" == g.action ? (b.volume += .1, 1 < b.volume && (b.volume = 1), w.setVolume(b.volume)) : "volumeDown" == g.action ? (b.volume -= .1, 0 > b.volume && (b.volume = 0), w.setVolume(b.volume)) : "toggleMute" == g.action ? w.toggleMute() : "nextMedia" == g.action ? w.nextMedia() : "previousMedia" == g.action ? w.previousMedia() : "rewind" == g.action && w.seek(0);
                        break
                    }
                }
            } else
                for (e = b.keyboardControls.length, d = 0; d < e; d++)
                    if (g = b.keyboardControls[d], c == g.keycode) {
                        if ("seekBackward" == g.action) w.seekBackward(b.seekTime);
                        else if ("seekForward" == g.action) w.seekForward(b.seekTime);
                        else if ("togglePlayback" == g.action) w.togglePlayback();
                        else if ("volumeUp" == g.action) b.volume += .1, 1 < b.volume && (b.volume = 1), w.setVolume(b.volume);
                        else if ("volumeDown" == g.action) b.volume -= .1, 0 > b.volume && (b.volume = 0), w.setVolume(b.volume);
                        else if ("toggleMute" == g.action) w.toggleMute();
                        else if ("nextMedia" == g.action) w.nextMedia();
                        else if ("previousMedia" == g.action) w.previousMedia();
                        else if ("rewind" == g.action) w.seek(0);
                        else return !0;
                        break
                    } return !1
        }

        function m(a) {
            if (!Z || b.disableSongSkip || da && da.isAdOn()) return !1;
            a = f(a.currentTarget);
            if (b.togglePlaybackOnPlaylistItem && a.closest(".hap-playlist-item").hasClass("hap-playlist-item-disabled") && Hb) return w.togglePlayback(), !1;
            Ca = Rd = !0;
            jc();
            Hc && I.adMid && !Ic && da.forceAdMidAudio();
            if (ac) {
                var c = a.closest(".hap-accordion-item").attr("data-id");
                if (c != Jc) {
                    Jc = c;
                    la = Kc[Jc].data;
                    Y = la.length;
                    for (c = 0; c < Y; c++) la[c].id = c;
                    ha.setPlaylistItems(Y)
                }
            }
            a = a.closest(".hap-playlist-item").attr("data-id");
            ha.processPlaylistRequest(a); - 1 < xa.indexOf("hap-art-narrow-light") && w.togglePlaylist();
            f(w).trigger("clickPlaylistItem", {
                instance: w,
                instanceName: b.instanceName
            })
        }

        function u(a) {
            a.preventDefault();
            if (!Z) return !1;
            f(a.currentTarget).closest(".hap-playlist-item").addClass("hap-playlist-item-selected");
            f(w).trigger("overPlaylistItem", {
                instance: w,
                instanceName: b.instanceName
            })
        }

        function B(a) {
            a.preventDefault();
            if (!Z) return !1;
            a = f(a.currentTarget).closest(".hap-playlist-item");
            a.hasClass("hap-playlist-item-disabled") || a.removeClass("hap-playlist-item-selected");
            f(w).trigger("outPlaylistItem", {
                instance: w,
                instanceName: b.instanceName
            })
        }

        function K(a) {
            if (!Z) return !1;
            a = f(a.currentTarget);
            if (a.hasClass("hap-playlist-toggle") || a.hasClass("hap-playlist-close")) w.togglePlaylist();
            else if (a.hasClass("hap-skip-backward")) w.seekBackward(b.seekTime);
            else if (a.hasClass("hap-skip-forward")) w.seekForward(b.seekTime);
            else if (a.hasClass("hap-prev-toggle")) {
                Hc && I.adMid && !Ic && da.forceAdMidAudio();
                if (da && da.isAdOn()) return !1;
                w.previousMedia()
            } else if (a.hasClass("hap-playback-toggle")) Hc && I.adMid && !Ic && da.forceAdMidAudio(), w.togglePlayback();
            else if (a.hasClass("hap-next-toggle")) {
                Hc && I.adMid && !Ic && da.forceAdMidAudio();
                if (da && da.isAdOn()) return !1;
                w.nextMedia()
            } else if (a.hasClass("hap-playback-rate-toggle") || a.hasClass("hap-playback-rate-close")) a.hasClass("hap-playback-rate-toggle") && (Fa && w.toggleRange(), Lc.is(":visible") && Lc.hide()), Mc.toggle();
            else if (a.hasClass("hap-lyrics-toggle") || a.hasClass("hap-lyrics-close")) w.toggleLyrics();
            else if (a.hasClass("hap-video-toggle") || a.hasClass("hap-video-close")) w.toggleVideo();
            else if (a.hasClass("hap-range-toggle") || a.hasClass("hap-range-close")) a.hasClass("hap-range-toggle") && (Lc.is(":visible") && Lc.hide(), Mc.is(":visible") && Mc.hide()), w.toggleRange();
            else if (a.hasClass("hap-loop-toggle")) bc.find(".hap-btn").hide(), cc++, cc > Nc.length - 1 && (cc = 0), b.loopState = Nc[cc], bc.find(".hap-btn-loop-" + b.loopState).show(), ha.setLooping(b.loopState), M(bc.find(".hap-btn:visible"));
            else if (a.hasClass("hap-random-toggle")) b.randomPlay = !b.randomPlay, ha.setRandom(b.randomPlay), lb.find(".hap-btn").hide(), b.randomPlay ? lb.find(".hap-btn-random-on").show() : lb.find(".hap-btn-random-off").show(), M(lb.find(".hap-btn:visible"));
            else if (a.hasClass("hap-sort-alpha")) HAPUtils.isEmpty(ab) ? ab = "title-asc" : "title-asc" == ab ? ab = "title-desc" : "title-desc" == ab && (ab = "title-asc"), w.sort(ab), M(zb.find(".hap-btn:visible"));
            else if (a.hasClass("hap-popup-toggle")) {
                if (b.isPopup) return !1;
                hapOpenPopup(b, w)
            } else if (a.hasClass("hap-share-toggle") || a.hasClass("hap-share-close")) a.hasClass("hap-share-toggle") && (Fa && w.toggleRange(), Mc.is(":visible") && Mc.hide()), Lc.toggle();
            else if (a.hasClass("hap-share-item")) {
                if (!Q) return !1;
                Sd && Sd.share(a.attr("data-type").toLowerCase(), I, w.getCurrentMediaUrl())
            }
        }

        function R() {
            wa && (f(w).trigger("playlistItemEnabled", {
                instance: w,
                instanceName: b.instanceName,
                item: wa
            }), b.togglePlaybackOnPlaylistItem && wa.find(".hap-playlist-thumb-style").removeClass("hap-playlist-thumb-style-pause"), wa.removeClass("hap-playlist-item-selected hap-playlist-item-disabled"), wa = null)
        }

        function T(a) {
            wa && R();
            wa = S.children(".hap-playlist-item").eq(a);
            if (wa.length) {
                wa.addClass("hap-playlist-item-selected hap-playlist-item-disabled");
                if (b.usePlaylistScroll && 0 < Y) {
                    if (!Rd)
                        if ("mcustomscrollbar" == b.playlistScrollType)
                            if ("undefined" !== typeof mCustomScrollbar) setTimeout(function() {
                                "horizontal" == b.playlistScrollOrientation ? Wa.mCustomScrollbar("scrollTo", parseInt(wa.position().left), {
                                    scrollInertia: 500
                                }) : Wa.mCustomScrollbar("scrollTo", parseInt(wa.position().top), {
                                    scrollInertia: 500
                                })
                            }, 1E3);
                            else var c = setInterval(function() {
                                "undefined" !== typeof mCustomScrollbar && (clearInterval(c), "horizontal" == b.playlistScrollOrientation ? Wa.mCustomScrollbar("scrollTo", parseInt(wa.position().left), {
                                    scrollInertia: 500
                                }) : Wa.mCustomScrollbar("scrollTo", parseInt(wa.position().top), {
                                    scrollInertia: 500
                                }))
                            }, 100);
                    else "perfect-scrollbar" == b.playlistScrollType && setTimeout(function() {
                        "horizontal" == b.playlistScrollOrientation ? Wa.stop().animate({
                            scrollTop: wa[0].offsetLeft + "px"
                        }, {
                            duration: 500
                        }) : Wa.stop().animate({
                            scrollTop: wa[0].offsetTop + "px"
                        }, {
                            duration: 500
                        })
                    }, 1E3);
                    Rd = !1
                }
                f(w).trigger("playlistItemDisabled", {
                    instance: w,
                    instanceName: b.instanceName,
                    item: wa
                })
            }
        }

        function r(a) {
            ta = !0;
            La.show();
            dc && bd();
            var c = Td.length ? Td.find(a) : f(a);
            if (0 == c.length) return alert("Failed playlist selection! Playlist - " + a + " does not exist. Check activePlaylist option in settings!"), ta = !1, La.hide(), !1;
            Ma = void 0 != c.attr("data-playlist-id") ? c.attr("data-playlist-id") : null;
            b.activePlaylist = a;
            f(w).trigger("playlistStartLoad", {
                instance: w,
                instanceName: b.instanceName
            });
            c.find(".hap-playlist-options").length && (aa = c.find(".hap-playlist-options").clone().prependTo(S), void 0 != aa.attr("data-playlist-title") ? Ce.html(aa.attr("data-playlist-title")).show() : Ce.html("").hide(), aa.find(".hap-global-playlist-description").length ? De.html(aa.find(".hap-global-playlist-description").html()).show() : De.html("").hide(), Jb = parseInt(aa.attr("data-add-more-limit"), 10), kc = parseInt(aa.attr("data-add-more-num-results"), 10), Kb = parseInt(aa.attr("data-add-more-offset"), 10), cd = aa.attr("data-add-more-sort-order"), dd = aa.attr("data-add-more-sort-direction"), void 0 != aa.attr("data-taxonomy") && (ed = aa.attr("data-taxonomy")), void 0 != aa.attr("data-category") && (fd = aa.attr("data-category")), void 0 != aa.attr("data-tag") && (gd = aa.attr("data-tag")), void 0 != aa.attr("data-match") && (hd = aa.attr("data-match")), void 0 == aa.attr("data-thumb-global") || HAPUtils.isEmpty(aa.attr("data-thumb-global")) || (Oc = aa.attr("data-thumb-global")), void 0 == aa.attr("data-start") || HAPUtils.isEmpty(aa.attr("data-start")) || (lc = Number(aa.attr("data-start")), mc = null, void 0 != aa.attr("data-start-media-id") && (mc = aa.attr("data-start-media-id"))), void 0 == aa.attr("data-end") || HAPUtils.isEmpty(aa.attr("data-end")) || (id = Number(aa.attr("data-end"))), void 0 != aa.attr("data-add-more-on-total-scroll") && (mb = !0), void 0 != aa.attr("data-media-prefix-url") && (nb = aa.attr("data-media-prefix-url")), void 0 != aa.attr("data-active-media-id") && (jd = aa.attr("data-active-media-id")), kd && (void 0 != aa.attr("data-ad-pre") && (nc = aa.attr("data-ad-pre").split(",").map(function(g) {
                return g.trim()
            }), void 0 != aa.attr("data-shuffle-ads") && 1 < nc.length && HAPUtils.shuffleArray(nc)), void 0 != aa.attr("data-ad-mid") && (oc = aa.attr("data-ad-mid").split(",").map(function(g) {
                return g.trim()
            }), void 0 != aa.attr("data-shuffle-ads") && 1 < oc.length && HAPUtils.shuffleArray(oc), void 0 != aa.attr("data-ad-mid-interval") && (ld = aa.attr("data-ad-mid-interval"))), void 0 != aa.attr("data-ad-end") && (pc = aa.attr("data-ad-end").split(",").map(function(g) {
                return g.trim()
            }), void 0 != aa.attr("data-shuffle-ads") && 1 < pc.length && HAPUtils.shuffleArray(pc))));
            var d, e;
            c.children(".hap-playlist-item").each(function() {
                d = f(this);
                e = d.attr("data-type");
                RegExp(/^audio|hls$/).test(e) && d.hasClass("hap-playlist-item-ready") ? ua.push(d.clone()) : ua.push(X(d))
            });
            Y = ua.length;
            q()
        }

        function k(a) {
            console.log(a);
            f.ajax({
                type: "GET",
                url: a.path,
                dataType: "html"
            }).done(function(c) {
                var d = {};
                f(c).children(".hap-playlist-item").each(function() {
                    d = X(f(this));
                    a.origtype && (d.origtype = a.origtype);
                    void 0 != a.mediaId && (d.mediaId = a.mediaId);
                    ua.push(d)
                });
                Y = ua.length;
                q()
            }).fail(function(c, d, e) {
                console.log("Error processXml: " + c, d, e);
                q()
            })
        }

        function x(a) {
            if ("file:" == window.location.protocol) return console.log("Reading m3u files requires server connection."), !1;
            f.ajax({
                type: "GET",
                url: a.path
            }).done(function(c) {
                var d, e;
                c.replace("#EXTM3U", "").split("#EXTINF:").slice(1).map(function(g, t) {
                    d = f.extend(!0, {}, a);
                    d.type = "audio";
                    e = g.split("\n").slice(0, -1);
                    d.mp3 = f.trim(e[1]);
                    var F = e[0].split(",");
                    if (1 < F.length) {
                        var O = F[0];
                        HAPUtils.isNumber(O) && -1 != O && (d.duration = O);
                        F = F[1]
                    } else F = F[0]; - 1 < F.indexOf("-") ? (F = F.split("-"), d.title = f.trim(F[1]), F[0].match(/^\d+(\s*)+\./) ? (F = F[0].substr(F[0].indexOf(".") + 1), d.artist = f.trim(F[1])) : d.artist = f.trim(F[0])) : d.title = f.trim(F);
                    ia.push(d)
                });
                q()
            }).fail(function(c, d, e) {
                console.log("Error process m3u: " + c, d, e);
                q()
            })
        }

        function N(a) {
            f.ajax({
                type: "GET",
                url: a.path,
                dataType: "json"
            }).done(function(c) {
                Lb = -1;
                ia = [];
                ua = [];
                dc = S;
                Array.isArray(c) ? ua = c : ua.push(c);
                if (a.origtype && void 0 != a.mediaId) {
                    var d = ua.length;
                    for (c = 0; c < d; c++) ua[c].origtype = a.origtype, ua[c].mediaId = a.mediaId
                }
                Y = ua.length;
                q()
            }).fail(function(c, d, e) {
                console.log("Error processJson: " + c, d, e);
                q()
            })
        }

        function q() {
            Lb++;
            if (Lb > Y - 1) qa();
            else {
                var a = ua[Lb],
                    c = a.type;
                if (c)
                    if ("soundcloud" == c)
                        if (ya = "soundcloud", a.limit ? (Ea = a.limit, a.loadMore && (Na = !0)) : (Ea = 999999999, Na = !1), bb = [], window.SC) Xa(!0, a.path);
                        else {
                            Pc();
                            var d = setInterval(function() {
                                Ud && (d && clearInterval(d), Xa(!0, a.path))
                            }, 100)
                        } else "podcast" == c ? (ya = "podcast", md(a)) : "itunes_podcast_music" == c ? nd(a) : "folder" == c ? (ya = "folder", J(a)) : "folder_accordion" == c ? (ac = !0, ea(a)) : "json_accordion" == c ? (ac = !0, ja(a)) : "gdrive_folder" == c ? Aa(a) : "hls" == c ? (ia.push(a), q()) : "audio" == c ? (ia.push(a), q()) : "shoutcast" == c || "icecast" == c || "radiojar" == c ? (ia.push(a), q()) : "youtube_single" == c || "youtube_playlist" == c ? a.noApi ? (ia.push(a), q()) : (ya = "youtube", a.loadMore && (Na = !0), ob || ca("youtube"), ob.setData(a)) : "xml" == c ? k(a) : "json" == c ? N(a) : "m3u" == c && x(a);
                else ia.push(a), q()
            }
        }

        function X(a) {
            var c = {};
            c.type = c.origtype = a.attr("data-type");
            c.origclasses = a.attr("class");
            a.find(".hap-custom-content").length && (c.content = a.find(".hap-custom-content").html());
            void 0 != a.attr("data-noapi") && (c.noApi = !0);
            void 0 != a.attr("data-category") && (c.category = a.attr("data-category"));
            void 0 != a.attr("data-tag") && (c.tag = a.attr("data-tag"));
            void 0 != a.attr("data-video") && (c.video = a.attr("data-video"), -1 != c.video.indexOf("ebsfm:") && (c.video = HAPUtils.b64DecodeUnicode(c.video.substr(6))));
            void 0 != a.attr("data-media-id") && (c.mediaId = parseInt(a.attr("data-media-id"), 10));
            void 0 != a.attr("data-audio-preview") && (c.audioPreview = a.attr("data-audio-preview"), -1 != c.audioPreview.indexOf("ebsfm:") && (c.audioPreview = HAPUtils.b64DecodeUnicode(c.audioPreview.substr(6))));
            void 0 != a.attr("data-peaks") && (c.peaks = a.attr("data-peaks"));
            void 0 != a.attr("data-path") ? c.path = a.attr("data-path") : void 0 != a.attr("data-mp3") ? c.path = a.attr("data-mp3") : void 0 != a.attr("data-wav") ? c.path = a.attr("data-wav") : void 0 != a.attr("data-aac") ? c.path = a.attr("data-aac") : void 0 != a.attr("data-flac") && (c.path = a.attr("data-flac"));
            c.path && -1 != c.path.indexOf("ebsfm:") && (c.path = HAPUtils.b64DecodeUnicode(c.path.substr(6)));
            void 0 != a.attr("data-mountpoint") && (c.mountpoint = a.attr("data-mountpoint"));
            void 0 != a.attr("data-version") && (c.version = a.attr("data-version"));
            void 0 != a.attr("data-sid") && (c.sid = a.attr("data-sid"));
            void 0 != a.attr("data-lyrics") && (c.lyrics = a.attr("data-lyrics"), -1 != c.lyrics.indexOf("ebsfm:") && (c.lyrics = HAPUtils.b64DecodeUnicode(c.lyrics.substr(6))));
            void 0 != a.attr("data-limit") && (c.limit = Math.abs(parseInt(a.attr("data-limit"), 10)));
            Oc ? c.thumb = Oc : void 0 != a.attr("data-thumb") && (c.thumb = a.attr("data-thumb"));
            void 0 != a.attr("data-thumb-small") && (c.thumbSmall = a.attr("data-thumb-small"));
            void 0 != a.attr("data-thumb-default") && (c.thumbDefault = a.attr("data-thumb-default"));
            void 0 != a.attr("data-thumb-alt") && (c.thumbAlt = a.attr("data-thumb-alt"));
            void 0 != a.attr("data-title") && (c.title = a.attr("data-title"));
            void 0 != a.attr("data-description") ? c.description = a.attr("data-description") : a.find(".hap-playlist-description").length && (c.descriptionHtml = a.find(".hap-playlist-description").remove().wrap("<p>").parent().html());
            void 0 != a.attr("data-artist") && (c.artist = a.attr("data-artist"));
            void 0 != a.attr("data-album") && (c.album = a.attr("data-album"));
            void 0 != a.attr("data-download") && (c.download = a.attr("data-download"));
            void 0 != a.attr("data-duration") && (c.duration = a.attr("data-duration"));
            void 0 != a.attr("data-date") && (c.date = a.attr("data-date"));
            void 0 != a.attr("data-id3") && (c.id3 = !0);
            lc ? mc ? void 0 != c.mediaId && c.mediaId == mc && (c.start = lc, lc = mc = null) : c.start = lc : void 0 != a.attr("data-start") && (c.start = Math.abs(a.attr("data-start")));
            id ? c.end = id : void 0 != a.attr("data-end") && (c.end = Math.abs(a.attr("data-end")));
            void 0 != a.attr("data-link") && (c.link = a.attr("data-link"), c.target = "_blank", void 0 != a.attr("data-target") && (c.target = a.attr("data-target")), void 0 != a.attr("data-rel") && (c.rel = a.attr("data-rel")));
            void 0 != a.attr("data-playlist-icons") && (c.playlistIcons = a.data("playlist-icons"));
            void 0 != a.attr("data-sort") && (c.sort = a.attr("data-sort"));
            void 0 != a.attr("data-active-accordion") && (c.activeAccordion = a.attr("data-active-accordion"));
            a.html().length && (c.customContent = a.html());
            void 0 != a.attr("data-load-more") && (Na = !0);
            kd && (void 0 != a.attr("data-ad-pre") ? (c.adPre = a.attr("data-ad-pre").split(",").map(function(d) {
                return d.trim()
            }), void 0 != a.attr("data-shuffle-ads") && 1 < c.adPre.length && HAPUtils.shuffleArray(c.adPre)) : nc && (c.adPre = nc), void 0 != a.attr("data-ad-mid") ? (c.adMid = a.attr("data-ad-mid").split(",").map(function(d) {
                return d.trim()
            }), void 0 != a.attr("data-shuffle-ads") && 1 < c.adMid.length && HAPUtils.shuffleArray(c.adMid), void 0 != a.attr("data-ad-mid-interval") && (c.adMidInterval = a.attr("data-ad-mid-interval"))) : oc && (c.adMid = oc, ld && (c.adMidInterval = ld)), void 0 != a.attr("data-ad-end") ? (c.adEnd = a.attr("data-ad-end").split(",").map(function(d) {
                return d.trim()
            }), void 0 != a.attr("data-shuffle-ads") && 1 < c.adEnd.length && HAPUtils.shuffleArray(c.adEnd)) : pc && (c.adEnd = pc));
            return c
        }

        function ca(a) {
            "youtube" == a && (ob = new HAPYoutubeLoader(b), f(ob).on("HAPYoutubeLoader.END_LOAD", function(c, d) {
                var e, g = d.data.length;
                for (e = 0; e < g; e++) {
                    var t = d.data[e];
                    ia.push(t)
                }
                pa = d.nextPageToken;
                Da ? qa() : q()
            }))
        }

        function J(a) {
            if ("file:" == window.location.protocol) return console.log("Reading folders requires server connection."), !1;
            a.limit ? (Ea = a.limit, a.loadMore && (Na = !0)) : Ea = 999999999;
            var c = a.path.replace(/\/\//g, "/"),
                d = b.sourcePath + "includes/folder_parser.php";
            c = {
                dir: c
            };
            var e = Ea;
            pa = [];
            a.id3 ? (Ab = Ia = ia.length - 1, Vd = !0) : Vd = !1;
            f.ajax({
                type: "GET",
                url: d,
                data: c,
                dataType: "json"
            }).done(function(g) {
                var t, F = g.length;
                a.sort && ("filename-asc" == a.sort ? HAPUtils.keysrt(g, "filename") : "filename-desc" == a.sort ? HAPUtils.keysrt(g, "filename", !0) : "date-asc" == a.sort ? HAPUtils.keysrt(g, "filemtime") : "date-desc" == a.sort && HAPUtils.keysrt(g, "filemtime", !0));
                for (t = 0; t < F; t++) {
                    var O = g[t];
                    var V = f.extend(!0, {}, a);
                    V.type = "audio";
                    var sa = O.fullpath;
                    V.path = sa;
                    b.createDownloadIconsInPlaylist && !V.download && (V.download = sa);
                    b.createLinkIconsInPlaylist && !V.link && (V.link = sa);
                    V.title || (V.title = O.filename);
                    t < e ? (ia.push(V), Ia++) : pa.push(V)
                }
                0 == pa.length && (Na = !1, pa = null);
                a.id3 ? ("undefined" === typeof jsmediatags && console.log("Link to jsmediatags.js missing in head tag!"), za()) : q()
            }).fail(function(g, t, F) {
                console.log("Error processFolder: " + g.responseText, t, F);
                q()
            })
        }

        function ea(a) {
            if ("file:" == window.location.protocol) return console.log("Reading folders requires server connection."), !1;
            var c = a.path.replace(/\/\//g, "/");
            f.ajax({
                type: "GET",
                url: b.sourcePath + "includes/folder_accordion.php",
                data: {
                    dir: c
                },
                dataType: "json"
            }).done(function(d) {
                var e, g = d.length,
                    t;
                for (e = 0; e < g; e++) {
                    var F = d[e].children;
                    Kc.push({
                        media: F
                    });
                    var O = F.length;
                    for (t = 0; t < O; t++) {
                        var V = F[t];
                        var sa = {
                            type: "audio"
                        };
                        void 0 != a.mediaId && (sa.mediaId = a.mediaId);
                        var Ba = V.fullpath;
                        sa[V.extension] = Ba;
                        b.createDownloadIconsInPlaylist && !sa.download && (sa.download = Ba);
                        b.createLinkIconsInPlaylist && !sa.link && (sa.link = Ba);
                        sa.title || (sa.title = V.filename);
                        F[t] = sa
                    }
                }
                pb(d, a);
                Oa || (Oa = 0);
                Jc = Oa;
                S = od = S.find('.hap-accordion-item[data-id="' + Oa + '"]').addClass("hap-accordion-item-inited hap-accordion-item-opened").find(".hap-accordion-item-content");
                ia = d[Oa].children;
                a.id3 ? (Wd = !0, "undefined" === typeof jsmediatags && console.log("Link to jsmediatags.js missing in head tag!"), Ab = -1, Ia = ia.length - 1, Mb()) : qa()
            }).fail(function(d, e, g) {
                console.log("Error processFolderAccordion: " + d, e, g);
                q()
            })
        }

        function ja(a) {
            if ("file:" == window.location.protocol) return console.log("Reading json requires server connection."), !1;
            f.ajax({
                type: "GET",
                url: a.path,
                dataType: "json"
            }).done(function(c) {
                var d, e = c.length,
                    g;
                for (d = 0; d < e; d++) {
                    var t = c[d].children;
                    Kc.push({
                        media: t
                    });
                    a.sort && ("filename-asc" == a.sort ? HAPUtils.keysrt(t, "filename") : "filename-desc" == a.sort ? HAPUtils.keysrt(t, "filename", !0) : "date-asc" == a.sort ? HAPUtils.keysrt(t, "filemtime") : "date-desc" == a.sort && HAPUtils.keysrt(t, "filemtime", !0));
                    var F = t.length;
                    for (g = 0; g < F; g++) {
                        var O = t[g];
                        var V = {
                            type: "audio"
                        };
                        void 0 != a.mediaId && (V.mediaId = a.mediaId);
                        O = nb ? nb + "/" + c[d].parent + "/" + O : O;
                        V.mp3 = O;
                        b.createDownloadIconsInPlaylist && !V.download && (V.download = O);
                        b.createLinkIconsInPlaylist && !V.link && (V.link = O);
                        t[g] = V
                    }
                }
                pb(c, a);
                Oa || (Oa = 0);
                Jc = Oa;
                S = od = S.find('.hap-accordion-item[data-id="' + Oa + '"]').addClass("hap-accordion-item-inited hap-accordion-item-opened").find(".hap-accordion-item-content");
                ia = c[Oa].children;
                a.id3 ? (Wd = !0, "undefined" === typeof jsmediatags && console.log("Link to jsmediatags.js missing in head tag!"), Ab = -1, Ia = ia.length - 1, Mb()) : qa()
            }).fail(function(c, d, e) {
                console.log("Error processJsonAccordion: " + c, d, e);
                q()
            })
        }

        function Aa(a) {
            if ("file:" == window.location.protocol) return console.log("Reading files from folders locally is not possible! This requires server connection."), !1;
            if (HAPUtils.isEmpty(b.gDriveAppId)) return console.log("gDriveAppId has not been set in settings!"), !1;
            f.ajax({
                url: "https://www.googleapis.com/drive/v3/files?q='" + a.path + "'+in+parents&pageSize=1000&key=" + b.gDriveAppId,
                dataType: "jsonp"
            }).done(function(c) {
                var d, e = c.files.length,
                    g = [],
                    t = [];
                for (d = 0; d < e; d++) {
                    var F = c.files[d];
                    /mp3|mpeg|mpeg3|wav|aac|adts/.test(F.mimeType) ? t.push(F) : /jpg|jpeg|png|webp/.test(F.mimeType) && g.push(F)
                }
                a.sort && ("filename-asc" == a.sort ? (HAPUtils.keysrt(t, "name"), HAPUtils.keysrt(g, "name")) : "filename-desc" == a.sort && (HAPUtils.keysrt(t, "name", !0), HAPUtils.keysrt(g, "name", !0)));
                e = t.length;
                for (d = 0; d < e; d++) {
                    F = t[d];
                    c = f.extend(!0, {}, a);
                    c.type = "audio";
                    var O = F.name.substr(F.name.lastIndexOf(".") + 1),
                        V = "https://www.googleapis.com/drive/v3/files/" + F.id + "?alt=media&key=" + b.gDriveAppId;
                    c[O.toLowerCase()] = V;
                    b.createDownloadIconsInPlaylist && !c.download && (c.download = V);
                    b.createLinkIconsInPlaylist && !c.link && (c.link = "https://drive.google.com/open?id=" + F.id);
                    !c.thumb && g[d] && (c.thumb = "https://drive.google.com/uc?export=view&id=" + g[d].id);
                    c.title || (c.title = F.name.substr(0, F.name.lastIndexOf(".")));
                    ia.push(c)
                }
                q()
            }).fail(function(c, d, e) {
                console.log("Error processGdriveFolder: " + c, d, e);
                q()
            })
        }

        function na() {
            if (!pa) return !1;
            ta = !0;
            La.show();
            ia = pa.splice(0, Ea);
            0 == pa.length && (pa = null);
            Vd ? (Ab = -1, Ia = ia.length - 1, za()) : qa()
        }

        function za() {
            var a = ia[Ia];
            jsmediatags.read(a.path || a.mp3 || a.wav || a.aac, {
                onSuccess: function(c) {
                    c = c.tags;
                    var d = c.picture;
                    c.artist && (a.artist = c.artist);
                    c.title && (a.title = c.title);
                    c.album && (a.album = c.album);
                    if (b.getId3Image && d) {
                        var e = "",
                            g, t = d.data.length;
                        for (g = 0; g < t; g++) e += String.fromCharCode(d.data[g]);
                        a.thumb = "data:" + d.format + ";base64," + window.btoa(e);
                        a.thumbIsBase64 = !0
                    }
                    c.TLEN && (a.duration = c.TLEN.data / 1E3);
                    Ia--;
                    Ia > Ab ? za() : Da ? qa() : q()
                },
                onError: function(c) {
                    console.log("ID3 error: ", c.type, c.info);
                    Ia--;
                    Ia > Ab ? za() : q()
                }
            })
        }

        function Mb() {
            var a = ia[Ia];
            jsmediatags.read(a.path || a.mp3 || a.wav || a.aac, {
                onSuccess: function(c) {
                    c = c.tags;
                    var d = c.picture;
                    c.artist && (a.artist = c.artist);
                    c.title && (a.title = c.title);
                    c.album && (a.album = c.album);
                    if (b.getId3Image && d) {
                        var e = "",
                            g, t = d.data.length;
                        for (g = 0; g < t; g++) e += String.fromCharCode(d.data[g]);
                        a.thumb = "data:" + d.format + ";base64," + window.btoa(e);
                        a.thumbIsBase64 = !0
                    }
                    c.TLEN && (a.duration = c.TLEN.data / 1E3);
                    Ia--;
                    Ia > Ab ? Mb() : qa()
                },
                onError: function(c) {
                    console.log("ID3 error: ", c.type, c.info);
                    Ia--;
                    Ia > Ab ? Mb() : qa()
                }
            })
        }

        function md(a) {
            if ("file:" == window.location.protocol) console.log("Using Podcast requires server connection!");
            else {
                a.limit ? (Ea = a.limit, a.loadMore && (Na = !0)) : Ea = 999999999;
                var c = ef + "?url=" + encodeURIComponent(a.path),
                    d = Ea;
                pa = [];
                f.ajax({
                    url: c,
                    dataType: "json",
                    cache: !1
                }).done(function(e) {
                    e = e.contents.substr(e.contents.indexOf("<?xml"));
                    var g = HAPUtils.parseXML(e),
                        t, F, O, V = 0;
                    f(g).find("image").length && f(g).find("image").attr("href") ? O = f(g).find("image").attr("href") : f(e).find("itunes\\:image").length && f(e).find("itunes\\:image").attr("href") && (O = f(e).find("itunes\\:image").attr("href"));
                    O && O.lastIndexOf("&size=Large") && (O = O.replace("=Large", "=Small"));
                    f(g).find("item").each(function() {
                        t = f(this);
                        F = f.extend(!0, {}, a);
                        F.type = "audio";
                        F.mp3 = t.find("enclosure").attr("url");
                        !F.title && t.find("title").length && (F.title = t.find("title").text());
                        F.artist || (t.find("author").length ? F.artist = t.find("author").text() : t.find("itunes\\:author").length && (F.artist = t.find("itunes\\:author").text()));
                        t.find("pubDate").length && (F.date = t.find("pubDate").text());
                        if (!F.description && t.find("description").length) {
                            var sa = t.find("description").text(),
                                Ba = document.createElement("div");
                            Ba.innerHTML = sa;
                            F.description = Ba.textContent || Ba.innerText || ""
                        }
                        F.duration || (t.find("itunes\\:duration").length ? F.duration = t.find("itunes\\:duration").text() : t.find("duration").length && (F.duration = t.find("duration").text()));
                        F.thumb || (t.find("image").length && t.find("image").attr("href") ? F.thumb = t.find("image").attr("href") : t.find("itunes\\:image").length && t.find("itunes\\:image").attr("href") ? F.thumb = t.find("itunes\\:image").attr("href") : O && (F.thumb = O));
                        F.thumb.lastIndexOf("&size=Large") && (F.thumb = F.thumb.replace("=Large", "=Small"));
                        b.createDownloadIconsInPlaylist && !F.download && (F.download = F.mp3);
                        t.find("link").length && !F.link && b.createLinkIconsInPlaylist && (F.link = t.find("link").text());
                        V < d ? ia.push(F) : pa.push(F);
                        V++
                    });
                    q()
                }).fail(function(e, g, t) {
                    console.log("Error processPodcast: " + e.responseText, g, t);
                    q()
                })
            }
        }

        function nd(a) {
            if ("file:" == window.location.protocol) console.log("Using Podcast requires server connection!");
            else {
                var c = a.path.match(/id(\d+)/);
                (c = c ? c[1] : url.match(/\d+/)) ? f.ajax({
                    url: "https://itunes.apple.com/lookup",
                    data: {
                        id: parseInt(c),
                        entity: "podcast"
                    },
                    type: "GET",
                    dataType: "jsonp"
                }).done(function(d) {
                    a.path = d.results[0].feedUrl;
                    md(a)
                }).fail(function(d, e, g) {
                    console.log("Error processiTunes: " + d.responseText, e, g);
                    q()
                }): (console.log("No Podcast ID found!"), q())
            }
        }

        function Pc() {
            if ("file:" == window.location.protocol) console.log("Using SoundCloud requires server connection!");
            else {
                b.soundCloudAppId = b.scak[Math.floor(Math.random() * b.scak.length)];
                var a = document.createElement("script");
                a.src = "https://connect.soundcloud.com/sdk.js";
                var c = document.getElementsByTagName("script")[0];
                c.parentNode.insertBefore(a, c);
                var d = setInterval(function() {
                    window.SC && (d && clearInterval(d), SC.initialize({
                        client_id: b.soundCloudAppId
                    }), Ud = !0)
                }, 100)
            }
        }

        function Xa(a, c) {
            SC.get(a ? "https://api.soundcloud.com/resolve.json?url=" + c + "&client_id=" + b.soundCloudAppId : c, {
                limit: Ea,
                linked_partitioning: 1
            }, function(d, e) {
                if (e) {
                    for (console.log("Error getSoundCloudPage: " + e); bb.length;) ia.push(bb.splice(0, 1)[0]);
                    q()
                } else {
                    if ("track" == d.kind) Bb(d);
                    else if ("playlist" == d.kind) {
                        var g, t = d.tracks.length;
                        if (bb.length + t >= Ea) {
                            t = Ea - bb.length;
                            var F = !0
                        }
                        for (g = 0; g < t; g++) Bb(d.tracks[g])
                    } else if (d.collection)
                        for (t = d.collection.length, bb.length + t >= Ea && (t = Ea - bb.length, F = !0), g = 0; g < t; g++) Bb(d.collection[g]);
                    else {
                        if (d.username) {
                            g = d.uri;
                            g = /likes/.test(c) ? g + "/likes" : /favorites/.test(c) ? g + "/favorites" : g + "/tracks";
                            Xa(!1, g);
                            return
                        }
                        if (f.isArray(d))
                            for (t = d.length, bb.length + t >= Ea && (t = Ea - bb.length, F = !0), g = 0; g < t; g++) Bb(d[g])
                    }
                    pa = d.next_href ? d.next_href : null;
                    if (d.next_href && !F) Xa(!1, d.next_href);
                    else {
                        for (; bb.length;) ia.push(bb.splice(0, 1)[0]);
                        q()
                    }
                }
            })
        }

        function Nb() {
            if (!pa) return !1;
            ta = !0;
            La.show();
            ia = [];
            ia = pa.splice(0, Ea);
            0 == pa.length && (pa = null);
            qa()
        }

        function cb() {
            if (!pa) return !1;
            ta = !0;
            La.show();
            Lb = 0;
            ua = [];
            Y = 1;
            if (window.SC) Xa(!1, pa);
            else {
                Pc();
                var a = setInterval(function() {
                    Ud && (a && clearInterval(a), Xa(!1, pa))
                }, 100)
            }
        }

        function Bb(a) {
            if (a.streamable && a.stream_url) {
                var c = f.extend(!0, {}, ua[Lb]);
                c.type = "audio";
                a.duration && (c.duration = a.duration / 1E3); - 1 == a.stream_url.indexOf("?") ? c.mp3 = a.stream_url + "?client_id=" + b.soundCloudAppId : c.mp3 = a.stream_url + "&client_id=" + b.soundCloudAppId;
                b.createDownloadIconsInPlaylist && !c.download && a.downloadable && a.download_url && (c.download = c.mp3.replace(/\/stream\\?/, "/download"));
                !c.title && a.title && (c.title = a.title);
                !c.description && a.description && (c.description = a.description);
                !c.thumb && a.artwork_url && (c.thumb = a.artwork_url);
                a.created_at && (c.date = a.created_at);
                c.favoritingsCount = parseInt(a.favoritings_count ? a.favoritings_count : 0, 10);
                c.playbackCount = parseInt(a.playback_count ? a.playback_count : 0, 10);
                c.hotness = c.favoritingsCount + c.playbackCount;
                a.permalink_url && b.createLinkIconsInPlaylist && !c.link && (c.link = a.permalink_url);
                c.sc_data = a;
                bb.push(c)
            }
        }

        function qa() {
            var a, c = Ob ? gb : la.length,
                d = ia.length,
                e, g, t, F, O, V = 0,
                sa = [],
                Ba;
            Xd = [];
            for (a = 0; a < d; a++) {
                var qc = a + c;
                Ob && V++;
                var L = pd ? ia[a].data : ia[a];
                var qd = L.type;
                if (b.usePlaylist) {
                    if (L.type) {
                        var oa = O = F = t = g = Ba = null; - 1 != Ta.indexOf("thumb") && (e = L.thumbSmall || L.thumb || L.thumbDefault) && ("soundcloud" == L.origtype && b.soundCloudThumbQualityInPlaylist && (e = e.replace("large.jpg", b.soundCloudThumbQualityInPlaylist)), !nb || L.thumbIsBase64 || HAPUtils.relativePath(e) || (e = nb + e), g = L.thumbAlt ? L.thumbAlt : L.title ? L.title.replace(/"/g, "'") : "image", g = '<img class="hap-thumbimg" src="' + e + '" alt="' + g + '"/>'); - 1 != Ta.indexOf("description") && (L.description && (t = L.description, b.limitDescriptionText && 0 != b.limitDescriptionText && t.length > parseInt(b.limitDescriptionText, 10) && (b.createReadMoreInDescription ? (e = t.substr(0, parseInt(b.limitDescriptionText, 10)), t = t.substr(parseInt(b.limitDescriptionText, 10)), t = e + '<span class="hap-playlist-description-read-more-text">' + t + '</span><span class="hap-playlist-description-read-more-dots">...</span>&nbsp;<span class="hap-playlist-description-read-more-btn" title="' + b.limitDescriptionReadMoreText + '">' + b.limitDescriptionReadMoreText + "</span>") : t = t.substr(0, parseInt(b.limitDescriptionText, 10)) + "...")), L.descriptionHtml && (F = L.descriptionHtml)); - 1 != Ta.indexOf("duration") && L.duration && (O = isNaN(L.duration) ? -1 == L.duration.lastIndexOf(":") ? HAPUtils.formatTime(L.duration) : L.duration : HAPUtils.formatTime(L.duration)); - 1 != Ta.indexOf("date") && L.date && (oa = (new Date(L.date)).toDateString().slice(4, 10));
                        L.origclasses || (L.origclasses = "hap-playlist-item");
                        e = f('<div class="' + L.origclasses + '"/>');
                        delete L.origclasses;
                        var Yd = f('<div class="hap-playlist-item-content"/>').appendTo(e); - 1 != Ta.indexOf("thumb") && g && f('<div class="hap-playlist-thumb">' + g + '<div class="hap-playlist-thumb-style"></div></div>').appendTo(Yd);
                        if (-1 != Ta.indexOf("title") || -1 != Ta.indexOf("description") && L.description) {
                            g = f('<div class="hap-playlist-info">').appendTo(Yd);
                            if (-1 != Ta.indexOf("title") && L.title) {
                                var Pb = '<div class="hap-playlist-title-wrap">';
                                b.useNumbersInPlaylist && (Pb += '<div class="hap-playlist-title-num"></div>');
                                L.artist && L.title ? Pb = "title" == ff[0] ? Pb + ('<div class="hap-playlist-title">' + L.title + "</div>" + b.artistTitleSeparator + '<div class="hap-playlist-artist">' + L.artist + "</div>") : Pb + ('<div class="hap-playlist-artist">' + L.artist + "</div>" + b.artistTitleSeparator + '<div class="hap-playlist-title">' + L.title + "</div>") : L.title ? Pb += '<div class="hap-playlist-title">' + L.title + "</div>" : L.artist && (Pb += '<div class="hap-playlist-artist">' + L.artist + "</div>");
                                Pb += "</div>";
                                g.append(Pb)
                            } - 1 != Ta.indexOf("description") && (t ? f('<div class="hap-playlist-description">' + t + "</div>").appendTo(g) : F && g.append(F))
                        }
                        if (-1 != Ta.indexOf("duration") && L.duration || -1 != Ta.indexOf("date") && L.date) F = f('<div class="hap-playlist-info2">').appendTo(Yd), -1 != Ta.indexOf("duration") && O && f('<div class="hap-playlist-duration">' + O + "</div>").appendTo(F), -1 != Ta.indexOf("date") && oa && f('<div class="hap-playlist-date">' + oa + "</div>").appendTo(F);
                        e.attr("data-type", qd);
                        void 0 != L.mediaId && e.attr("data-media-id", L.mediaId);
                        L.title && (oa = L.title.replace(/['"\|]/g, ""), w.getTitle(L, !0), e.attr({
                            "data-title": L.title,
                            "data-safe-title": oa
                        }), L.safeTitle = oa);
                        L.artist && (oa = L.artist.replace(/['"\|]/g, ""), e.attr({
                            "data-artist": L.artist,
                            "data-safe-artist": oa
                        }), L.safeArtist = oa);
                        L.description && (oa = L.description.replace(/"/g, "'"), e.attr("data-description", oa));
                        L.category && e.attr("data-category", L.category);
                        L.tag && e.attr("data-tag", L.tag);
                        b.useStatistics && rd.length ? (Ba = f('<div class="hap-playlist-icons"></div>').appendTo(e), oa = f('<div class="hap-stats"></div>'), Ba.prepend(oa), -1 != rd.indexOf("plays") && (O = f('<div class="hap-stat-icon hap-play-count" title="' + b.tooltipStatPlays + '">' + b.statPlayIcon + "<span>0</span></div>"), oa.append(O)), -1 != rd.indexOf("likes") && (O = f('<div class="hap-stat-icon hap-like-count" title="' + b.tooltipStatLikes + '">' + b.statLikeIcon + "<span>0</span></div>"), oa.append(O)), -1 != rd.indexOf("downloads") && (O = Ee && void 0 != L.download ? f('<a href="' + L.download + '" class="hap-stat-icon hap-download-count" download aria-label="' + b.tooltipStatDownloads + '" title="' + b.tooltipStatDownloads + '">' + b.statDownloadIcon + "<span>0</span></a>") : f('<div class="hap-stat-icon hap-download-count hap-no-download" title="' + b.tooltipStatDownloads + '">' + b.statDownloadIcon + "<span>0</span></div>"), oa.append(O))) : Ee && L.download && (Ba = f('<div class="hap-playlist-icons"></div>').appendTo(e), oa = f('<a class="hap-playlist-icon hap-download" href="' + L.download + '" title="' + b.downloadIconTitle + '" aria-label="' + b.downloadIconTitle + '">' + b.downloadIcon + "</a>"), Ba.prepend(oa));
                        if (L.playlistIcons)
                            for (Ba || (Ba = f('<div class="hap-playlist-icons"></div>').appendTo(e)), oa = L.playlistIcons.length, c = 0; c < oa; c++) O = L.playlistIcons[c], Ba.append('<a class="hap-playlist-icon hap-icon-' + O.icon + '" href="' + O.url + '" target="' + O.target + '" title="' + O.title + '">&#x' + O.icon + "</a>");
                        L.link && (Ba || (Ba = f('<div class="hap-playlist-icons"></div>').appendTo(e)), oa = '<a class="hap-playlist-icon hap-link" href="' + L.link + '" target="' + (L.target || "_blank") + '" title="' + b.linkIconTitle + '" aria-label="' + b.linkIconTitle + '"', L.rel && (oa += ' rel="' + L.rel + '"'), oa += ">" + b.linkIcon + "</a>", Ba.append(oa));
                        L.customContent && (e.append(L.customContent), delete L.customContent)
                    } else e = L;
                    if (Ob) {
                        Fe ? Fe.after(e) : rc ? e.appendTo(S) : S.children("div").eq(gb).before(e);
                        var Fe = e
                    } else e.appendTo(S);
                    b.addPlaylistEvents && (e.on("click", ".hap-playlist-thumb, .hap-playlist-title-wrap", m), Qc || (e.on("mouseenter ", ".hap-playlist-thumb, .hap-playlist-title-wrap", u), e.on("mouseleave", ".hap-playlist-thumb, .hap-playlist-title-wrap", B)))
                } else b.useStatistics && void 0 != L.mediaId && (L.title && (oa = L.title.replace(/['"\|]/g, ""), L.safeTitle = oa), L.artist && (oa = L.artist.replace(/['"\|]/g, ""), L.safeArtist = oa));
                void 0 != Ma && (L.playlistId = Ma);
                ac ? sa.push({
                    id: a,
                    type: qd,
                    data: L
                }) : la.splice(qc, 0, {
                    id: qc,
                    type: qd,
                    data: L
                });
                Xd.push({
                    id: qc,
                    type: qd,
                    data: L
                })
            }
            ac ? (b.usePlaylistScroll = !1, b.allowOnlyOneOpenedAccordion || Qb.addClass("hap-force-hidden"), Wa.addClass("hap-accordion"), Kc[Oa].data = sa, Ge ? (Cb(!1), b.useStatistics && db()) : (la = sa, Cb(!0), b.useStatistics && db(), ha.setPlaylistItems(Y)), W(), V = od[0], V.style.height = V.scrollHeight + "px", Zd = !1, Ge = !0) : (Wa.removeClass("hap-accordion"), dc = S, Cb(!0), b.useStatistics && db(), Ob ? (qc = ha.getCounter(), ha.setPlaylistItems(Y, !1), gb <= qc && (rc || ha.reSetCounter(qc + V)), sd && ha.setCounter(gb, !1), td = !1) : ha.setPlaylistItems(Y), W())
        }

        function Rc(a) {
            La.show();
            Oa = a.attr("data-id");
            S = od = a.addClass("hap-accordion-item-inited").find(".hap-accordion-item-content");
            ia = Kc[Oa].media;
            Wd ? (Ab = -1, Ia = ia.length - 1, Mb()) : qa()
        }

        function pb(a, c) {
            var d, e = a.length,
                g = "";
            for (d = 0; d < e; d++) {
                var t = a[d].parent.replace(/"/g, "'");
                "undefined" !== c.activeAccordion && c.activeAccordion == t && (Oa = d);
                g += '<div class="hap-accordion-item" data-id="' + d + '" title="' + t + '"><span class="hap-accordion-item-title">' + t + '</span><div class="hap-accordion-item-content">';
                a[d].description && (g += '<span class="hap-accordion-item-description">' + a[d].description + "</span>");
                g += "</div></div>"
            }
            S.html(g)
        }

        function Cb(a) {
            a && (Y = la.length);
            if (b.usePlaylist) {
                var c = 0,
                    d, e, g;
                S.find(".hap-playlist-item").each(function() {
                    d = f(this).attr("data-id", c);
                    g = d.find(".hap-playlist-title");
                    g.length && b.useNumbersInPlaylist && (e = HAPUtils.formatNumber(c) + b.numberTitleSeparator, d.find(".hap-playlist-title-num").length ? d.find(".hap-playlist-title-num").html(e) : g.before(f('<div class="hap-playlist-title-num">' + e + "</div>")));
                    a && (la[c].id = c);
                    c++
                })
            }
        }

        function db() {
            var a, c = [];
            for (a = 0; a < Y; a++) {
                var d = la[a].data;
                d.id = a;
                if (!d.hapStatsSet) {
                    var e = void 0 != d.mediaId ? d.mediaId : null;
                    c.push({
                        media_id: e,
                        title: d.safeTitle || d.title || "",
                        artist: d.safeArtist || d.artist || ""
                    });
                    d.hapStatsSet = !0
                }
            }
            c.length && qb("hap_all_count", null, c)
        }

        function Rb(a) {
            if ("mcustomscrollbar" == b.playlistScrollType)
                if ("undefined" === typeof mCustomScrollbar) {
                    var c = document.createElement("script");
                    c.type = "text/javascript";
                    c.src = HAPUtils.qualifyURL(b.sourcePath + b.mCustomScrollbar_js);
                    c.onload = c.onreadystatechange = function() {
                        this.readyState && "complete" != this.readyState || Rb(a)
                    };
                    c.onerror = function() {
                        alert("Error loading " + this.src)
                    };
                    var d = document.getElementsByTagName("script")[0];
                    d.parentNode.insertBefore(c, d)
                } else a.mCustomScrollbar({
                    axis: "horizontal" == b.playlistScrollOrientation ? "x" : "y",
                    theme: b.playlistScrollTheme,
                    scrollInertia: 0,
                    mouseWheel: {
                        normalizeDelta: !0,
                        deltaFactor: 50,
                        preventDefault: !0
                    },
                    keyboard: {
                        enable: !1
                    },
                    advanced: {
                        autoExpandHorizontalScroll: !0
                    },
                    callbacks: {
                        onOverflowYNone: function() {
                            a.find(".mCSB_container").addClass("hap-mCSB_full")
                        },
                        onOverflowY: function() {
                            a.find(".mCSB_container").removeClass("hap-mCSB_full")
                        },
                        onTotalScroll: function() {
                            Na ? pa && ya && !ta && (ta = !0, La.show(), Da = !0, ia = [], va && va.css("opacity", 0), "soundcloud" == ya ? cb() : "podcast" == ya ? Nb() : "folder" == ya ? na() : "youtube" == ya && (ob || ca("youtube"), ob.resumeLoad(pa))) : mb && (Da || ud())
                        }
                    }
                });
            else "perfect-scrollbar" == b.playlistScrollType && ("function" !== typeof PerfectScrollbar ? (c = document.createElement("script"), c.type = "text/javascript", c.src = HAPUtils.qualifyURL(b.sourcePath + b.perfectScrollbar_js), c.onload = c.onreadystatechange = function() {
                this.readyState && "complete" != this.readyState || Rb(a)
            }, c.onerror = function() {
                alert("Error loading " + this.src)
            }, d = document.getElementsByTagName("script")[0], d.parentNode.insertBefore(c, d)) : (rb = new PerfectScrollbar(a[0], {
                wheelSpeed: 2,
                wheelPropagation: !0,
                minScrollbarLength: 30
            }), a[0].addEventListener("horizontal" == b.playlistScrollOrientation ? "ps-x-reach-end" : "ps-y-reach-end", function() {
                Na ? pa && ya && !ta && (ta = !0, La.show(), Da = !0, ia = [], va && va.css("opacity", 0), "soundcloud" == ya ? cb() : "podcast" == ya ? Nb() : "folder" == ya ? na() : "youtube" == ya && (ob || ca("youtube"), ob.resumeLoad(pa))) : mb && (Da || ud())
            })))
        }

        function W() {
            La.hide();
            ta = !1;
            if (!Z) {
                Z = !0;
                if (aa && void 0 != aa.attr("data-use-pagination") && (ec = Math.ceil(kc / Jb), kc > Jb)) {
                    Ua = 0;
                    $d(Ua);
                    var a;
                    for (a = 0; a < ec; a++) {
                        var c = 0 == a ? {
                            page: 0
                        } : {
                            page: null
                        };
                        sc.push(c)
                    }
                    He(Ua)
                }
                if (b.createReadMoreInDescription) S.on("click", ".hap-playlist-description-read-more-btn", function(g) {
                    g = f(this);
                    var t = g.closest(".hap-playlist-description"),
                        F = t.find(".hap-playlist-description-read-more-text");
                    t = t.find(".hap-playlist-description-read-more-dots");
                    "none" == t.css("display") ? (g.html(b.limitDescriptionReadMoreText).attr("title", b.limitDescriptionReadMoreText), t.css("display", "inline")) : (g.html(b.limitDescriptionReadLessText).attr("title", b.limitDescriptionReadLessText), t.css("display", "none"));
                    F.slideToggle("fast")
                });
                b.usePlaylistScroll && !Sc && (Wa.length && Rb(Wa), Sc = !0);
                setTimeout(function() {
                    b.hidePlayerUntilMusicStart || (-1 < xa.indexOf("hap-fixed") && Ie(), b.addResizeEvent && ae(), setTimeout(function() {
                        vd.css("opacity", 1)
                    }, 50));
                    f(w).trigger("setupDone", {
                        instance: w,
                        instanceName: b.instanceName
                    })
                }, 100);
                ac && (Sb = H.find(".hap-accordion-item").eq(Oa), H.find(".hap-accordion-item-title").on("click", function() {
                    var g = f(this).closest(".hap-accordion-item");
                    if (g.hasClass("hap-accordion-item-opened")) {
                        g.removeClass("hap-accordion-item-opened");
                        var t = g.find(".hap-accordion-item-content")[0];
                        t.style.height = "0"
                    } else {
                        b.allowOnlyOneOpenedAccordion && Sb && Sb != g && (Sb.removeClass("hap-accordion-item-opened"), t = Sb.find(".hap-accordion-item-content")[0], t.style.height = "0", Sb.find(".hap-playlist-item").each(function() {
                            f(this).show()
                        }));
                        be.val("");
                        Qb.hide();
                        if (g.hasClass("hap-accordion-item-inited")) t = g.find(".hap-accordion-item-content")[0], t.style.height = t.scrollHeight + "px";
                        else {
                            if (Zd) return !1;
                            Zd = !0;
                            Rc(g)
                        }
                        Sb = g.addClass("hap-accordion-item-opened")
                    }
                }))
            }
            if (b.usePlaylist && 0 < Y) {
                var d = [];
                S.find(".hap-thumbimg:not(.hap-visible)").each(function() {
                    d.push(f(this))
                });
                var e = 0;
                a = d.length;
                for (c = 0; c < a; c++) setTimeout(function() {
                    clearTimeout(this);
                    d[e].addClass("hap-visible");
                    e++
                }, 50 + 50 * c);
                HAPUtils.isEmpty(ab) || w.sort(ab)
            }
            if (!wd && (wd = !0, !Ob && !Da && 0 < Y))
                if (void 0 != b.mediaId) {
                    b.mediaTitle ? (a = S.find(".hap-playlist-item[data-media-id=" + b.mediaId + '][data-safe-title="' + b.mediaTitle + '"]'), 0 == a.length && (a = S.find(".hap-playlist-item[data-media-id=" + b.mediaId + "]")), delete b.mediaTitle) : a = S.find(".hap-playlist-item[data-media-id=" + b.mediaId + "]");
                    a = S.children(".hap-playlist-item").index(a);
                    if (void 0 == a || -1 == a) return alert("No media with ID to load! LoadMedia failed."), !1;
                    delete b.mediaId;
                    ha.processPlaylistRequest(a)
                } else null != jd ? (a = S.find('.hap-playlist-item[data-media-id="' + jd + '"]'), a.length ? (a = a.attr("data-id"), jd = null) : a = 0) : a = b.activeItem, a > Y - 1 && (a = Y - 1), -1 < a && ha.setCounter(a, !1);
            Da = Ob = !1;
            va && (Na ? pa ? va.css("opacity", 1) : (va.remove(), va = null, Na = !1) : mb ? 0 < kc ? kc > Kb ? va.css("opacity", 1) : (va.remove(), va = null, mb = !1) : (va.remove(), va = null) : (va.remove(), va = null));
            f(w).trigger("playlistEndLoad", {
                instance: w,
                instanceName: b.instanceName,
                loadMoreOnTotalScroll: Na,
                addMoreOnTotalScroll: mb,
                playlistLength: Y
            }); - 1 < xa.indexOf("hap-wall") && (xd ? S.masonry("reloadItems") : ("undefined" === typeof f.fn.masonry && console.log("Link to masonry.pkgd.min.js file missing in head tag!"), "function" !== typeof imagesLoaded && console.log("Link to imagesloaded.pkgd.min file missing in head tag!"), xd = S.masonry({
                itemSelector: ".hap-playlist-item"
            })), S.imagesLoaded(function() {
                xd.masonry("layout")
            }), S.find(".hap-playlist-item-content:not(.hap-has-overlay)").each(function() {
                f(this).addClass("hap-has-overlay").find(".hap-playlist-thumb").after(f('<div class="hap-wall-overlay"></div>'))
            }))
        }

        function U() {
            Db = new Hls;
            ce = Hls.isSupported();
            Je = !0;
            Db.on(Hls.Events.MEDIA_ATTACHED, function() {
                Db.loadSource(ka)
            });
            Db.on(Hls.Events.ERROR, function(a, c) {
                if (c.fatal) switch (c.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        console.log("fatal network error encountered, try to recover");
                        Db.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log("fatal media error encountered, try to recover");
                        Db.recoverMediaError();
                        break;
                    default:
                        Db.destroy()
                }
            })
        }

        function fa() {
            if ("hls" == Q) {
                if (ka = I.path, !Je) {
                    if ("undefined" === typeof Hls) {
                        var a = document.createElement("script");
                        a.type = "text/javascript";
                        a.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
                        a.onload = a.onreadystatechange = function() {
                            this.readyState && "complete" != this.readyState || (U(), fa())
                        };
                        a.onerror = function() {
                            alert("Error loading " + this.src)
                        };
                        var c = document.getElementsByTagName("script")[0];
                        c.parentNode.insertBefore(a, c)
                    } else U(), fa();
                    return
                }
            } else sb ? (ka = b.useCorsForAudio ? b.cors + I.path : I.path, I.mountpoint && (ka += I.mountpoint), "shoutcast" == Q && "/;" != ka.substring(ka.length - 2) && (ka += "/;"), tc || ("undefined" === typeof HAPRadioData && console.log("link to radio.js file missing in head tag!"), tc = new HAPRadioData(b, Qa), f(tc).on("HAPRadioData.DATA_READY", function(d, e) {
                e.title && (I.title = e.title);
                e.artist && (I.artist = e.artist);
                e.thumb && (I.thumb = e.thumb);
                de();
                yd && y()
            })), tc.getData(I)) : b.useAudioPreview && I.audioPreview ? ka = I.audioPreview : gf && I.mp3 ? ka = I.mp3 : hf && I.aac ? ka = I.aac : jf && I.wav ? ka = I.wav : kf && I.flac ? ka = I.flac : I.path && (ka = I.path);
            if (ka) {
                -1 != ka.indexOf("ebsfm:") && (ka = HAPUtils.b64DecodeUnicode(ka.substr(6)));
                "audio" == Q && nb && !HAPUtils.relativePath(ka) && (ka = nb + ka);
                uc.on("ended", function() {
                    da && da.isAdEndOn() || (xb && Fa && !Za && !Yc.isDrag() ? (Za = !0, P.currentTime = Sa, P.play()) : Md())
                }).on("canplay", function(d) {}).on("canplaythrough", function(d) {}).on("loadedmetadata", function() {
                    try {
                        P.playbackRate = Number(b.playbackRate)
                    } catch (e) {}
                    "audio" == Q && (b.resumeTime ? (P.currentTime = b.resumeTime, delete b.resumeTime) : I.start && (P.currentTime = I.start));
                    var d = P.duration;
                    HAPUtils.isNumber(d) && (hb.html(HAPUtils.formatTime(d)), xb && (gc.html("00:00"), hc.html(HAPUtils.formatTime(d))))
                }).on("play", function() {
                    $c()
                }).on("pause", function() {
                    Ae()
                }).on("seeked", function() {
                    xb && Fa && setTimeout(function() {
                        clearTimeout(this);
                        Za = !1
                    }, 500);
                    ra && (Eb || (ra.currentTime = P.currentTime), Eb = !1)
                }).on("error", function(d) {
                    f(w).trigger("soundError", {
                        instance: w,
                        instanceName: b.instanceName,
                        media: I,
                        error: d
                    })
                });
                if ("hls" == Q) {
                    if ("file:" == window.location.protocol) return console.log("Playing HLS requires server connection!"), !1;
                    if (ce) Db.attachMedia(P);
                    else if (P.canPlayType("application/vnd.apple.mpegurl")) P.src = ka;
                    else if (I.mp3) P.src = I.mp3;
                    else {
                        alert("This browser or device does not support HLS extension. Please use mp3 audio for playback!");
                        return
                    }
                    Ca && (a = P.play(), void 0 !== a && a.then(function() {})["catch"](function(d) {}))
                } else P.src = ka, Ca && (a = P.play(), void 0 !== a && a.then(function() {})["catch"](function(d) {
                    console.log(d)
                }));
                P.volume = b.volume;
                Ca = !0;
                sb ? b.useStatistics && (ee = !0, vc = 0) : (Fb && clearInterval(Fb), Fb = setInterval(Ec, ze))
            } else alert("No required audio format supplied! Please add mp3 audio format to play!")
        }

        function Ec() {
            if (!(yb || b.pauseAudioDuringAds && da && da.isAdOn())) {
                if ("youtube" == Q) {
                    if (ba) {
                        var a = ba.getCurrentTime(),
                            c = ba.getDuration();
                        var d = ba.getVideoLoadedFraction()
                    }
                } else if (P && (a = P.currentTime, c = P.duration, HAPUtils.isNumber(a) && HAPUtils.isNumber(c) && "undefined" !== typeof P.buffered && 0 != P.buffered.length)) {
                    try {
                        var e = P.buffered.end(P.buffered.length - 1)
                    } catch (g) {}
                    isNaN(e) || (d = e / c)
                }
                if (HAPUtils.isNumber(a) && HAPUtils.isNumber(c)) {
                    !zd && 0 < a && ib && (zd = !0, f(w).trigger("soundPlay", {
                        instance: w,
                        instanceName: b.instanceName,
                        media: I
                    }));
                    b.useWaveSeekbar && Ib ? fe.width(a / c * 100 + "%") : Fc ? ad.drawSeekbar(d, a, c) : ($a.width(a / c * Ka), d && Ke.width(d * Ka));
                    b.useInlineSeekbar && wc.find(".hap-inline-seekbar-progress").width(a / c * wc.width());
                    d = HAPUtils.formatTime(a);
                    e = HAPUtils.formatTime(c);
                    tb.html(d);
                    hb.html(e);
                    if (!yb) {
                        if (I.end && a >= I.end) {
                            Md();
                            return
                        }
                        b.useFixedPlayer && window.hap_fixed_active_player == b.instanceName && Hb && Ga.setProgressData(a / c, null, d, e, c)
                    }
                    xb && Fa && !Za && !Yc.isDrag() && (parseInt(a, 10) < parseInt(Sa, 10) || a > jb) ? (Za = !0, w.seek(Sa)) : I.lyrics && ub && Ad && Tc && ib && ub.synchronize(a)
                }
            }
        }

        function $c() {
            Hb || (Hb = !0, Ka = b.useWaveSeekbar ? ic.width() : Gc.width(), da && da.setSeekBarSize(Ka), f(w).trigger("soundStart", {
                instance: w,
                instanceName: b.instanceName,
                media: I
            }), I.adMid && da.adMidStartHandler(), b.useFixedPlayer && (window.hap_fixed_active_player = b.instanceName, Ga.setData({
                inst: b.instanceName,
                media: I,
                volume: b.volume
            })));
            ee && (Tb && clearTimeout(Tb), ge = Date.now() + 1E3, Tb = setTimeout(Le, 1E3));
            I.adMid && da.adMidPlayHandler();
            b.useFixedPlayer && window.hap_fixed_active_player == b.instanceName && Ga.setPauseBtn();
            b.togglePlaybackOnPlaylistItem && wa.find(".hap-playlist-thumb-style").addClass("hap-playlist-thumb-style-pause");
            if (b.togglePlaybackOnMultipleInstances && 1 < hap_mediaArr.length) {
                var a, c = hap_mediaArr.length;
                for (a = 0; a < c; a++) w != hap_mediaArr[a].inst && hap_mediaArr[a].inst.pauseMedia()
            }
            ra && (Eb || (a = ra.play(), void 0 !== a && a.then(function() {})["catch"](function(d) {})), Eb = !1);
            zd && f(w).trigger("soundPlay", {
                instance: w,
                instanceName: b.instanceName,
                media: I
            });
            eb.find(".hap-btn-play").hide();
            eb.find(".hap-btn-pause").show();
            ib = !0;
            b.autoPlayAfterFirst && (Ca = !0, b.autoPlay = !0);
            b.hidePlayerUntilMusicStart && Me();
            Bd && "undefined" !== typeof ga && ga("send", {
                hitType: "event",
                eventCategory: "Modern audio player: " + b.instanceName,
                eventAction: "played",
                eventLabel: "title: " + w.getTitle(I, !0) + " | time: " + Math.round(w.getCurrentTime()),
                nonInteraction: !0
            }); - 1 < xa.indexOf("hap-fixed") && Ne(!0)
        }

        function Ae() {
            eb.find(".hap-btn-play").show();
            eb.find(".hap-btn-pause").hide();
            ra && (Eb || ra.pause(), Eb = !1);
            ee && Tb && clearTimeout(Tb);
            b.useFixedPlayer && window.hap_fixed_active_player == b.instanceName && Ga.setPlayBtn();
            b.togglePlaybackOnPlaylistItem && wa.find(".hap-playlist-thumb-style").removeClass("hap-playlist-thumb-style-pause");
            ib = !1;
            f(w).trigger("soundPause", {
                instance: w,
                instanceName: b.instanceName,
                media: I
            });
            Bd && "undefined" !== typeof ga && ga("send", {
                hitType: "event",
                eventCategory: "Modern audio player: " + b.instanceName,
                eventAction: "paused",
                eventLabel: "title: " + w.getTitle(I, !0) + " | time: " + Math.round(w.getCurrentTime()),
                nonInteraction: !0
            }); - 1 < xa.indexOf("hap-fixed") && Ne()
        }

        function Md() {
            da && da.clearAdMidTimeout();
            f(w).trigger("soundEnd", {
                instance: w,
                instanceName: b.instanceName,
                media: I
            });
            b.useStatistics && qb("hap_finish_count", Ja);
            Bd && "undefined" !== typeof ga && ga("send", {
                hitType: "event",
                eventCategory: "Modern audio player: " + b.instanceName,
                eventAction: "ended",
                eventLabel: "title: " + w.getTitle(I, !0),
                nonInteraction: !0
            });
            I.adEnd ? da.setAdEnd() : b.stopOnSongEnd || Oe()
        }

        function Oe(a) {
            var c = I.start || 0;
            "single" == b.loopState ? (a || jc(), "youtube" == Q ? ba && (ba.seekTo(c), ba.playVideo()) : (a && (P.src = ka), P.currentTime = c, P.play())) : "off" != b.loopState && "playlist" != b.loopState || w.nextMedia()
        }

        function xc() {
            Fb && clearInterval(Fb);
            Tb && clearTimeout(Tb);
            vc = 0;
            da && (da.cleanAds(), $a.removeClass("hap-ad-progress-level"), Ub.hide());
            sb ? tc && tc.destroy() : "hls" == Q ? ce && Db.detachMedia() : "youtube" == Q && ba && (Zc = !0, Xb.hide(), Ra && ba.stopVideo(), Nd = !1);
            P && (P.pause(), P.src = "");
            uc && uc.off("ended canplay canplaythrough loadedmetadata pause play error timeupdate seeked");
            tb.html("00:00");
            hb.html("00:00");
            Pe.html("");
            Qe.html("");
            $a.width(0);
            Ke.width(0);
            Ib = null;
            fe.width(0);
            Q = null;
            sd = Hb = ib = !1;
            Re || (Ca = !1);
            xb && w.resetRange();
            eb.find(".hap-btn-play").show();
            eb.find(".hap-btn-pause").hide();
            zd = !1;
            wc && wc.find(".hap-inline-seekbar-progress").width(0);
            Pa && Pa.find(".hap-lyrics-container").html("");
            ub && ub.deactivate();
            Ad = !1;
            ra && (ra.pause(), ra.src = "", ra = null, Cd.html(""))
        }

        function bd() {
            "undefined" !== typeof f.fn.masonry && xd && S.masonry("destroy");
            Q && (xc(), wa && R());
            b.sortableTracks && b.sortableTracksSet && (S.sortable("destroy"), b.sortableTracksSet = !1);
            S.empty();
            dc = null;
            wd = Ob = !1;
            Y = 0;
            Lb = -1;
            la = [];
            ia = [];
            ua = [];
            ha.reSetCounter();
            pc = ld = oc = nc = id = mc = lc = Oc = aa = null;
            mb = !1;
            nb = null;
            Da = !1;
            ya = pa = null;
            Na = !1;
            hd = gd = fd = ed = dd = cd = Kb = kc = Jb = null;
            ab = "";
            zb.find(".hap-btn-sort-alpha-up").hide();
            zb.find(".hap-btn-sort-alpha-down").show();
            be.val("");
            Qb.hide();
            Uc = Vc = null;
            sc = [];
            Qa.css("backgroundImage", "none").css("opacity", 0);
            f(w).trigger("destroyPlaylist", {
                instance: w,
                instanceName: b.instanceName
            })
        }

        function jc() {
            Dd && he && (la[Ja].data.start = w.getCurrentTime());
            b.useStatistics && (sb ? 0 < vc && qb("hap_time_played", Ja) : (qb("hap_play_count", Ja), 60 > w.getCurrentTime() && qb("hap_skipped_first_minute", Ja)))
        }

        function ae() {
            if (!Z || !b.addResizeEvent) return !1;
            ma.hide();
            var a = H.width();
            a < b.playlistItemMultilineWidth ? S.addClass("hap-playlist-item-multiline") : S.removeClass("hap-playlist-item-multiline");
            if (b.breakPointArr) {
                var c, d = b.breakPointArr.length;
                for (c = 0; c < d; c++) {
                    var e = b.breakPointArr[c];
                    a < e ? H.addClass("hap-breakpoint-" + e.toString()) : H.removeClass("hap-breakpoint-" + e.toString())
                }
            }
            b.useWaveSeekbar && Ib && (a = Ha.width(), Pd.width = a, Qd.width = a, fb.width = a, Zb.fillStyle = b.waveBgColor, $b.fillStyle = b.waveProgressColor, b.waveBarWidth ? HAPUtils.drawBars(Zb, $b, fb, Ib.split(","), 0, a) : HAPUtils.drawWave(Zb, $b, fb, Ib.split(","), 0, a));
            Ka = b.useWaveSeekbar ? ic.width() : Gc.width();
            da && da.setSeekBarSize(Ka);
            xb && Fa && w.resizeRange()
        }

        function de() {
            I.title || I.artist ? (w.getTitle(I), uc.attr("title", w.getTitle(I, !0))) : uc.attr("title", "");
            I.title && Pe.html(I.title);
            I.artist && Qe.html(I.artist);
            I.description && H.find(".hap-player-desc").html(I.description);
            if ((!ie || !Oc) && Qa.length) {
                var a = I.thumb || I.thumbDefault;
                a ? Se(a) : "youtube" == Q && Qa.css("opacity", 1)
            }
        }

        function Se(a) {
            !nb || I.thumbIsBase64 || HAPUtils.relativePath(a) || (a = nb + a);
            "soundcloud" == I.origtype && b.soundCloudThumbQuality && (a = a.replace("large.jpg", b.soundCloudThumbQuality));
            a = encodeURI(a); - 1 < Qa.css("backgroundImage").indexOf(a) || (I.title ? Qa.attr("aria-label", I.title) : Qa.attr("aria-label", ""), ie ? (Qa.css("opacity", 0), setTimeout(function() {
                Qa.css("backgroundImage", "url(" + a + ")").css("opacity", 1)
            }, 300)) : Qa.css("backgroundImage", "url(" + a + ")").css("opacity", 1), ie = !0, (-1 < xa.indexOf("hap-metalic") || -1 < xa.indexOf("hap-poster")) && H.find(".hap-player-image").fadeOut(300, function() {
                f(this).css("backgroundImage", "url(" + a + ")").fadeIn(300)
            }))
        }

        function lf() {
            var a = I.title || "";
            a = "https://itunes.apple.com/search?type=jsonp&term==" + encodeURI(I.artist || "") + "-" + encodeURI(a) + "&media=music&limit=1";
            f.ajax({
                url: a,
                dataType: "jsonp"
            }).done(function(c) {
                if (c.results[0] && c.results[0].artworkUrl100) {
                    var d = Qa.width();
                    d = HAPUtils.closestNumber(b.artworkSize, d);
                    c = c.results[0].artworkUrl100.replace("100x100", d + "x" + d);
                    la[Ja].data.thumb = c;
                    Se(c)
                }
            }).fail(function(c, d, e) {
                console.log(c, d, e)
            })
        }

        function Ed(a) {
            if (sb) {
                var c = a.safeTitle ? a.safeTitle : a.path.replace(/['"\|]/g, "");
                a = null
            } else c = a.safeTitle || a.title || "", a = a.safeArtist || a.artist || "";
            return {
                title: c,
                artist: a
            }
        }

        function Le() {
            var a = Date.now() - ge;
            vc += 1;
            ge += 1E3;
            Tb = setTimeout(Le, Math.max(0, 1E3 - a))
        }

        function qb(a, c, d) {
            if ("file:" != window.location.protocol) {
                if ("hap_all_count" == a) var e = [{
                    name: "action",
                    value: a
                }, {
                    name: "data",
                    value: JSON.stringify(d)
                }];
                else if ("hap_play_count" == a) {
                    if (!la[c]) return;
                    e = la[c].data;
                    void 0 == Ma && void 0 != e.playlistId && (Ma = e.playlistId);
                    d = Ed(e);
                    e = [{
                        name: "action",
                        value: a
                    }, {
                        name: "percentToCountAsPlay",
                        value: b.percentToCountAsPlay
                    }, {
                        name: "playlist_id",
                        value: Ma
                    }, {
                        name: "player_id",
                        value: b.playerId
                    }, {
                        name: "media_id",
                        value: e.mediaId
                    }, {
                        name: "audio_url",
                        value: ka
                    }, {
                        name: "title",
                        value: d.title
                    }, {
                        name: "artist",
                        value: d.artist
                    }, {
                        name: "album",
                        value: e.album || null
                    }, {
                        name: "thumb",
                        value: e.thumb || e.thumbDefault || null
                    }, {
                        name: "currentTime",
                        value: P.currentTime
                    }, {
                        name: "duration",
                        value: P.duration
                    }, {
                        name: "countryData",
                        value: JSON.stringify(Te)
                    }]
                } else if ("hap_download_count" == a || "hap_like_count" == a || "hap_finish_count" == a) e = la[c].data, void 0 == Ma && void 0 != e.playlistId && (Ma = e.playlistId), d = Ed(e), e = [{
                    name: "action",
                    value: a
                }, {
                    name: "playlist_id",
                    value: Ma
                }, {
                    name: "player_id",
                    value: b.playerId
                }, {
                    name: "media_id",
                    value: e.mediaId
                }, {
                    name: "audio_url",
                    value: ka
                }, {
                    name: "title",
                    value: d.title
                }, {
                    name: "artist",
                    value: d.artist
                }, {
                    name: "album",
                    value: e.album || null
                }, {
                    name: "thumb",
                    value: e.thumb || e.thumbDefault || null
                }];
                else if ("hap_skipped_first_minute" == a) e = la[c].data, d = Ed(e), e = [{
                    name: "action",
                    value: a
                }, {
                    name: "playlist_id",
                    value: Ma
                }, {
                    name: "player_id",
                    value: b.playerId
                }, {
                    name: "media_id",
                    value: e.mediaId
                }, {
                    name: "audio_url",
                    value: ka
                }, {
                    name: "title",
                    value: d.title
                }, {
                    name: "artist",
                    value: d.artist
                }, {
                    name: "album",
                    value: e.album || null
                }, {
                    name: "thumb",
                    value: e.thumb || e.thumbDefault || null
                }];
                else if ("hap_time_played" == a) {
                    if (!la[c]) return;
                    e = la[c].data;
                    void 0 == Ma && void 0 != e.playlistId && (Ma = e.playlistId);
                    d = Ed(e);
                    e = [{
                        name: "action",
                        value: a
                    }, {
                        name: "playlist_id",
                        value: Ma
                    }, {
                        name: "player_id",
                        value: b.playerId
                    }, {
                        name: "media_id",
                        value: e.mediaId
                    }, {
                        name: "audio_url",
                        value: ka
                    }, {
                        name: "seconds_played",
                        value: vc
                    }, {
                        name: "title",
                        value: d.title
                    }, {
                        name: "artist",
                        value: d.artist || null
                    }, {
                        name: "album",
                        value: e.album || null
                    }, {
                        name: "thumb",
                        value: e.thumb || e.thumbDefault || ""
                    }]
                }
                d = b.ajax_url;
                console.log(e);
                f.ajax({
                    url: d,
                    type: "post",
                    data: e,
                    dataType: "json"
                }).done(function(g) {
                    if (b.usePlaylist && g && "-1" != g) {
                        var t = S.find('.hap-playlist-item[data-id="' + c + '"]');
                        if ("hap_like_count" == a && g.c_like) t.find(".hap-like-count span").html(HAPUtils.nFormatter(parseInt(g.c_like, 10), 1));
                        else if ("hap_download_count" == a && g.c_download) t.find(".hap-download-count span").html(HAPUtils.nFormatter(parseInt(g.c_download, 10), 1));
                        else if ("hap_play_count" == a && g.c_play) t.find(".hap-play-count span").html(HAPUtils.nFormatter(parseInt(g.c_play, 10), 1));
                        else if ("hap_all_count" == a) {
                            var F = g.length,
                                O;
                            for (t = 0; t < F; t++) {
                                var V = g[t];
                                V.title && V.artist && V.media_id ? O = S.find('.hap-playlist-item[data-media-id="' + V.media_id + '"][data-safe-title="' + V.title + '"][data-safe-artist="' + V.artist + '"]') : V.title && V.artist ? O = S.find('.hap-playlist-item[data-safe-title="' + V.title + '"][data-safe-artist="' + V.artist + '"]') : V.title ? O = S.find('.hap-playlist-item[data-media-id="' + V.media_id + '"][data-safe-title="' + V.title + '"]') : V.artist && (O = S.find('.hap-playlist-item[data-media-id="' + V.media_id + '"][data-safe-artist="' + V.artist + '"]'));
                                O.find(".hap-like-count span").html(HAPUtils.nFormatter(parseInt(V.c_like, 10), 1));
                                O.find(".hap-download-count span").html(HAPUtils.nFormatter(parseInt(V.c_download, 10), 1));
                                O.find(".hap-play-count span").html(HAPUtils.nFormatter(parseInt(V.c_play, 10), 1))
                            }
                        }
                    }
                }).fail(function(g, t, F) {
                    console.log("Error getStats: " + g.responseText, t, F)
                })
            }
        }

        function Ne(a) {
            Vb.find(".hap-btn").hide();
            a ? Vb.find(".hap-btn-pause").show() : Vb.find(".hap-btn-play").show()
        }

        function ud() {
            La.show();
            Da = !0;
            va && va.css("opacity", 0);
            f.ajax({
                url: b.ajax_url,
                type: "post",
                data: [{
                    name: "action",
                    value: "hap_add_more"
                }, {
                    name: "playlist_id",
                    value: Ma
                }, {
                    name: "addMoreOffset",
                    value: Kb
                }, {
                    name: "addMoreLimit",
                    value: Jb
                }, {
                    name: "addMoreSortOrder",
                    value: cd
                }, {
                    name: "addMoreSortDirection",
                    value: dd
                }, {
                    name: "encryptMediaPaths",
                    value: b.encryptMediaPaths
                }, {
                    name: "taxonomy",
                    value: ed
                }, {
                    name: "category",
                    value: fd
                }, {
                    name: "tag",
                    value: gd
                }, {
                    name: "match",
                    value: hd
                }],
                dataType: "json"
            }).done(function(a) {
                console.log(a);
                aa && void 0 != aa.attr("data-add-more-offset") && (Kb = parseInt(aa.attr("data-add-more-offset"), 10) + Jb, aa.attr("data-add-more-offset", Kb));
                w.addTrack(a)
            }).fail(function(a, c, d) {
                console.log(a, c, d);
                w.endLoadMore()
            })
        }

        function mf() {
            La.show();
            Da = !0;
            var a = [{
                name: "action",
                value: "hap_paginate"
            }, {
                name: "playlist_id",
                value: Ma
            }, {
                name: "addMoreOffset",
                value: Kb
            }, {
                name: "addMoreLimit",
                value: Jb
            }, {
                name: "addMoreSortOrder",
                value: cd
            }, {
                name: "addMoreSortDirection",
                value: dd
            }, {
                name: "encryptMediaPaths",
                value: b.encryptMediaPaths
            }, {
                name: "taxonomy",
                value: ed
            }, {
                name: "category",
                value: fd
            }, {
                name: "tag",
                value: gd
            }, {
                name: "match",
                value: hd
            }];
            console.log(a);
            f.ajax({
                url: b.ajax_url,
                type: "post",
                data: a,
                dataType: "json"
            }).done(function(c) {
                console.log(c);
                S.find(".hap-playlist-item:visible").addClass("hap-pagination-hidden").each(function() {
                    f(this).find(".hap-thumbimg").removeClass("hap-visible")
                });
                w.addTrack(c);
                $d(Ua);
                He()
            }).fail(function(c, d, e) {
                console.log(c, d, e);
                w.endLoadMore()
            })
        }

        function He() {
            sc[Ua].page = Ua;
            var a = [];
            S.find(".hap-playlist-item:not(.hap-pagination-hidden)").each(function() {
                a.push(f(this))
            });
            sc[Ua].media_id = a
        }

        function $d(a) {
            a += 1;
            var c = '<div class="hap-pagination-container">';
            1 < a && (c += '<div class="hap-pagination-page hap-pagination-prev" data-page-id="prev" title="' + b.paginationPreviousBtnTitle + '">' + b.paginationPreviousBtnText + "</div>");
            3 < a && (c += '<div class="hap-pagination-page hap-pagination-start" data-page-id="0">1</div><div class="hap-pagination-dots">...</div>');
            if (0 < a - 2) {
                var d = a - 2;
                c += '<div class="hap-pagination-page" data-page-id="' + (d - 1) + '">' + d + "</div>"
            }
            0 < a - 1 && (d = a - 1, c += '<div class="hap-pagination-page" data-page-id="' + (d - 1) + '">' + d + "</div>");
            d = a;
            c += '<div class="hap-pagination-page hap-pagination-currentpage" data-page-id="' + (d - 1) + '">' + d + "</div>";
            a + 1 < ec + 1 && (d = a + 1, c += '<div class="hap-pagination-page" data-page-id="' + (d - 1) + '">' + d + "</div>");
            a + 2 < ec + 1 && (d = a + 2, c += '<div class="hap-pagination-page" data-page-id="' + (d - 1) + '">' + d + "</div>");
            a < ec - 2 && (d = ec, c += '<div class="hap-pagination-dots">...</div><div class="hap-pagination-page hap-pagination-end" data-page-id="' + (d - 1) + '">' + d + "</div>");
            a < ec && (c += '<div class="hap-pagination-page hap-pagination-next" data-page-id="next" title="' + b.paginationNextBtnTitle + '">' + b.paginationNextBtnText + "</div>");
            c += "</div>";
            Uc ? Uc.html(c) : H.append('<div class="hap-pagination-wrap">' + c + "</div>");
            Ue || (Ue = !0, Uc = H.find(".hap-pagination-wrap").on("click", ".hap-pagination-page:not(.hap-pagination-currentpage)", function() {
                if (!Z || ta || Da) return !1;
                Da = !0;
                Vc && Vc.removeClass("hap-pagination-currentpage");
                Vc = f(this).addClass("hap-pagination-currentpage");
                var e = f(this).attr("data-page-id");
                Ua = "prev" == e ? Ua - 1 : "next" == e ? Ua + 1 : parseInt(e, 10);
                null == sc[Ua].page ? (Kb = Ua * Jb, mf()) : (S.find(".hap-playlist-item:visible").addClass("hap-pagination-hidden").each(function() {
                    f(this).find(".hap-thumbimg").removeClass("hap-visible")
                }), f(sc[Ua].media_id).each(function() {
                    var g = f(this).removeClass("hap-pagination-hidden").find(".hap-thumbimg").removeClass("hap-visible");
                    setTimeout(function() {
                        g.addClass("hap-visible")
                    }, 20)
                }), $d(Ua), Da = !1)
            }), Vc = Uc.find(".hap-pagination-currentpage"))
        }

        function Me() {
            b.hidePlayerUntilMusicStart && (b.hidePlayerUntilMusicStart = !1, vd.removeClass("hap-music-player-force-hidden"), ae(), -1 < xa.indexOf("hap-fixed") && Ie(), setTimeout(function() {
                vd.css("opacity", 1)
            }, 50))
        }

        function Ie() {
            -1 < xa.indexOf("hap-fixed") && (fc.on("click", function() {
                b.playerOpened ? (H.stop().animate({
                    bottom: -H.height() + "px"
                }, {
                    duration: 400,
                    complete: function() {
                        fc.find(".hap-btn").hide();
                        fc.find(".hap-btn-player-open").show();
                        0 < Y && Q && Vb.show()
                    }
                }), b.playlistOpened = !1) : (H.stop().animate({
                    bottom: -Ya.height() + "px"
                }, {
                    duration: 400
                }), fc.find(".hap-btn").hide(), fc.find(".hap-btn-player-close").show(), Vb.hide());
                b.playerOpened = !b.playerOpened
            }), Vb.on("click", function(a) {
                w.togglePlayback()
            }), Vb.find(".hap-btn-play").show(), H.hasClass("hap-fixed-inited") || (H.addClass("hap-fixed-inited"), setTimeout(function() {
                b.playerOpened ? (b.playlistOpened ? H.css({
                    bottom: "0px"
                }) : H.css({
                    bottom: -Ya.height() + "px"
                }), fc.find(".hap-btn-player-close").show()) : (b.playlistOpened = !1, H.css({
                    bottom: -H.height() + "px"
                }), fc.find(".hap-btn-player-open").show(), 0 < Y && Q && Vb.show())
            }, 20)))
        }
        b = f.extend(!0, {}, {
            sharemanager_js: "js/sharemanager.js",
            perfectScrollbar_js: "js/perfect-scrollbar.min.js",
            mCustomScrollbar_js: "js/jquery.mCustomScrollbar.concat.min.js",
            mediaId: null,
            mediaTitle: null,
            resumeTime: null,
            sourcePath: "",
            instanceName: "",
            queryInstance: "",
            playlistItemContent: "",
            playlistTitleOrder: "title,artist",
            statisticsContent: "plays,likes,downloads",
            dataInterval: 250,
            volume: .5,
            activeItem: 0,
            numberTitleSeparator: ".&nbsp;",
            artistTitleSeparator: "&nbsp;-&nbsp;",
            useNumbersInPlaylist: !1,
            preload: "auto",
            autoPlay: !1,
            loopState: "playlist",
            playbackRate: 1,
            addResizeEvent: !0,
            addPlaylistEvents: !0,
            sortableTracksSet: !1,
            togglePlaybackOnPlaylistItem: !0,
            pauseAudioDuringAds: !0,
            randomPlay: !1,
            usePlaylist: !0,
            waveOptions: {
                barHeight: 1,
                halfPixel: .5,
                barGap: 5,
                barMinHeight: null,
                normalize: !1,
                partialRender: !1,
                pixelRatio: 1
            },
            playlistScrollType: "mcustomscrollbar",
            useVideoControls: !1,
            usePlaylistScroll: !1,
            useKeyboardNavigationForPlayback: !1,
            keyboardControls: [],
            togglePlaybackOnMultipleInstances: !0,
            useTitleScroll: !1,
            clearDialogCacheOnStart: !0,
            useSeekOnLyrics: !0,
            lyricsAutoOpen: !1,
            videoAutoOpen: !1,
            titleScrollSpeed: 1,
            titleScrollSeparator: " *** ",
            continousKey: "hap-continous-key",
            lyricsAutoScroll: !0,
            useMediaSession: !0,
            createDownloadIconsInPlaylist: !1,
            createLinkIconsInPlaylist: !1,
            limitDescriptionReadMoreText: "Read more",
            limitDescriptionReadLessText: "Read less",
            scak: "4e6c7139ca2791a89863367ba374a28e r4wruADPCq7iqJomagvYpdehvILa2bgE b972bf0e059078490e8579b43bf95923 64c56d14d1844681f7cca8c61ec0082a 86b6a66bb2d863f5d64dd8a91cd8de94 8da368dc752f739dcf6e4abb8317548d b4bee2a55625cf4ab8e3f7ea1d35e103 0aff03b3b79c2ac02fd2283b300735bd".split(" "),
            useShare: !0,
            percentToCountAsPlay: 25,
            scrollToPlayer: 0,
            linkIconTitle: "Purchase",
            downloadIconTitle: "Download",
            tooltipStatPlays: "Plays",
            tooltipStatLikes: "Likes",
            tooltipStatDownloads: "Downloads",
            artworkSize: [100, 200, 250, 340, 460, 600],
            soundCloudThumbQuality: "t300x300.jpg",
            playbackRateMin: .5,
            playbackRateMax: 2,
            sortOrder: "",
            modifierKey: "",
            getId3Image: !0,
            useContinousPlayback: !1,
            playlistItemMultilineWidth: 600,
            searchDescriptionInPlaylist: !0,
            hideYoutubeAfterStart: !1,
            getRadioArtwork: !0,
            defaultSongArtist: "DATA NOT AVAILABLE",
            defaultSongTitle: "DATA NOT AVAILABLE",
            lastPlayedInterval: 1E4,
            enableCors: !0,
            cors: "https://kastproxy-us.herokuapp.com/,https://kastproxy-eu.herokuapp.com/,https://cors-anywhere.herokuapp.com/,https://cors.io/?",
            useCorsForAudio: !1,
            seekTime: 10,
            paginationPreviousBtnTitle: "Previous",
            paginationPreviousBtnText: "Prev",
            paginationNextBtnTitle: "Next",
            paginationNextBtnText: "Next",
            whatsAppWarning: "Please share this content on mobile device!",
            downloadIcon: "<svg viewBox='0 0 512 512'><path d='M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'></path></svg>",
            linkIcon: "<svg viewBox='0 0 576 512'><path d='M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z'></path></svg>",
            statDownloadIcon: "<svg viewBox='0 0 512 512'><path d='M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z'></path></svg>",
            statLikeIcon: "<svg viewBox='0 0 512 512'><path d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'></path></svg>",
            statPlayIcon: "<svg viewBox='0 0 512 512'><path d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z'></path></svg>"
        }, b);
        var Cc = HAPUtils.getUrlParameter(),
            Dc = [],
            Kd = [],
            df = "type noapi video audio-preview path path version sid lyrics limit thumb thumb-small thumb-default thumb-alt title description artist album download duration date id3 start end link target rel load-more active-accordion".split(" ");
        Cc["hap-query-instance"] ? decodeURIComponent(Cc["hap-query-instance"]) == b.instanceName && A() : A();
        Cc = null;
        var H = f(this).css("display", "block"),
            vd = H.find(".hap-player-outer");
        b.hidePlayerUntilMusicStart && vd.addClass("hap-music-player-force-hidden");
        var xa = "";
        void 0 != H.attr("class") && (xa = H.attr("class").split(/\s+/));
        if (b.customClass)
            if (-1 < b.customClass.indexOf("|")) {
                var Ve = b.customClass.split(","),
                    Wb, je = Ve.length;
                for (Wb = 0; Wb < je; Wb++) {
                    var We = Ve[Wb].split("|");
                    H.find(We[0]).addClass(We[1])
                }
            } else H.addClass(b.customClass);
        b.markup && H.append(b.markup);
        var Td = f(b.playlistList),
            Ya = H.find(".hap-playlist-holder"),
            Wa = H.find(".hap-playlist-inner");
        H.find(".hap-playlist-inner-wrap");
        var S = H.find(".hap-playlist-content"),
            Qb = H.find(".hap-playlist-filter-msg"),
            zb = H.find(".hap-sort-alpha"),
            nf = H.find(".hap-popup-toggle"),
            Gc = H.find(".hap-progress-bg"),
            Ke = H.find(".hap-load-level"),
            $a = H.find(".hap-progress-level"),
            ic = H.find(".hap-seekbar-wave"),
            fe = H.find(".hap-seekbar-wave-progress");
        H.find(".hap-volume-toggle");
        H.find(".hap-volume-seekbar");
        H.find(".hap-volume-bg");
        H.find(".hap-volume-level");
        var Pa = H.find(".hap-lyrics-holder"),
            ke = H.find(".hap-lyrics-toggle"),
            vb = H.find(".hap-video-holder"),
            Cd = H.find(".hap-video-wrap"),
            le = H.find(".hap-video-toggle"),
            Fd = H.find(".hap-player-holder"),
            Qa = H.find(".hap-player-thumb").attr("role", "img"),
            Lc = H.find(".hap-share-holder"),
            Mc = H.find(".hap-playback-rate-holder"),
            of = H.find(".hap-playback-rate-toggle"),
            Pe = H.find(".hap-player-title"),
            Qe = H.find(".hap-player-artist"),
            Ce = H.find(".hap-playlist-main-title"),
            De = H.find(".hap-playlist-main-description"),
            tb = H.find(".hap-media-time-current"),
            hb = H.find(".hap-media-time-total"),
            Ub = H.find(".hap-media-time-ad"),
            eb = H.find(".hap-playback-toggle"),
            bc = H.find(".hap-loop-toggle"),
            lb = H.find(".hap-random-toggle"),
            me = H.find(".hap-range-toggle"),
            Xe = H.find(".hap-range-holder"),
            pf = H.find(".hap-share-toggle"),
            La = H.find(".hap-preloader"),
            Vb = H.find(".hap-playback-toggle-ex"),
            fc = H.find(".hap-player-toggle-ex"),
            Qc = HAPUtils.isMobile(),
            Ye = HAPUtils.hasLocalStorage(),
            Ca = b.autoPlay,
            Re = Ca,
            Ta = b.playlistItemContent.replace(/\s+/g, "").split(","),
            ff = b.playlistTitleOrder.replace(/\s+/g, "").split(","),
            rd = b.statisticsContent ? b.statisticsContent.replace(/\s+/g, "").split(",") : "",
            Dd = b.useContinousPlayback && Ye,
            he = Dd && b.continousPlaybackTrackAllSongs,
            yd = b.useMediaSession && "mediaSession" in navigator && "file:" != window.location.protocol,
            Bd = b.useGa && b.gaTrackingId,
            ab = b.sortOrder,
            qf = b.fetchPlayerArtwork && Qa.length;
        b.playlistContent && (S = f(b.playlistContent));
        var w = this,
            Z, ta;
        f("body");
        var Be = f(window),
            Gb = f(document),
            ne, Ee = HAPUtils.hasDownloadSupport(),
            Hc = HAPUtils.isIOS();
        HAPUtils.isAndroid();
        var gf = HAPUtils.canPlayMp3(),
            jf = HAPUtils.canPlayWav(),
            hf = HAPUtils.canPlayAac(),
            kf = HAPUtils.canPlayFlac();
        HAPUtils.isChrome();
        HAPUtils.isSafari();
        var ef = b.sourcePath + "includes/ba-simple-proxy.php",
            Nc = ["playlist", "single", "off"],
            cc = Nc.indexOf(b.loopState),
            Ze = ["audio", "hls", "shoutcast", "icecast", "radiojar"],
            rf = "audio youtube_single hls shoutcast icecast radiojar".split(" "),
            nb, Ue, Vc, Uc, ec, Ua, sc = [],
            xd, rb, Ia, Ab, uc = f(document.createElement("audio")).attr("preload", b.preload),
            P = uc[0],
            zd, mb, Jb, kc, Kb, cd, dd, ed, fd, gd, hd, ra, Gd, Eb, pa, Da, ya, Na, Vd, Ud, Ea, bb = [],
            Db, ce, Je, tc, ee, Tb, ge, vc = 0,
            da, Ic, kd = !0,
            oe, pe, ub, Ad, Tc, Ld, ob, Xb, ba, we, Ra, Nd, Zc, ye, xe, Sc, Rd, ie, Oc, lc, mc, id, nc, oc, ld, pc, rc, gb, Ob, sd, Lb = -1,
            pd, la = [],
            Xd = [],
            ia = [],
            ua = [],
            aa, Y = 0,
            jd = null,
            wd, dc, Ma, wa, Hb, Q, sb, ka, Ja, ib = !1,
            td, Te, I, ze = b.dataInterval,
            Fb, yb, Ka, Yb = HAPUtils.getEvents(),
            qe = .5,
            Sb, Zd, ac, od, Ge, Oa, Jc, Kc = [],
            Wd, Od, wc, Ib, fb = b.waveOptions;
        fb.waveColor = b.waveBgColor;
        fb.progressColor = b.waveProgressColor;
        fb.barWidth = b.waveBarWidth;
        fb.barRadius = b.waveBarRadius; - 1 < xa.indexOf("hap-grid") || -1 < xa.indexOf("hap-wall") ? S.addClass("hap-playlist-grid") : S.addClass("hap-playlist-default");
        b.viewSongWithoutAdsForLoggedInUser && b.isUserLoggedIn && (kd = !1);
        b.currentUserRoles && (pe = b.currentUserRoles.split(","));
        b.viewSongWithoutAdsUserRoles && (oe = b.viewSongWithoutAdsUserRoles.replace(/\s+/g, "").split(","));
        pe && oe && (kd = !HAPUtils.arrayContainsAnotherArray(oe, pe));
        b.useInlineSeekbar && (wc = f('<div class="hap-inline-seekbar-bg"><div class="hap-inline-seekbar-progress"></div></div>'));
        b.soundCloudAppId && !HAPUtils.isEmpty(b.soundCloudAppId) && (b.scak = b.soundCloudAppId.split(",").map(function(a) {
            return a.trim()
        }));
        if (b.useFixedPlayer) {
            if (window.hap_fixedPlayer) var Ga = window.hap_fixedPlayer;
            else Ga = new HAPFixedPlayer({
                settings: b,
                wrapper: H
            }), window.hap_fixedPlayer = Ga;
            f(Ga).on("HAPFixedPlayer.SET_PROGRESS_START", function(a, c) {
                c.inst == b.instanceName && (Od = yb = !0)
            });
            f(Ga).on("HAPFixedPlayer.SET_PROGRESS", function(a, c) {
                c.inst == b.instanceName && (G(c.point, c.update, !0), c.update && (Od = yb = !1))
            });
            f(Ga).on("HAPFixedPlayer.VOLUME_CHANGE", function(a, c) {
                c.inst == b.instanceName && (b.volume = c.volume, w.setVolume(c.volume))
            });
            f(Ga).on("HAPFixedPlayer.TOGGLE_MUTE", function(a, c) {
                c.inst == b.instanceName && w.toggleMute()
            });
            f(Ga).on("HAPFixedPlayer.PREVIOUS_MEDIA", function(a, c) {
                c.inst == b.instanceName && w.previousMedia()
            });
            f(Ga).on("HAPFixedPlayer.NEXT_MEDIA", function(a, c) {
                c.inst == b.instanceName && w.nextMedia()
            });
            f(Ga).on("HAPFixedPlayer.TOGGLE_PLAYBACK", function(a, c) {
                c.inst == b.instanceName && w.togglePlayback()
            });
            f(Ga).on("HAPFixedPlayer.LYRICS_TOGGLE", function(a, c) {
                c.inst == b.instanceName && w.toggleLyrics()
            })
        } - 1 == Ta.indexOf("description") && (b.searchDescriptionInPlaylist = !1);
        "undefined" === typeof window.hap_mediaArr && (window.hap_mediaArr = []);
        window.hap_mediaArr.push({
            inst: w,
            id: b.instanceName
        });
        Qc && (Ca = !1);
        b.autoPlayAfterFirst && (Ca = !1, Re = !0);
        0 > b.volume ? b.volume = 0 : 1 < b.volume && (b.volume = 1);
        0 != b.volume && (qe = b.volume); - 1 == cc && (b.loopState = "off");
        cc = Nc.indexOf(b.loopState);
        bc.find(".hap-btn-loop-" + b.loopState).show();
        b.randomPlay ? lb.find(".hap-btn-random-on").show() : lb.find(".hap-btn-random-off").show();
        if (b.playlistSelector) f(b.playlistSelector).on("change", function() {
            w.loadPlaylist(f(this).val())
        });
        b.breakPointArr && "string" === typeof b.breakPointArr && (b.breakPointArr = b.breakPointArr.split(","), HAPUtils.sortNumericArray(b.breakPointArr));
        0 == S.length && (b.usePlaylist = !1, b.usePlaylistScroll = !1, b.useNumbersInPlaylist = !1);
        zb.find(".hap-btn-sort-alpha-down").show();
        eb.find(".hap-btn-play").show();
        b.sortableTracks && !b.sortableTracksSet && setSortableTracks();
        if (b.scrollToPlayer && !b.isPopup) {
            delete b.scrollToPlayer;
            var sf = H.offset().top;
            f("html,body").animate({
                scrollTop: sf
            }, 500)
        }
        var va = H.find(".hap-load-more-btn").on("click", function() {
                if (!Z || Da) return !1;
                Na ? w.loadMore() : mb && ud();
                va && va.css("opacity", 0)
            }),
            Hd = [];
        Pa.length && Hd.push({
            element: "lyrics",
            itemHandle: Pa.find(".hap-dialog-header-drag")[0],
            itemResizeHandle: Pa.find(".hap-dialog-resizable")[0],
            itemResizeMinW: parseInt(Pa.css("min-width"), 10),
            itemResizeMinH: parseInt(Pa.css("min-height"), 10),
            itemDialog: Pa[0]
        });
        vb.length && Hd.push({
            element: "video",
            itemHandle: vb.find(".hap-dialog-header-drag")[0],
            itemResizeHandle: vb.find(".hap-dialog-resizable")[0],
            itemResizeMinW: parseInt(vb.css("min-width"), 10),
            itemResizeMinH: parseInt(vb.css("min-height"), 10),
            itemDialog: vb[0]
        });
        Hd.length && (document.addEventListener("HAPDialog.LYRICS_AUTOSCROLL_CHANGE", function(a) {
            b.lyricsAutoScroll = a.detail;
            ub && ub.setAutoScroll(b.lyricsAutoScroll)
        }), new HAPDialog(H, Hd, b));
        this.toggleLyrics = function() {
            Tc ? Pa.one("transitionend", function() {
                Pa.css("display", "none");
                Tc = !1
            }).removeClass("hap-visible") : (Pa.css("display", "block"), setTimeout(function() {
                Pa.addClass("hap-visible");
                Tc = !0
            }, 20))
        };
        this.toggleVideo = function() {
            if (Gd) ra && ra.pause(), vb.one("transitionend", function() {
                vb.css("display", "none");
                Gd = !1
            }).removeClass("hap-visible");
            else if (vb.css("display", "block"), setTimeout(function() {
                    vb.addClass("hap-visible");
                    Gd = !0
                }, 20), ra && ib) {
                var a = ra.play();
                void 0 !== a && a.then(function() {
                    var c = w.getCurrentTime();
                    c && (ra.currentTime = c)
                })["catch"](function(c) {})
            }
        };
        Gb.on("click", "[data-time-marker]", function(a) {
            a.preventDefault();
            if (!Z || void 0 == f(this).attr("data-time-marker")) return !1;
            a = HAPUtils.hmsToSecondsOnly(f(this).attr("data-time-marker"));
            w.seek(a);
            ib || w.playMedia();
            a = H.offset().top;
            f("html,body").animate({
                scrollTop: a
            }, 500)
        });
        var be = b.searchSelector ? f(b.searchSelector) : H.find(".hap-search-filter"),
            re;
        be.on("keyup", function() {
            if (0 == Y) return !1;
            var a = f(this).val().toLowerCase(),
                c, d = 0;
            if (ac)
                if (b.allowOnlyOneOpenedAccordion) {
                    for (c = 0; c < Y; c++) {
                        var e = Sb.find(".hap-playlist-item").eq(c);
                        var g = "";
                        e.find(".hap-playlist-title").length && (g += e.find(".hap-playlist-title").html().toLowerCase());
                        e.find(".hap-playlist-artist").length && (g += e.find(".hap-playlist-artist").html().toLowerCase());
                        b.searchDescriptionInPlaylist && e.find(".hap-playlist-description").length && (g += e.find(".hap-playlist-description").html().toLowerCase()); - 1 < g.indexOf(a) ? e.show() : (e.hide(), d++)
                    }
                    d == Y ? Qb.show() : Qb.hide()
                } else {
                    d = Ya.find(".hap-accordion-item-opened");
                    d.find(".hap-accordion-item-content").each(function() {
                        "" == a ? f(this).removeClass("hap-accordion-item-content-search") : f(this).addClass("hap-accordion-item-content-search")
                    });
                    var t = d.find(".hap-playlist-item").length;
                    for (c = 0; c < t; c++) e = d.find(".hap-playlist-item").eq(c), g = "", e.find(".hap-playlist-title").length && (g += e.find(".hap-playlist-title").html().toLowerCase()), e.find(".hap-playlist-artist").length && (g += e.find(".hap-playlist-artist").html().toLowerCase()), b.searchDescriptionInPlaylist && e.find(".hap-playlist-description").length && (g += e.find(".hap-playlist-description").html().toLowerCase()), -1 < g.indexOf(a) ? e.show() : e.hide()
                } else {
                for (c = 0; c < Y; c++) e = S.find(".hap-playlist-item").eq(c), g = "", e.find(".hap-playlist-title").length && (g += e.find(".hap-playlist-title").html().toLowerCase()), e.find(".hap-playlist-artist").length && (g += e.find(".hap-playlist-artist").html().toLowerCase()), b.searchDescriptionInPlaylist && e.find(".hap-playlist-description").length && (g += e.find(".hap-playlist-description").html().toLowerCase()), -1 < g.indexOf(a) ? e.removeClass("hap-filter-hidden").show() : (e.addClass("hap-filter-hidden").hide(), d++);
                d == Y ? (Qb.show(), re = !1, va && va.addClass("hap-force-hidden")) : (Qb.hide(), re = !0, va && va.removeClass("hap-force-hidden"))
            }
        });
        if (b.useShare)
            if ("undefined" === typeof HAPShareManager) {
                var yc = document.createElement("script");
                yc.type = "text/javascript";
                yc.src = HAPUtils.qualifyURL(b.sourcePath + b.sharemanager_js);
                yc.onload = yc.onreadystatechange = function() {
                    this.readyState && "complete" != this.readyState || (Sd = new HAPShareManager(b))
                };
                yc.onerror = function() {
                    alert("Error loading " + this.src)
                };
                var $e = document.getElementsByTagName("script")[0];
                $e.parentNode.insertBefore(yc, $e)
            } else var Sd = new HAPShareManager(b);
        var ha = new HAPPlaylistManager({
            loop: b.loopState,
            random: b.randomPlay
        });
        f(ha).on("HAPPlaylistManager.COUNTER_READY", function(a, c) {
            Q && xc();
            Ja = c;
            I = la[Ja].data;
            I.type || (I = X(I), la[Ja].data = I);
            console.log(I);
            Q = I.type;
            "youtube_single" == Q && (Q = "youtube");
            sb = "shoutcast" == Q || "icecast" == Q || "radiojar" == Q ? !0 : !1;
            if (td) td = !1;
            else {
                if (I.lyrics && Pa.length) {
                    if (!ub) {
                        Ad = !1;
                        if (b.lyricsWrap && b.lyricsContainer) var d = f(b.lyricsWrap)[0],
                            e = f(b.lyricsContainer)[0];
                        else d = Pa.find(".hap-lyrics-wrap")[0], e = Pa.find(".hap-lyrics-container")[0];
                        ub = new HAPLyrics({
                            wrapContainer: d,
                            scrollContainer: e,
                            settings: b,
                            itemClass: "hap-lyrics-item",
                            activeClass: "hap-lyrics-item-active"
                        });
                        document.addEventListener("HAPLyrics.LYRICS_CLICKED", function(F) {
                            if (da && da.isAdOn() && b.pauseAudioDuringAds) return !1;
                            w.seek(F.detail);
                            w.playMedia()
                        });
                        document.addEventListener("HAPLyrics.LYRICS_READY", function(F) {
                            F.detail && (I.lyricsContent = F.detail);
                            Ad = !0;
                            b.lyricsAutoOpen && (Tc || w.toggleLyrics())
                        })
                    }
                    I.lyricsContent ? ub.setData(I.lyricsContent) : ub.load(I.lyrics);
                    ke.show()
                } else ke.hide();
                if (I.video && Cd.length) {
                    d = " nofullscreen";
                    b.useVideoFullscreen && (d = "");
                    e = " disablepictureinpicture";
                    b.useVideoPictureInPicture && (e = "");
                    var g = " nodownload";
                    b.useVideoDownload && (g = "");
                    var t = "";
                    b.useVideoControls && (t = " controls");
                    d = '<video class="hap-video" preload="' + b.preload + '" muted playsinline' + e + ' controlsList="noremoteplayback' + g + d + t + '">';
                    d += '<source src="' + I.video + '" />';
                    d += "</video>";
                    b.useVideoControls || (d += '<div class="hap-video-blocker"></div>');
                    Cd.html(d);
                    ra = Cd.find(".hap-video")[0];
                    ra.addEventListener("canplay", function() {
                        if (b.playbackRate) try {
                            ra.playbackRate = Number(b.playbackRate)
                        } catch (F) {}
                    });
                    b.useVideoControls && (ra.addEventListener("play", function() {
                        Eb = !0;
                        w.playMedia()
                    }), ra.addEventListener("pause", function() {
                        Eb = !0;
                        w.pauseMedia()
                    }), ra.addEventListener("seeked", function() {
                        Eb = !0;
                        w.seek(ra.currentTime)
                    }));
                    b.videoAutoOpen && (Gd || w.toggleVideo());
                    le.show()
                } else le.hide();
                b.useWaveSeekbar && I.peaks && z();
                sb ? (me.hide(), Ha.hide(), tb.hide(), hb.hide()) : (me.show(), Ha.show(), tb.show(), hb.show(), de(), yd && y());
                if (he && b.lastPositionArr)
                    for (e = b.lastPositionArr.length, d = 0; d < e; d++)
                        if (g = b.lastPositionArr[d], g.title && I.title == g.title && I.artist == g.artist) {
                            I.start = g.start;
                            break
                        }
                T(Ja);
                b.useInlineSeekbar && wa.find(".hap-playlist-thumb").append(wc);
                I.thumb || I.thumbDefault || !qf || lf();
                if (I.adPre || I.adMid || I.adEnd) da ? da.setAdData(I) : ("undefined" === typeof HAPAdManager && console.log("link to admanager.js file missing in head tag!"), da = new HAPAdManager(b, w, I, P, Gc, $a, Ub, Ka), f(da).on("HAPAdManager.IOS_ADMID_FIX_START", function(F, O) {
                    Ic = !0
                }).on("HAPAdManager.ADPRE_PLAY", function(F, O) {
                    $a.addClass("hap-ad-progress-level");
                    tb.hide();
                    hb.hide();
                    Ub.show()
                }).on("HAPAdManager.ADPRE_ENDED", function(F, O) {
                    $a.removeClass("hap-ad-progress-level");
                    Ub.hide();
                    "shoutcast" != Q && "icecast" != Q && "radiojar" != Q && (tb.show(), hb.show());
                    "youtube" == Q ? h() : fa()
                }).on("HAPAdManager.ADMID_PLAY", function(F, O) {
                    w.pauseMedia();
                    $a.addClass("hap-ad-progress-level");
                    tb.hide();
                    hb.hide();
                    Ub.show()
                }).on("HAPAdManager.ADMID_ENDED", function(F, O) {
                    $a.removeClass("hap-ad-progress-level");
                    Ub.hide();
                    "shoutcast" != Q && "icecast" != Q && "radiojar" != Q && (tb.show(), hb.show());
                    w.playMedia()
                }).on("HAPAdManager.ADEND_PLAY", function(F, O) {
                    $a.addClass("hap-ad-progress-level");
                    tb.hide();
                    hb.hide();
                    Ub.show()
                }).on("HAPAdManager.ADEND_ENDED", function(F, O) {
                    $a.removeClass("hap-ad-progress-level");
                    Ub.hide();
                    "shoutcast" != Q && "icecast" != Q && "radiojar" != Q && (tb.show(), hb.hide());
                    b.stopOnSongEnd || Oe(!0)
                }));
                I.adPre ? (da.initAdPre(), Ca = !0, P.volume = b.volume, d = P.play(), void 0 !== d && d.then(function() {})["catch"](function(F) {})) : "youtube" == Q ? (h(), b.hidePlayerUntilMusicStart && Me()) : fa()
            }
        }).on("HAPPlaylistManager.PLAYLIST_END", function() {
            f(w).trigger("playlistEnd", {
                instance: w,
                instanceName: b.instanceName
            })
        });
        window.onYouTubeIframeAPIReady = function() {};
        Bd && (window.ga || function(a, c, d, e, g, t, F) {
            a.GoogleAnalyticsObject = g;
            a[g] = a[g] || function() {
                (a[g].q = a[g].q || []).push(arguments)
            };
            a[g].l = 1 * new Date;
            t = c.createElement(d);
            F = c.getElementsByTagName(d)[0];
            t.async = 1;
            t.src = e;
            F.parentNode.insertBefore(t, F)
        }(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"), ga("create", b.gaTrackingId, "auto"), ga("send", "pageview"), H.on("click", ".hap-download", function(a) {
            if (!Z) return !1;
            window.ga && (a = f(this).closest(".hap-playlist-item").find(".hap-playlist-title").html(), ga("send", {
                hitType: "event",
                eventCategory: "Modern audio player: " + b.instanceName,
                eventAction: "downloaded",
                eventLabel: "title: " + a,
                nonInteraction: !0
            }))
        }));
        Dd ? (window.attachEvent || window.addEventListener)(Hc ? "pagehide" : "beforeunload", function(a) {
            window.event && (window.event.cancelBubble = !0);
            if (!Z || !Q) return !1;
            a = {
                activePlaylist: b.activePlaylist,
                volume: b.volume,
                activeItem: ha.getCounter(),
                resumeTime: w.getCurrentTime(),
                autoPlay: ib
            };
            if (he) {
                var c, d = [];
                for (c = 0; c < Y; c++) {
                    var e = la[c].data;
                    e.start && d.push({
                        title: e.title,
                        artist: e.artist,
                        start: e.start
                    })
                }
                a.lastPositionArr = d
            }
            localStorage.setItem(b.continousKey, JSON.stringify(a))
        }) : localStorage.removeItem(b.continousKey);
        yd && (navigator.mediaSession.setActionHandler("play", function() {
            w.playMedia()
        }), navigator.mediaSession.setActionHandler("pause", function() {
            w.pauseMedia()
        }), navigator.mediaSession.setActionHandler("previoustrack", function() {
            w.previousMedia()
        }), navigator.mediaSession.setActionHandler("nexttrack", function() {
            w.nextMedia()
        }), navigator.mediaSession.setActionHandler("seekbackward", function() {
            w.seekBackward()
        }), navigator.mediaSession.setActionHandler("seekforward", function() {
            w.seekForward()
        }));
        var ma = H.find(".hap-tooltip");
        Qc || (ma.length && "static" == H.css("position") && console.log("player css position is static, therefore tooltip might not work correctly. Please set wrapper css position to other than static if you use tooltip in player."), H.on("mouseenter", "[data-tooltip]", function(a) {
            var c = f(this);
            a = H[0].getBoundingClientRect();
            var d = c[0].getBoundingClientRect();
            ma.text(c.attr("data-tooltip"));
            var e = parseInt(d.top - a.top - ma.outerHeight());
            c = parseInt(d.left - a.left - ma.outerWidth() / 2 + c.outerWidth() / 2);
            var g = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            0 > c + a.left ? c = parseInt(d.left - a.left + 15) : c + a.left + ma.outerWidth() > g && (c = parseInt(d.left + d.width - a.left - ma.outerWidth()));
            0 > e + a.top && (e = parseInt(d.top - a.top + ma.outerHeight() + 15));
            ma.css({
                left: c + "px",
                top: e + "px"
            }).show()
        }).on("mouseleave", "[data-tooltip]", function(a) {
            ma.hide()
        }));
        var Fc = H.find(".hap-circle-player").length,
            ad;
        Fc && HAPUtils.hasCanvas() && ("undefined" === typeof HAPCirclePlayer ? console.log("Link to circleplayer.js file missing in head tag!") : ad = new HAPCirclePlayer({
            settings: b,
            parent: H
        }));
        var Ha = Fc ? H.find(".hap-progress-canvas") : H.find(".hap-seekbar");
        Ha.on(Yb.downEvent, function(a) {
            if (b.disableSeekbarInRange && Fa || b.disableSeekbar || b.disableSongSkip || da && da.isAdOn() || !Q) return !1;
            D(a);
            return !1
        });
        ic.length && (b.useWaveSeekbar = !0);
        if (b.useWaveSeekbar) {
            var af = Ha.width(),
                bf = Ha.height(),
                zc = document.createElement("canvas");
            var Pd = zc;
            zc.width = af;
            zc.height = bf;
            zc.classList.add("hap-canvas-seekbar-bg");
            var Zb = zc.getContext("2d");
            Zb.fillStyle = b.waveBgColor;
            ic.prepend(zc);
            var Ac = document.createElement("canvas");
            var Qd = Ac;
            Ac.width = af;
            Ac.height = bf;
            Ac.classList.add("hap-canvas-seekbar-progress");
            var $b = Ac.getContext("2d");
            $b.fillStyle = b.waveProgressColor;
            fe.append(Ac)
        }
        if (!Qc) {
            var Id = function() {
                Ha.off(Yb.moveEvent, n).off("mouseout", Id);
                Gb.off("mouseout", Id);
                ma.hide()
            };
            Ha.on("mouseover", function() {
                if (!yb) {
                    if (da && da.isAdOn()) return !1;
                    Ha.on(Yb.moveEvent, n).on("mouseout", Id);
                    Gb.on("mouseout", Id)
                }
            })
        }
        var Jd = new HAPVolumeSlider({
            volume: b.volume,
            container: H,
            tooltip: ma
        });
        f(Jd).on("HAPVolumeSlider.VOLUME_CHANGE", function(a, c) {
            b.volume = c;
            w.setVolume(b.volume)
        });
        f(Jd).on("HAPVolumeSlider.TOGGLE_MUTE", function(a) {
            w.toggleMute()
        });
        var kb = H.find(".hap-range-handle-a"),
            wb = H.find(".hap-range-handle-b");
        parseInt(kb.attr("data-width"), 10);
        parseInt(wb.attr("data-width"), 10);
        var Sa, jb, Wc, Xc, Fa, Za, se = H.find(".hap-range-bg"),
            Va, te = H.find(".hap-range-level"),
            gc = H.find(".hap-range-min-time"),
            hc = H.find(".hap-range-max-time");
        w.toggleRange = function() {
            Q && (Fa ? (Xe.css("display", "none"), Za = !0) : (Xe.css("display", "block"), Va = se.width(), Wc = parseInt(kb.css("left"), 10), Xc = parseInt(wb.css("left"), 10), Sa = v(Wc), jb = v(Xc), Za = !1), Fa = !Fa)
        };
        w.resetRange = function() {
            Fa = !1;
            Za = !0;
            kb.css("left", 0);
            wb.css("left", Va);
            gc.html("00:00");
            hc.html("00:00")
        };
        w.setRange = function(a, c) {
            var d = w.getDuration();
            if ("undefined" === typeof d) return !1;
            0 > a && (a = 0);
            c > d && (c = d);
            Sa = a;
            jb = c;
            Za = !1;
            kb.css("left", Sa / d * Va);
            wb.css("left", jb / d * Va);
            gc.html(HAPUtils.formatTime(a));
            hc.html(HAPUtils.formatTime(c));
            d = parseInt(kb.css("left"), 10);
            var e = parseInt(wb.css("left"), 10);
            te.css({
                left: d,
                right: Va - e
            });
            Fa || w.toggleRange()
        };
        w.resizeRange = function() {
            var a = w.getDuration();
            if ("undefined" === typeof a || "undefined" === typeof Sa || "undefined" === typeof jb) return !1;
            Va = se.width();
            kb.css("left", Sa / a * Va);
            wb.css("left", jb / a * Va);
            gc.html(HAPUtils.formatTime(Sa));
            hc.html(HAPUtils.formatTime(jb));
            a = parseInt(kb.css("left"), 10);
            var c = parseInt(wb.css("left"), 10);
            te.css({
                left: a,
                right: Va - c
            })
        };
        w.getRange = function() {
            return "undefined" !== typeof Sa && "undefined" !== typeof jb ? [Sa, jb] : null
        };
        if (kb.length) {
            var xb = !0;
            var Yc = new HAPRangeSlider({
                settings: b,
                range_handle_a: kb,
                range_handle_b: wb
            });
            f(Yc).on("HAPRangeSlider.RANGE_CHANGE", function(a, c) {
                var d = c.point.pageX - se.offset().left,
                    e = c.elem;
                0 > d ? d = 0 : d > Va && (d = Va);
                e.hasClass("hap-range-handle-a") ? (d > parseInt(wb.css("left"), 10) - 3 && (d = parseInt(wb.css("left"), 10) - 3), Wc = d, Sa = v(Wc), gc.html(HAPUtils.formatTime(Sa))) : (d < parseInt(kb.css("left"), 10) + 4 && (d = parseInt(kb.css("left"), 10) + 4), Xc = d, jb = v(Xc), hc.html(HAPUtils.formatTime(jb)));
                te.css({
                    left: Wc,
                    right: Va - Xc
                });
                e.css("left", d)
            })
        }
        var ue = H.find(".hap-playback-rate-seekbar");
        H.find(".hap-playback-rate-min").html(b.playbackRateMin);
        H.find(".hap-playback-rate-max").html(b.playbackRateMax);
        if (ue.length) {
            var ve = new HAPPlaybackRateSlider({
                settings: b,
                wrapper: H,
                seekbar: ue,
                sliderBg: H.find(".hap-playback-rate-bg"),
                sliderLevel: H.find(".hap-playback-rate-level"),
                isVertical: ue.hasClass("hap-vertical"),
                tooltip: ma
            });
            f(ve).on("HAPPlaybackRateSlider.RANGE_CHANGE", function(a, c) {
                w.setPlaybackRate(c.value)
            })
        }
        if (b.disableRightClickOverPlayer) H.on("contextmenu", function() {
            return !1
        });
        if (b.useKeyboardNavigationForPlayback && b.keyboardControls.length)
            if (Array.isArray(b.keyboardControls) || (b.keyboardControls = b.keyboardControls.split(";")), b.useGlobalKeyboardControls) Gb.on("keydown.mvp", function(a) {
                return E(a)
            });
            else H.hover(function() {
                Gb.on("keydown", function(a) {
                    return E(a)
                })
            }, function() {
                Gb.off("keydown")
            });
        var cf = [H.find(".hap-next-toggle"), H.find(".hap-prev-toggle"), H.find(".hap-skip-forward"), H.find(".hap-skip-backward"), H.find(".hap-playlist-toggle"), H.find(".hap-playlist-close"), pf, H.find(".hap-share-close"), H.find(".hap-share-item"), H.find(".hap-playback-rate-close"), H.find(".hap-range-close"), H.find(".hap-lyrics-close"), H.find(".hap-video-close"), of, me, nf, zb, eb, bc, lb, ke, le];
        je = cf.length;
        for (Wb = 0; Wb < je; Wb++) f(cf[Wb]).css("cursor", "pointer").on("click", K);
        window.onbeforeunload = function(a) {
            b.useStatistics && Ja && (sb ? 0 < vc && qb("hap_time_played", Ja) : (qb("hap_play_count", Ja), 60 > w.getCurrentTime() && qb("hap_skipped_first_minute", Ja)))
        };
        if (b.addResizeEvent) Be.on("resize", function() {
            if (!Z) return !1;
            ne && clearTimeout(ne);
            ne = setTimeout(ae, 150)
        });
        this.getTitle = function(a, c) {
            if (a.artist && !HAPUtils.isEmpty(a.artist) && a.title && !HAPUtils.isEmpty(a.title)) var d = c ? a.artist + " - " + a.title : a.artist + b.artistTitleSeparator + a.title;
            else a.title && !HAPUtils.isEmpty(a.title) ? d = a.title : a.artist && !HAPUtils.isEmpty(a.artist) && (d = a.artist);
            return d
        };
        b.useStatistics && (fetch("https://extreme-ip-lookup.com/json/").then(function(a) {
            return a.json()
        }).then(function(a) {
            Te = a
        })["catch"](function(a, c) {
            console.log("country request failed")
        }), H.on("click", ".hap-like-count", function(a) {
            if (!Z || !Q) return !1;
            a = f(this).closest(".hap-playlist-item");
            qb("hap_like_count", a.attr("data-id"))
        }), H.on("click", ".hap-download-count:not(.hap-no-download)", function(a) {
            if (!Z || !Q) return !1;
            a = f(this).closest(".hap-playlist-item");
            qb("hap_download_count", a.attr("data-id"))
        }));
        this.playMedia = function() {
            if (!Z || !Q || ib) return !1;
            if ("youtube" == Q) ba && Ra && ba.playVideo();
            else if (P) {
                sb && P.load();
                var a = P.play();
                void 0 !== a && a.then(function() {})["catch"](function(c) {})
            }
        };
        this.pauseMedia = function() {
            if (!Z || !Q || !ib) return !1;
            "youtube" == Q ? ba && Ra && ba.pauseVideo() : P && P.pause()
        };
        this.togglePlayback = function() {
            if (!Z || !Q) return !1;
            da && da.clearAdMidTimeout();
            if (da && da.isAdMidOn()) da.toggleAdMidAudio();
            else if ("youtube" == Q) {
                if (ba && Ra) {
                    var a = ba.getPlayerState();
                    1 == a ? ba.pauseVideo() : 2 == a ? ba.playVideo() : (-1 == a || 5 == a || 0 == a) && ba.playVideo()
                }
            } else P && (P.paused ? (sb && P.load(), a = P.play(), void 0 !== a && a.then(function() {
                da && da.isAdPreOn() && (eb.find(".hap-btn-play").hide(), eb.find(".hap-btn-pause").show())
            })["catch"](function(c) {})) : (P.pause(), da && da.isAdPreOn() && (eb.find(".hap-btn-play").show(), eb.find(".hap-btn-pause").hide())))
        };
        this.nextMedia = function() {
            if (!Z || b.disableSongSkip) return !1;
            if (0 != Y)
                if (jc(), b.usePlaylist && re) {
                    var a = S.find(".hap-playlist-item-selected").nextAll(".hap-playlist-item:not(.hap-filter-hidden)").filter(":first");
                    a.length ? (a = a.attr("data-id"), ha.setCounter(a, !1)) : ha.advanceHandler(1, !0)
                } else ha.advanceHandler(1, !0)
        };
        this.previousMedia = function() {
            if (!Z || b.disableSongSkip) return !1;
            0 != Y && (jc(), ha.advanceHandler(-1, !0))
        };
        this.loadMedia = function(a, c, d, e) {
            if (!Z || ta) return !1;
            if (0 != Y) {
                console.log(a, c, d, e);
                var g = -1;
                if ("title" == a) {
                    for (a = 0; a < Y; a++)
                        if (c == la[a].data.title) {
                            g = a;
                            var t = !0;
                            break
                        }
                    if (!t) return alert('No media with title "' + c + '" to load! LoadMedia failed.'), !1
                } else if ("title-artist" == a) {
                    var F = S.find('.hap-playlist-item[data-title="' + d + '"][data-artist="' + e + '"]');
                    if (0 == F.length) return alert('No media with title "' + d + '" and artist "' + e + '" to load! LoadMedia failed.'), !1;
                    g = F.attr("data-id")
                } else if ("counter" == a) {
                    if (0 > c || c > Y - 1) return alert('Invalid track number. Track number  "' + c + '" doesnt exist. LoadMedia failed.'), !1;
                    g = c
                } else if ("id" == a) {
                    F = S.find(".hap-playlist-item[data-media-id=" + c + "]");
                    if (0 == F.length) return alert("No media with media ID " + c + " to load! LoadMedia failed."), !1;
                    g = F.attr("data-id")
                } else if ("id-title" == a) {
                    d && e ? F = S.find('.hap-playlist-item[data-media-id="' + c + '"][title="' + d + '"][data-artist="' + e + '"]') : d ? F = S.find('.hap-playlist-item[data-media-id="' + c + '"][title="' + d + '"]') : e && (F = S.find('.hap-playlist-item[data-media-id="' + c + '"][data-artist="' + e + '"]'));
                    if (0 == F.length) return alert("No media with media ID " + c + " to load! LoadMedia failed."), !1;
                    g = F.attr("data-id")
                } else return console.log("loadMedia function requires format parameter!"), !1;
                jc();
                Ca = !0;
                ha.processPlaylistRequest(g)
            }
        };
        this.loadMore = function() {
            console.log(ya);
            if (!Z || !ya || !pa || ta) return !1;
            ta = !0;
            La.show();
            Da = !0;
            ia = [];
            "soundcloud" == ya ? cb() : "podcast" == ya ? Nb() : "folder" == ya ? na() : "youtube" == ya && (ob || ca("youtube"), ob.resumeLoad(pa))
        };
        this.setLoadMore = function(a) {
            Na = a
        };
        this.endLoadMore = function() {
            ta = !1;
            La.hide();
            Da = !1
        };
        this.addMore = function() {
            if (!Z || ta) return !1;
            mb && (Da || ud())
        };
        this.setAddMore = function(a) {
            mb = a
        };
        this.processPlaylistRequest = function(a) {
            jc();
            Ca = !0;
            ha.processPlaylistRequest(a)
        };
        this.loadPlaylist = function(a, c) {
            if (!Z || ta) return !1;
            if ("string" === typeof a) {
                b.mediaId = c;
                if (b.activePlaylist == a) return !1;
                r(a)
            } else return alert("Invalid value loadPlaylist!"), !1
        };
        this.addTrack = function(a, c, d, e) {
            if (!Z || ta) return !1;
            if ("undefined" === typeof a) return alert("addTrack method requires track parameter. AddTrack failed."), !1;
            sd = !1;
            "undefined" !== typeof c && (sd = c, 0 == c && (td = !0));
            e ? (pd = !0, wd = !1) : pd = !1;
            Qb.hide();
            gb = d;
            rc = !1;
            Ob = !0;
            dc ? "undefined" !== typeof gb ? 0 > gb ? gb = 0 : (gb = Y, rc = !0) : (rc = !0, gb = Y) : (gb = 0, rc = !0);
            ta = !0;
            La.show();
            Lb = -1;
            ia = [];
            ua = [];
            Array.isArray(a) ? ua = a : ua.push(a);
            Y = ua.length;
            dc = S;
            pd ? (ia = ua, qa()) : q()
        };
        this.inputAudio = function(a) {
            if (!Z || ta) return !1;
            if ("undefined" === typeof a) return alert("inputAudio method requires data parameter. inputAudio failed."), !1;
            wa && R();
            0 < Y && ha.reSetCounter();
            I = a;
            Q = a.type;
            if (-1 == Ze.indexOf(Q)) return alert("inputAudio method supports tracks that dont require processing: " + Ze), !1;
            "shoutcast" != Q && "icecast" != Q && "radiojar" != Q && (de(), yd && y());
            Ca = !0;
            fa()
        };
        this.removeTrack = function(a, c) {
            if (!Z || ta) return !1;
            if (0 != Y) {
                if ("title" == a) {
                    var d;
                    for (d = 0; d < Y; d++)
                        if (c == la[d].data.title) {
                            var e = S.children(".hap-playlist-item").eq(d);
                            var g = !0;
                            break
                        }
                    if (!g) return alert('Track with title "' + c + '" doesnt exist. RemoveTrack failed.'), !1
                } else if ("counter" == a) {
                    c = parseInt(c, 10);
                    if (0 > c || c > Y - 1) return alert('Track number  "' + c + '" doesnt exist. RemoveTrack failed.'), !1;
                    e = S.find(".hap-playlist-item").eq(c)
                } else if ("id" == a) {
                    if (e = S.find(".hap-playlist-item[data-media-id=" + c + "]"), 0 == e.length) return alert('Track with media id "' + c + '" doesnt exist. RemoveTrack failed.'), !1
                } else return alert("removeTrack method failed."), !1;
                e.remove();
                la.splice(parseInt(e.attr("data-id"), 10), 1);
                Cb(!0);
                0 < Y ? (e = ha.getCounter(), c == e ? (xc(), ha.setPlaylistItems(Y)) : (ha.setPlaylistItems(Y, !1), c < e && ha.reSetCounter(ha.getCounter() - 1))) : bd()
            }
        };
        this.sort = function(a) {
            if (!Z || 3 > Y) return !1;
            if ("undefined" === typeof a) return console.log("Sort method requires order parameter. Sort method failed."), !1;
            if (ab == d) return !1;
            var c = S.children(".hap-playlist-item"),
                d = a.toLowerCase();
            if ("title-asc" == d) {
                HAPUtils.keysrt2(la, "data", "title");
                var e;
                a = [];
                for (e = 0; e < Y; e++) a.push(la[e].id);
                zb.find(".hap-btn-sort-alpha-up").hide();
                zb.find(".hap-btn-sort-alpha-down").show()
            } else if ("title-desc" == d) {
                HAPUtils.keysrt2(la, "data", "title", !0);
                a = [];
                for (e = 0; e < Y; e++) a.push(la[e].id);
                zb.find(".hap-btn-sort-alpha-up").show();
                zb.find(".hap-btn-sort-alpha-down").hide()
            } else if ("random" == d) a = HAPUtils.randomiseArray(Y), la = HAPUtils.sortArray(la, a);
            else {
                console.log("Unknown sort order. Sort method failed.");
                return
            }
            ab = d;
            d = Ja;
            S.append(f.map(a, function(g) {
                return c[g]
            })); - 1 != d && (d = S.children(".hap-playlist-item[data-id='" + d + "']").index(), ha.reSetCounter(d));
            Cb(!0)
        };
        this.destroyInstance = function() {
            bd();
            xc();
            b.usePlaylistScroll && ("mcustomscrollbar" == b.playlistScrollType ? "undefined" !== typeof mCustomScrollbar && Wa.mCustomScrollbar("destroy") : "perfect-scrollbar" == b.playlistScrollType && rb && (rb.destroy(), rb = null), Sc = !1)
        };
        this.destroyInstance2 = function() {
            xc();
            b.usePlaylistScroll && ("mcustomscrollbar" == b.playlistScrollType ? "undefined" !== typeof mCustomScrollbar && Wa.mCustomScrollbar("destroy") : "perfect-scrollbar" == b.playlistScrollType && rb && (rb.destroy(), rb = null), Sc = !1);
            b.sortableTracks && b.sortableTracksSet && (S.sortable("destroy"), b.sortableTracksSet = !1)
        };
        this.destroyMedia = function() {
            if (!Z) return !1;
            Z && Q && (wa && R(), xc(), ha.reSetCounter())
        };
        this.destroyPlaylist = function() {
            if (!Z) return !1;
            bd()
        };
        this.setPlaybackRate = function(a) {
            if (!Z || !Q) return !1;
            b.playbackRate = a;
            ve && ve.setVisual(a);
            if ("youtube" == Q) ba.setPlaybackRate(Number(a));
            else if (P) try {
                P.playbackRate = Number(a)
            } catch (c) {}
            if (ra) try {
                ra.playbackRate = Number(a)
            } catch (c) {}
        };
        this.toggleRandom = function(a) {
            if (!Z || "undefined" === typeof ha) return !1;
            b.randomPlay = "undefined" !== typeof a ? a : !b.randomPlay;
            ha.setRandom(b.randomPlay);
            lb.find(".hap-btn").hide();
            b.randomPlay ? lb.find(".hap-btn-random-on").show() : lb.find(".hap-btn-random-off").show()
        };
        this.setLoop = function(a) {
            if (!Z || "undefined" === typeof ha) return !1;
            bc.find(".hap-btn").hide();
            b.loopState = a;
            cc = Nc.indexOf(b.loopState);
            bc.find(".hap-btn-loop-" + b.loopState).show();
            ha.setLooping(b.loopState)
        };
        this.getVolume = function() {
            return b.volume
        };
        this.setVolume = function(a) {
            if (!Z) return !1;
            0 > a ? a = 0 : 1 < a && (a = 1);
            b.volume = a;
            da && da.setVolume(b.volume);
            "youtube" == Q ? ba && Ra && ba.setVolume(100 * b.volume) : P && (P.volume = b.volume, P.muted = 0 == b.volume ? !0 : !1);
            Jd && Jd.setVisual(b.volume);
            b.useFixedPlayer && window.hap_fixed_active_player == b.instanceName && Ga.setVisual(b.volume)
        };
        this.toggleMute = function() {
            if (!Z) return !1;
            0 < b.volume ? (qe = b.volume, b.volume = 0) : b.volume = qe;
            w.setVolume(b.volume)
        };
        this.setAutoPlay = function(a) {
            Ca = a
        };
        this.seek = function(a) {
            if (!Z || !Q || b.disableSeekbarInRange && Fa || b.disableSeekbar || b.disableSongSkip) return !1;
            if ("youtube" == Q) ba && Ra && ba.seekTo(a);
            else if ("audio" == Q && P) try {
                P.currentTime = a
            } catch (c) {
                console.log(c)
            }
        };
        this.seekBackward = function(a) {
            if (!Z || !Q) return !1;
            a = a || b.seekTime;
            a = parseInt(a, 10);
            if ("youtube" == Q) ba && Ra && (a = Math.max(ba.getCurrentTime() - a, 0), ba.seekTo(a));
            else if (P) try {
                P.currentTime = Math.max(P.currentTime - a, 0)
            } catch (c) {
                console.log(c)
            }
        };
        this.seekForward = function(a) {
            if (!Z || !Q || b.disableSeekbarInRange && Fa || b.disableSeekbar || b.disableSongSkip) return !1;
            a = a || b.seekTime;
            a = parseInt(a, 10);
            if ("youtube" == Q) ba && Ra && (a = Math.min(ba.getCurrentTime() + a, ba.getDuration()), ba.seekTo(a));
            else if (P) try {
                P.currentTime = Math.min(P.currentTime + a, P.duration)
            } catch (c) {
                console.log(c)
            }
        };
        this.getCurrentMediaUrl = function() {
            if (!Z) return !1;
            if (!Q) return "";
            var a = -1 == window.location.href.indexOf("?") ? "?" : "&";
            var c = "hap-query-instance=" + encodeURIComponent(b.instanceName),
                d = void 0 != I.mediaId ? "&hap-media-id=" + I.mediaId : "&hap-active-item=" + Ja,
                e = Hb ? "&hap-resume-time=" + Math.floor(w.getCurrentTime()) : "";
            a = a + c + "&hap-scroll-to-player=1" + d + e;
            void 0 != I.mediaId && -1 == rf.indexOf(I.origtype) && I.safeTitle && (c = "&hap-media-title=" + encodeURIComponent(I.safeTitle), a += c);
            return a
        };
        this.getCurrentTime = function() {
            return "youtube" == Q ? ba && Ra ? ba.getCurrentTime() : 0 : P ? P.currentTime : 0
        };
        this.getDuration = function() {
            if (!Z || !Q) return !1;
            if ("youtube" == Q) {
                if (ba && Ra) return ba.getDuration()
            } else if (P) return P.duration
        };
        this.destroyPlaylistScroll = function() {
            if (!Z) return !1;
            b.usePlaylistScroll && ("mcustomscrollbar" == b.playlistScrollType ? "undefined" !== typeof mCustomScrollbar && Wa.mCustomScrollbar("destroy") : "perfect-scrollbar" == b.playlistScrollType && rb && (rb.destroy(), rb = null), Sc = !1)
        };
        this.getSetupDone = function() {
            return Z
        };
        this.getMediaPlaying = function() {
            return Z ? ib : !1
        };
        this.getPlaylistLoading = function() {
            return ta
        };
        this.getCounter = function() {
            return Z ? "undefined" !== typeof ha ? ha.getCounter() : -1 : null
        };
        this.getPlaylistContent = function() {
            return S
        };
        this.getPlaylistData = function() {
            return la
        };
        this.getLastPlaylistData = function() {
            return Z ? Xd : !1
        };
        this.getPlaylistLength = function() {
            return Z ? HAPUtils.isNumber(Y) ? Y : 0 : !1
        };
        this.getPlaylistList = function() {
            return Td
        };
        this.getSettings = function() {
            return b
        };
        this.getCurrMediaData = function() {
            return Z ? I : !1
        };
        this.getWrapper = function() {
            return H
        };
        this.getPlaylistItems = function() {
            if (!Z) return !1;
            var a = [];
            S.find(".hap-playlist-item").each(function() {
                a.push(f(this))
            });
            return a
        };
        this.openPopup = function() {
            if (!Z || b.isPopup) return !1;
            hapOpenPopup(b, w)
        };
        this.togglePlaylist = function() {
            if (-1 < xa.indexOf("hap-art-narrow-light") || -1 < xa.indexOf("hap-art-narrow-dark")) b.playlistOpened ? (Fd.stop().animate({
                left: "0px"
            }, {
                duration: 350
            }), Ya.stop().animate({
                left: -Fd.width() + "px"
            }, {
                duration: 350
            })) : (Fd.stop().animate({
                left: Fd.width() + "px"
            }, {
                duration: 350
            }), Ya.stop().animate({
                left: "0px"
            }, {
                duration: 350
            }));
            else if (-1 < xa.indexOf("hap-art-wide-light") || -1 < xa.indexOf("hap-art-wide-dark") || -1 < xa.indexOf("hap-brona-light") || -1 < xa.indexOf("hap-brona-dark"))
                if (b.playlistOpened) Ya.stop().animate({
                    height: "0px"
                }, {
                    duration: 350
                });
                else {
                    var a = Ya.css("height", "auto").height();
                    Ya.height(0).stop().animate({
                        height: a + "px"
                    }, {
                        duration: 350,
                        complete: function() {
                            f(this).height("auto")
                        }
                    })
                } else -1 < xa.indexOf("hap-wall") ? b.playlistOpened ? Ya.css("left", "-20000px") : Ya.css("left", 0) : -1 < xa.indexOf("hap-classic") ? b.playlistOpened ? Ya.slideUp() : Ya.slideDown() : -1 < xa.indexOf("hap-fixed") && (b.playlistOpened ? H.stop().animate({
                bottom: -Ya.height() + "px"
            }, {
                duration: 350
            }) : H.stop().animate({
                bottom: "0px"
            }, {
                duration: 350
            }));
            b.playlistOpened = !b.playlistOpened
        };
        if (Ye && b.continousKey)
            if (!Dd) localStorage.removeItem(b.continousKey);
            else if (localStorage.getItem(b.continousKey)) {
            var Bc = JSON.parse(localStorage.getItem(b.continousKey));
            b.activePlaylist = Bc.activePlaylist;
            b.resumeTime = Bc.resumeTime;
            b.volume = Bc.volume;
            b.activeItem = Bc.activeItem;
            Ca = b.autoPlay = Bc.autoPlay;
            b.lastPositionArr = Bc.lastPositionArr;
            localStorage.removeItem(b.continousKey)
        }
        setTimeout(function() {
            if (b.isPopup && b.copyCurrentPlaylistToPopup) {
                la = b.playlistDataArr;
                Y = la.length;
                ha.setPlaylistItems(Y, !1);
                if (b.useStatistics) {
                    if (!b.usePlaylist) {
                        var a;
                        for (a = 0; a < Y; a++) la[a].data.hapStatsSet = !1
                    }
                    db()
                }
                dc = S;
                if (b.usePlaylist && b.addPlaylistEvents) {
                    var c;
                    S.find(".hap-playlist-item").each(function() {
                        c = f(this);
                        c.on("click", ".hap-playlist-thumb, .hap-playlist-title-wrap", m);
                        Qc || (c.on("mouseenter ", ".hap-playlist-thumb, .hap-playlist-title-wrap", u), c.on("mouseleave", ".hap-playlist-thumb, .hap-playlist-title-wrap", B))
                    })
                }
                W()
            } else Kd.length ? (ta = !0, La.show(), f(w).trigger("playlistStartLoad", {
                instance: w,
                instanceName: b.instanceName
            }), ua = Kd, Y = ua.length, q()) : b.activePlaylist && !HAPUtils.isEmpty(b.activePlaylist) ? r(b.activePlaylist) : W()
        }, 50);
        return this
    }
})(jQuery);
var hap_popup_window, hap_player_instance, hap_player_auto_instance, hasLocalStorage = HAPUtils.hasLocalStorage();

function hapOpenPopup(f, b) {
    if (!hasLocalStorage || !localStorage.getItem("hap_popup")) {
        hap_player_instance = b;
        var A = f.popupUrl || f.sourcePath + "popup.html?rand=" + 99999999 * Math.random(),
            h = f.popupWidth || hap_player_instance.width(),
            p = f.popupHeight || hap_player_instance.height(),
            l = (window.screen.width - parseInt(h, 10)) / 2,
            C = (window.screen.height - parseInt(p, 10)) / 2;
        if (!hap_popup_window || hap_popup_window.closed)
            if (hap_popup_window = window.open(A, "audio_player", "menubar=no,toolbar=no,location=no,scrollbars=1,resizable,width=" + h + ",height=" + p + ",left=" + l + ",top=" + C), !hap_popup_window) return alert("Player can not be opened in a popup window because your browser is blocking Pop-Ups. You need to allow Pop-Ups in browser for this site to use the Player."), !1
    }
}

function hapNotifyParent() {
    if (hap_popup_window && void 0 != hap_popup_window.initPopup) {
        if (hap_player_instance) {
            var f = hap_player_instance.getSettings();
            f.volume = hap_player_instance.getVolume();
            f.activePlaylist = f.activePlaylist;
            f.activeItem = hap_player_instance.getCounter();
            f.resumeTime = hap_player_instance.getCurrentTime();
            f.copyCurrentPlaylistToPopup ? (f.playlistDataArr = hap_player_instance.getPlaylistData(), hap_player_instance.destroyInstance2()) : hap_player_instance.destroyInstance();
            var b = hap_player_instance.getWrapper()
        } else hap_player_auto_instance && (f = hap_player_auto_instance.settings, f.copyCurrentPlaylistToPopup = !1, b = hap_player_auto_instance.wrapper);
        var A = b.attr("id"),
            h = hapjq("#hap-inline-css").clone().wrap("<p>").parent().html(),
            p = hapjq("#hap-playlist-list").remove().wrap("<p>").parent().html();
        b = b.remove().wrap("<p>").parent().html();
        try {
            window[f.instanceName] = hap_popup_window.initPopup(b, A, f, h, p)
        } catch (l) {
            return alert("initPopup error: " + l.message), !1
        }
    }
}(function(f, b) {
    f.HAPFixedPlayer = function(A) {
        function h(W) {
            if (!m) {
                if ("touchstart" == W.type) {
                    if (W = W.originalEvent.touches, !(W && 0 < W.length)) return !1
                } else W.preventDefault();
                m = !0;
                b(C).trigger("HAPFixedPlayer.SET_PROGRESS_START", {
                    inst: K
                });
                D.on(z.moveEvent, function(U) {
                    a: {
                        if ("touchmove" == U.type) {
                            if (U.originalEvent.touches && U.originalEvent.touches.length) var fa = U.originalEvent.touches;
                            else if (U.originalEvent.changedTouches && U.originalEvent.changedTouches.length) fa = U.originalEvent.changedTouches;
                            else break a;
                            if (1 < fa.length) break a;
                            fa = fa[0]
                        } else fa = U;
                        U.preventDefault();
                        E = q.width();
                        U = fa.pageX - q.offset().left;
                        0 > U ? U = 0 : U > E && (U = E);
                        U = Math.max(0, Math.min(1, U / E));
                        b(C).trigger("HAPFixedPlayer.SET_PROGRESS", {
                            inst: K,
                            point: U,
                            update: !0
                        });
                        p(fa)
                    }
                }).on(z.upEvent, function(U) {
                    a: if (m) {
                        m = null;
                        D.off(z.moveEvent).off(z.upEvent);
                        if ("touchend" == U.type) {
                            if (U.originalEvent.touches && U.originalEvent.touches.length) var fa = U.originalEvent.touches;
                            else if (U.originalEvent.changedTouches && U.originalEvent.changedTouches.length) fa = U.originalEvent.changedTouches;
                            else break a;
                            if (1 < fa.length) break a;
                            fa = fa[0]
                        } else fa = U;
                        U.preventDefault();
                        E = q.width();
                        U = fa.pageX - q.offset().left;
                        0 > U ? U = 0 : U > E && (U = E);
                        U = Math.max(0, Math.min(1, U / E));
                        b(C).trigger("HAPFixedPlayer.SET_PROGRESS", {
                            inst: K,
                            point: U,
                            update: !0
                        })
                    }
                })
            }
            return !1
        }

        function p(W) {
            if (!HAPUtils.isNumber(u)) return !1;
            var U = q;
            E = q.width();
            var fa = W.pageX - ca.offset().left;
            if (!HAPUtils.isNumber(fa)) return !1;
            0 > fa ? fa = 0 : fa > E && (fa = E);
            fa = Math.max(0, Math.min(1, fa / E));
            if (!HAPUtils.isNumber(fa)) return !1;
            za.text(HAPUtils.formatTime(u * fa) + " / " + HAPUtils.formatTime(u));
            fa = r[0].getBoundingClientRect();
            U = U[0].getBoundingClientRect();
            W = parseInt(W.pageX - G.scrollLeft() - fa.left - za.outerWidth() / 2);
            U = parseInt(U.top - fa.top - za.outerHeight());
            za.css({
                left: W + "px",
                top: U + "px"
            }).show()
        }

        function l() {
            if (y.useWaveSeekbarInFixed && R) {
                var W = q.width();
                Rc.width = W;
                Cb.width = W;
                T.width = W;
                pb.fillStyle = y.waveBgColor;
                db.fillStyle = y.waveProgressColor;
                y.waveBarWidth ? HAPUtils.drawBars(pb, db, T, R.split(","), 0, W) : HAPUtils.drawWave(pb, db, T, R.split(","), 0, W)
            }
        }
        var C = this,
            y = A.settings,
            M = b("body"),
            D = b(document),
            G = b(f),
            z = HAPUtils.getEvents(),
            n, v, E, m, u, B, K, R, T = y.waveOptions;
        T.waveColor = y.waveBgColor;
        T.progressColor = y.waveProgressColor;
        T.barWidth = y.waveBarWidth;
        T.barRadius = y.waveBarRadius;
        var r = A.wrapper.find(b("#hap-sticky-fixed"));
        r.length ? r.appendTo(M) : r = b("#hap-sticky-fixed");
        var k = r.find(".hap-sticky-player-thumb"),
            x = r.find(".hap-sticky-player-title"),
            N = r.find(".hap-sticky-player-artist"),
            q = r.find(".hap-sticky-music-seekbar"),
            X = r.find(".hap-sticky-music-seekbar-wave"),
            ca = r.find(".hap-sticky-music-seekbar-progress-bg"),
            J = r.find(".hap-sticky-music-seekbar-progress"),
            ea = q.find(".hap-sticky-music-seekbar-wave-progress");
        var ja = r.find(".hap-sticky-player-holder");
        r.find(".hap-sticky-player-title-wrap");
        r.find(".hap-sticky-playback-controls");
        var Aa = r.find(".hap-sticky-time-current"),
            na = r.find(".hap-sticky-time-total"),
            za = r.find(".hap-tooltip"),
            Mb = r.find(".hap-sticky-share-holder"),
            md = r.find(".hap-sticky-info-title"),
            nd = r.find(".hap-sticky-info-desc"),
            Pc = r.find(".hap-sticky-lyrics-toggle").on("click", function() {
                b(C).trigger("HAPFixedPlayer.LYRICS_TOGGLE", {
                    inst: K
                })
            });
        r.find(".hap-sticky-prev-toggle").on("click", function() {
            if (y.disableSongSkip) return !1;
            b(C).trigger("HAPFixedPlayer.PREVIOUS_MEDIA", {
                inst: K
            })
        });
        r.find(".hap-sticky-next-toggle").on("click", function() {
            if (y.disableSongSkip) return !1;
            b(C).trigger("HAPFixedPlayer.NEXT_MEDIA", {
                inst: K
            })
        });
        var Xa = r.find(".hap-sticky-playback-toggle").on("click", function() {
            b(C).trigger("HAPFixedPlayer.TOGGLE_PLAYBACK", {
                inst: K
            })
        });
        var Nb = r.find(".hap-sticky-playback-toggle-ex").on("click", function() {
            b(C).trigger("HAPFixedPlayer.TOGGLE_PLAYBACK", {
                inst: K
            })
        });
        var cb = r.find(".hap-sticky-player-toggle-ex").on("click", function() {
            var W = ja.height();
            y.fixedPlayerOpened ? (ja.stop().animate({
                bottom: -W + "px"
            }, {
                duration: 350
            }), cb.find(".hap-sticky-btn-player-close").hide(), cb.find(".hap-sticky-btn-player-open").show()) : (ja.stop().animate({
                bottom: "0px"
            }, {
                duration: 350
            }), cb.find(".hap-sticky-btn-player-close").show(), cb.find(".hap-sticky-btn-player-open").hide());
            y.fixedPlayerOpened = !y.fixedPlayerOpened
        });
        r.find(".hap-sticky-share-toggle").on("click", function() {
            md.html(C.getTitle(B));
            B.description ? nd.html(B.description) : nd.html("");
            Mb.toggle()
        });
        r.find(".hap-sticky-share-close").on("click", function() {
            Mb.hide()
        });
        q.on(z.downEvent, function(W) {
            h(W);
            return !1
        });
        if (!HAPUtils.isMobile()) {
            var Bb = function() {
                q.off(z.moveEvent, p).off("mouseout", Bb);
                D.off("mouseout", Bb);
                za.hide()
            };
            q.on("mouseover", function() {
                m || (q.on(z.moveEvent, p).on("mouseout", Bb), D.on("mouseout", Bb))
            })
        }
        if (y.useWaveSeekbarInFixed) {
            A = q.width();
            M = q.height();
            var qa = document.createElement("canvas");
            var Rc = qa;
            qa.width = A;
            qa.height = M;
            qa.classList.add("hap-sticky-canvas-seekbar-bg");
            var pb = qa.getContext("2d");
            pb.fillStyle = y.waveBgColor;
            X.prepend(qa);
            var Cb = qa = document.createElement("canvas");
            qa.width = A;
            qa.height = M;
            qa.classList.add("hap-sticky-canvas-seekbar-progress");
            var db = qa.getContext("2d");
            db.fillStyle = y.waveProgressColor;
            ea.append(qa);
            X.css("display", "block")
        } else ca.css("display", "block");
        y.fixedPlayerOpened ? (cb.find(".hap-sticky-btn-player-close").show(), cb.find(".hap-sticky-btn-player-open").hide()) : (cb.find(".hap-sticky-btn-player-close").hide(), cb.find(".hap-sticky-btn-player-open").show());
        var Rb = new HAPVolumeSlider({
            volume: y.volume,
            container: r.find(".hap-sticky-volume-wrap")
        });
        b(Rb).on("HAPVolumeSlider.VOLUME_CHANGE", function(W, U) {
            b(C).trigger("HAPFixedPlayer.VOLUME_CHANGE", {
                inst: K,
                volume: U
            })
        });
        b(Rb).on("HAPVolumeSlider.TOGGLE_MUTE", function(W) {
            b(C).trigger("HAPFixedPlayer.TOGGLE_MUTE", {
                inst: K
            })
        });
        this.setData = function(W) {
            B = W.media;
            v || (v = !0, r.css({
                display: "block"
            }), setTimeout(function() {
                y.fixedPlayerOpened && ja.css("bottom", 0);
                r.addClass("hap-fixed-visible")
            }, 200));
            K = W.inst;
            B.thumb ? k.css("backgroundImage", "url(" + B.thumb + ")") : k.css("backgroundImage", "none");
            B.title ? x.html(B.title) : x.html("");
            B.artist ? N.html(B.artist) : N.html("");
            B.lyrics ? Pc.show() : Pc.hide();
            C.setVisual(W.volume);
            R = null;
            J.width(0);
            ea.width(0);
            if (y.useWaveSeekbarInFixed && W.media.peaks) {
                X.css("display", "block");
                ca.css("display", "none");
                var U = q.width(),
                    fa = q.height();
                Rc.width = U;
                Cb.width = U;
                Rc.height = fa;
                Cb.height = fa;
                T.width = U;
                T.height = fa;
                pb.fillStyle = y.waveBgColor;
                db.fillStyle = y.waveProgressColor;
                R = W.media.peaks;
                y.waveBarWidth ? HAPUtils.drawBars(pb, db, T, R.split(","), 0, U) : HAPUtils.drawWave(pb, db, T, R.split(","), 0, U)
            } else X.css("display", "none"), ca.css("display", "block")
        };
        this.setProgressData = function(W, U, fa, Ec, $c) {
            y.useWaveSeekbarInFixed && R ? U ? ea.width(W + "%") : ea.width(100 * W + "%") : U ? J.width(W) : J.width(W * ca.width());
            u = $c;
            fa && Aa.html(fa);
            Ec && na.html(Ec)
        };
        this.setPauseBtn = function() {
            Xa && (Xa.find(".hap-sticky-music-play-btn").hide(), Xa.find(".hap-sticky-music-pause-btn").show(), Nb.find(".hap-sticky-music-play-btn").hide(), Nb.find(".hap-sticky-music-pause-btn").show())
        };
        this.setPlayBtn = function() {
            Xa && (Xa.find(".hap-sticky-music-play-btn").show(), Xa.find(".hap-sticky-music-pause-btn").hide(), Nb.find(".hap-sticky-music-play-btn").show(), Nb.find(".hap-sticky-music-pause-btn").hide())
        };
        this.setVisual = function(W) {
            Rb && Rb.setVisual(W)
        };
        this.getTitle = function(W) {
            var U = "";
            W.artist && !HAPUtils.isEmpty(W.artist) && W.title && !HAPUtils.isEmpty(W.title) ? U = W.artist + " - " + W.title : W.title && !HAPUtils.isEmpty(W.title) ? U = W.title : W.artist && !HAPUtils.isEmpty(W.artist) && (U = W.artist);
            return U
        };
        if (y.useWaveSeekbarInFixed) G.on("resize", function() {
            n && clearTimeout(n);
            n = setTimeout(l, 150)
        })
    }
})(window, jQuery);