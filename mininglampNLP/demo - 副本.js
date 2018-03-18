/*define("switch", ["backbone", "bowser", "nunjucks"], function(e, t, n) {
    var i = e.Model.extend({ initialize: function(e, t, n) { this.set("id", this.cid), this.set("value", e), this.set("title", t), this.set("isDefault", n === !0) } }),
        a = e.Collection.extend({ model: i }),
        r = e.View.extend({
            tagName: "div",
            className: "switch-wrap switch-toggle switch-candy",
            tmplate: '{% for item in collection %}<input id="rd-{{item.id}}" name="view{{item.viewname}}" value="{{item.value}}" type="radio" {% if item.isDefault == true %} checked {% endif %}/><label for="rd-{{item.id}}">{{item.title}}</label>{% endfor %}<a></a>',
            initialize: function() {},
            render: function(e, i, a) {
                this.collection = e, e.length > 2 && this.$el.addClass("switch-" + e.length), _.each(e.models, function(e) { e.set("viewname", i) });
                var r = n.renderString(this.tmplate, { collection: e.toJSON() });
                return this.$el.html(r), t.msie && t.version <= 8 && (this.$el.removeClass("switch-toggle").removeClass("switch-candy").addClass("low-bowser"), this.$("a").remove()), this.$el.find("label:last").addClass("last-label"), a && a.call(this), this
            },
            recover: function() {
                var e = this.$("input:radio"),
                    t = 0,
                    n = this.collection.models;
                _.each(n, function(e, n) {
                    if (e.get("isDefault") === !0) return t = n, !1
                }), e.each(function(e, n) { e == t ? n.checked = !0 : n.checked = !1 })
            },
            click: function(e) {
                var t = this.$("input:radio");
                isNaN(e) ? t.first().click() : t.eq(e).click()
            },
            val: function() {
                var e, t = this.$("input:radio");
                if (t.each(function(t, n) {
                        if (n.checked === !0) return e = n, !1
                    }), !e) {
                    var n = this.collection.models;
                    _.each(n, function(n, i) {
                        if (n.get("isDefault") === !0) return e = t[i], !1
                    })
                }
                return e || (e = t[0]), e && e.value
            }
        }),
        s = r.extend({ lock: function() { this.$("input:radio").attr("disabled", !0) }, unlock: function() { this.$("input:radio").attr("disabled", !1) } });
    return { SwitchModel: i, SwitchCollection: a, SwitchWidget: r, SwitchWidget2: s }
}), define("widget/redirect_register", ["jquery", "bowser"], function(e, t) {
    function n(t) {
        var n = e(document).scrollTop(),
            i = e(document).height(),
            r = a.height(),
            s = e(window).height(),
            o = i - r;
        if (o < n + s) {
            var l = r + n + s - i;
            t.css("bottom", l)
        } else t.css("bottom", 0)
    }
    var i = '<div class="redirect-register"><div class="container"><a class="btn btn-arrow btn-radius right" href="/account/register?source=demo-fixed"><span class="icon"></span>立即注册</a><span>现在加入BosonNLP，可获得分词与词性标注引擎<strong>不限量</strong>调用额度！</span></div></div>',
        a = e("#page-footer"),
        r = function(a) {
            var r = e("#hidden_auth");
            if (!(r.length > 0 && 1 == r.val())) {
                var s = a.selector || "body",
                    o = 1e3 * (a.time || 15),
                    l = e(i);
                t.msie && t.version <= 8 && l.addClass("low-bowser"), e(s).append(l), setTimeout(function() { e(s).append(l), l.fadeIn(), e(window).scroll(function() { n(l) }) }, o)
            }
        };
    return r
}), define("widget/dialog", ["jquery-ui", "underscore"], function(e, t) {
    function n(n, s) {
        s = s || {}, t.isObject(n) && (s = n, n = "alert");
        var o = {};
        "alert" === n ? e.extend(!0, o, a, s) : "action" === n ? e.extend(!0, o, r, s) : e.extend(!0, o, i, s);
        var l = s.message,
            d = s.el;
        return d = e(d ? d : "<div>" + l + "</div>"), s.hasCancel === !0 && e.extend(!0, o, { buttons: { cancel: { text: "取消", class: "cancel btn", click: function() { e(this).dialog("destroy") } } } }), d.dialog(o)
    }
    var i = { modal: !0, dialogClass: "action" },
        a = { modal: !0, title: "提示信息", dialogClass: "alert", buttons: { submit: { text: "确  定", class: "btn", click: function() { e(this).dialog("destroy") } } }, close: function() { e(this).dialog("destroy") } },
        r = { modal: !0, closeOnEscape: !1, title: "提示信息", dialogClass: "action", buttons: { submit: { class: "btn" } } };
    return e.extend(!0, a, i), e.extend(!0, r, i), n
}), define("widget/hover", ["backbone", "widget/dialog"], function(e, t) {
    var n = e.View.extend({
            tagName: "a",
            className: "docs",
            hasEvent: !1,
            initialize: function(e) { this.enterEl = e },
            render: function() {
                return this.$el.html(this.title), this
            },
            addEvent: function() {
                var e = this;
                0 == e.hasEvent && (e.hasEvent = !0, $(this.enterEl).bind("mouseenter", $.proxy(this.showEl, this)).bind("mouseleave", $.proxy(this.hideEl, this)))
            },
            showEl: function() { this.$el.show() },
            hideEl: function() { this.$el.hide() },
            removeEvent: function() { this.hasEvent = !1, $(this.enterEl).unbind("mouseenter", $.proxy(this.showEl, this)).unbind("mouseleave", $.proxy(this.hideEl, this)) }
        }),
        i = n.extend({
            title: "查看文档",
            initialize: function(e) { n.prototype.initialize.call(this, e) },
            render: function(e) {
                return n.prototype.render.call(this), this.$el.attr("href", e), this.$el.attr("target", "_blank"), this.addEvent(), this
            }
        }),
        a = e.Model.extend({ defaults: { api: null, text: null, actual: null, params: null } }),
        r = n.extend({
            className: "docs feedback",
            title: "结果不正确",
            events: { click: "request" },
            initialize: function(e) { n.prototype.initialize.call(this, e), this.data = new a },
            request: function() {
                var e = (this.data.get("params"), $.param(this.data.attributes));
                $.post("/feedback/api", e);
                t({ message: "感谢您的提交！" })
            },
            removeData: function() { this.data.set("api", null), this.data.set("text", null), this.data.set("actual", null), this.data.set("params", null), this.removeEvent(), this.$el.css("display", "none") },
            setData: function(e) { "object" == typeof e && (this.data.set("api", e.api), this.data.set("text", e.text), this.data.set("actual", e.actual), this.data.set("params", e.params), this.addEvent()) }
        });
    return { HoverWidget: n, DocWidget: i, FeedbackWidget: r }
}), define("backtop", ["jquery"], function(e) {
    function t() {
        var t = i.offset().left,
            s = i.width();
        n.css("left", t + s);
        var o = e(document).scrollTop(),
            l = e(document).height(),
            d = a.height(),
            c = e(window).height(),
            u = l - d;
        if (u > o + c) n.css("bottom", r);
        else {
            var h = d + o + c - l;
            n.css("bottom", h + r)
        }
    }
    var n = e("#btn-back-top"),
        i = e("#demo-container"),
        a = e("#page-footer"),
        r = 84;
    e(window).scroll(function() { e(this).scrollTop() ? (t(), n.fadeIn()) : n.fadeOut() }), n.click(function() { e("html, body").animate({ scrollTop: 0 }, 1e3) })
}), define("browser.unit", ["bowser"], function(e) {
    function t() {
        return function(e) {
            if ("" == e) return {};
            for (var t = {}, n = 0; n < e.length; ++n) {
                var i = e[n].split("=");
                2 == i.length && (t[i[0]] = decodeURIComponent(i[1].replace(/\+/g, " ")))
            }
            return t
        }(window.location.search.substr(1).split("&"))
    }
    return e.msie && e.version < 8 && $("body").prepend('<div class="warn-bowser">您当前浏览器无法提获得最佳浏览体验，请使用<a href="https://www.google.com/chrome/browser/" target="_blank">Chrome</a>、<a href="http://firefox.com" target="_blank">firefox</a>等。</div>'), window.supportSVG = function() {
        var e = "http://www.w3.org/2000/svg";
        return !!document.createElementNS && !!document.createElementNS(e, "svg").createSVGRect
    }, { getQueryString: t }
}), define("demo", ["jquery", "async", "nunjucks", "switch", "widget/redirect_register", "widget/hover", "backbone", "widget/dialog", "backtop", "browser.unit", "jquery-ui", "highcharts", "bootstrap.affix", "bootstrap.scrollspy"], function(e, t, n, i, a, r, s, o) {
    function l(e, t) {
        e.highcharts({
            chart: { plotBackgroundColor: "#f6f6f6", plotBorderWidth: null, plotShadow: !1, margin: [0, 0, 0, 0] },
            credits: { enabled: !1 },
            title: { text: null },
            tooltip: {
                formatter: function() {
                    return this.y.toFixed(4)
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: !0,
                    cursor: "pointer",
                    size: 140,
                    innerSize: 75,
                    colors: ["#4daf7c", "#e5613b"],
                    dataLabels: {
                        color: "#777",
                        formatter: function() {
                            return this.point.name + ": " + this.y.toFixed(4)
                        }
                    },
                    events: { click: null }
                }
            },
            series: [{ type: "pie", slicedOffset: 7, data: t }]
        })
    }
    var d = i.SwitchModel,
        c = i.SwitchCollection,
        u = i.SwitchWidget,
        h = r.FeedbackWidget;
    a({ time: 10 }), e(function() {
        function i() { x.scrollspy("refresh") }

        function a() {
            var t = e(".bs-sidebar-chunk");
            t.affix({ offset: { top: t.offset().top - 22 } });
            var n = (e(window), e(document.body));
            x = n.scrollspy({ target: ".bs-sidebar-chunk" })
        }

        function r(t, n) {
            if ("abort" != n.statusText) {
                var i;
                try { i = JSON.parse(n.responseText).error } catch (e) { i = "请求出错" }
                e(".loading", t).addClass("hide"), e(".warn-tips", t).removeClass("hide"), e(".warn-tips .txt", t).html(i)
            }
        }

        function s() {
            return e("#txt-analysis").val()
        }

        function f(t) {
            var n = e("#txt-analysis").val();
            if (n = n.replace(S, function() {
                    return arguments[2]
                }), t === !0) {
                var i = n.indexOf("。"),
                    a = n.indexOf("？"),
                    r = n.indexOf("！");
                i = i === -1 ? n.length : i;
                var s = i > a && a !== -1 ? a > r && r !== -1 ? r : a : i > r && r !== -1 ? r : i;
                s !== -1 && (n = n.substring(0, s + 1))
            }
            return n = n.replace(/\r\n|\n/gi, "")
        }

        function p(e) {
            var t = f(e);
            return encodeURIComponent(t)
        }

        function m() {
        //词性分析
            function t(e) {
                for (var t = 0; t < l.length; t++) {
                    var n = l[t];
                    if (n.expression.test(e)) return n.name
                }
            }

            function a(e, t, i) {
                return n.renderString("<dd title='{{ typeName }}' class={{ type }}>{{ word }}</dd>", { word: e, type: t ? t.substr(0, 2) : "", typeName: i })
            }

            function o(e) {
                return n.renderString("<dt>词性类别图示:</dt>{% for type in types %}<dd class='{{ type.substr(0, 2) }}'>{{ getTypeName(type) }}</dd>{% endfor %}", {
                    types: e,
                    getTypeName: function(e) {
                        return t(e)
                    }
                })
            }
            var l = [{ name: "人名", expression: /^nr/i }, { name: "地名", expression: /^ns/i }, { name: "组织", expression: /^nt/i }, { name: "字符串", expression: /^nx/i }, { name: "专有名词", expression: /^nz/i }, { name: "名词", expression: /^n/i }, { name: "电话号码", expression: /^tel/i }, { name: "时间词", expression: /^t/i }, { name: "处所词", expression: /^s/i }, { name: "方位词", expression: /^f/i }, { name: "动词", expression: /^v/i }, { name: "形容词", expression: /^a/i }, { name: "区别词", expression: /^b/i }, { name: "状态词", expression: /^z/i }, { name: "代词", expression: /^r/i }, { name: "数词", expression: /^m/i }, { name: "量词", expression: /^q/i }, { name: "副词", expression: /^d/i }, { name: "介词", expression: /^p/i }, { name: "连词", expression: /^c/i }, { name: "网页链接", expression: /^url/i }, { name: "助词", expression: /^u/i }, { name: "电子邮件", expression: /^email/i }, { name: "叹词", expression: /^e/i }, { name: "语气词", expression: /^y/i }, { name: "拟声词", expression: /^o/i }, { name: "前缀", expression: /^h/i }, { name: "身份证号", expression: /^id/i }, { name: "IP地址", expression: /^ip/i }, { name: "后缀", expression: /^k/i }, { name: "标点符号", expression: /^w/i }],
                d = {
                    _cache: {},
                    push: function(e) {
                        for (var t = 0; t < l.length; t++) {
                            var n = l[t],
                                i = n.expression.exec(e);
                            if (i && !this._cache[i[0]]) {
                                this._cache[i[0]] = !0;
                                break
                            }
                        }
                    },
                    get: function(e) {
                        return e ? this._cache[e] : this._cache
                    }
                },
                c = p(),
                u = k.wordReq = e.post("http://192.168.24.198:8910/basicanalysis", c),
                f = e("#overview-analysis");

                console.log(c)
            u.done(function(n) {
            	 console.log(n)
                var r = JSON.parse(n),
                    l = "";
                for (var c in r)
                    if (r.hasOwnProperty(c)) {
                        for (var u = r[c].tag, p = r[c].word, m = r[c].isConvertError, v = 0; v < u.length; v++)
                            if (p[v]) {
                                var g = u[v].toLowerCase(),
                                    w = t(g);
                                d.push(g), l += a(p[v], g, w)
                            }
                        m === !0 && e(".warn-msg").removeClass("hide")
                    }

                e(".words", f).html(l);
                var y = d.get(),
                    b = Object.keys(y),
                    x = o(b);
                e(".word-mean", f).html(x), e(".loading", f).addClass("hide"), i(), R.refreshSlide();
                var k = new h(f),
                    C = k.render().$el;
                e(".title", f).append(C), k.setData({ api: "tag", text: s(), actual: n })
            }).fail(function(e) {console.log(e); r(f, e), i(), R.refreshSlide() })
        }

        function v() {
            //新闻分类
            function t(e) {
                return n.renderString("{% for i in items %}<li {{ isSelected(loop.index0) }}>{{ i }}</li>{% endfor %}<li class='move-scale' style='left: {{ position }}'></li>", {
                    n: e,
                    items: a,
                    isSelected: function(t) {
                        return e === t ? 'class="selected"' : ""
                    },
                    position: -9 + 64 * e + "px"
                })
            }
            var a = ["体育", "教育", "财经", "社会", "娱乐", "军事", "国内", "科技", "互联网", "房产", "国际", "女人", "汽车", "游戏"],
                o = p(),
                l = k.categroyReq = e.post("/analysis/category", o),
                d = e("#overview-info");
            l.done(function(n) {
                var a = JSON.parse(n),
                    r = t(a[0]);
                e(".info-containers").html(r), e(".loading", d).addClass("hide"), i(), 12 == a[0] ? N(12) : N();
                var o = new h(d),
                    l = o.render().$el;
                e(".title", d).append(l), o.setData({ api: "classify", text: s(), actual: n })
            }).fail(function(e) { N(), r(d, e), i() })
        }

        function g() {
            //关键词提取
            function t(e, t) {
                var i = n.renderString("<div class='col-small-{{index}}'><table><thead><tr><td>名称</td><td>权重</td></tr></thead>{% for i in items %}<tr><td>{{ i[1] }}</td><td>{{ formatNum(i[0]) }}</td></tr>{% endfor %}</table></div>", {
                    items: e,
                    index: t,
                    formatNum: function(e) {
                        return e *= 100, e.toFixed()
                    }
                });
                return i
            }
            var a = p(),
                o = k.keyReq = e.post("/analysis/key", a),
                l = e("#overview-key"),
                d = e(".result", l);
            o.done(function(n) {
                var a = JSON.parse(n),
                    r = [],
                    o = 0,
                    c = 5,
                    u = "";
                if (0 == a.length) d.html("<div class='no-data'>暂无关键词提取</div>");
                else {
                    for (var f = 0; f < a.length;) r.push(a[f]), ++f % c === 0 && (u += t(r, o), r = [], o++);
                    a.length % c != 0 && (u += t(r, o)), d.html(u)
                }
                e(".loading", l).addClass("hide"), i();
                var p = new h(l),
                    m = p.render().$el;
                e(".title", l).append(m), p.setData({ api: "keywords", text: s(), actual: n })
            }).fail(function(e) { r(l, e), i() })
        }

        function w() {
            //语义联想
            function t(e, t, i) {
                return n.renderString("<div class='col-{{index}}'><div class='suggest-word'>关键词：{{ word }}</div><table><thead><tr><td>名称</td><td>相关性</td></tr></thead>{% for i in items %}<tr><td>{{ format(i[1]) }}</td><td>{{ i[0].toFixed(4) }}</td></tr>{% endfor %}</table></div>", {
                    word: e,
                    items: t,
                    index: i,
                    format: function(e) {
                        return e.substring(0, e.lastIndexOf("/"))
                    }
                })
            }
            var a = e("#overview-semantic"),
                o = p(),
                l = k.suggestReq = e.post("/analysis/suggest", o),
                d = e(".result", a);
            l.done(function(n) {
                var r = JSON.parse(n),
                    o = "";
                if (0 == r.length) d.html("<div class='no-data'>暂无语义联想</div>");
                else {
                    for (var l in r)
                        if (r.hasOwnProperty(l)) {
                            var c = r[l],
                                u = c.word,
                                f = c.data;
                            o += t(u, f, l)
                        }
                    d.html(o)
                }
                e(".loading", a).addClass("hide"), i();
                var p = new h(a),
                    m = p.render().$el;
                e(".title", a).append(m), p.setData({ api: "suggest", text: s(), actual: n })
            }).fail(function(e) { r(a, e), i() })
        }

        function y() {
            for (var t in k) k[t].abort && k[t].abort();
            for (var t in C) C[t].recover && C[t].recover();
            e(".words").empty(), e(".word-mean").empty(), e(".emotion-tips").addClass("hide"), e(".emotion-chart").empty(), e(".info-containers").empty(), e("#overview-key .result").empty(), e("#overview-semantic .result").empty(), e(".loading").removeClass("hide"), e(".warn-tips").addClass("hide"), e(".warn-msg").addClass("hide"), e("#overview-depend .depend-tree").empty(), e(".title .feedback").remove()
        }

        function b(n) {
            function i() {
                var i = f();
                return i.length > a ? void o({
                    width: 400,
                    message: "待分析数据不得超过10000个字。",
                    hasCancel: !0,
                    buttons: {
                        submit: {
                            text: "分析",
                            click: function() {
                                var t = i.substring(0, a);
                                e("#txt-analysis").val(t), e("#btn-analysis").click(), e(this).dialog("destroy")
                            }
                        }
                    }
                }) : void t.parallel(n, function(e, t) {})
            }
            var a = 1e4,
                r = e("#btn-analysis");
            r.click(i)
        }
        var x, k = {},
            C = {},
            S = /{{(.+?):(.+?)}}/g,
            N = function() {
                //实体识别
                function t(e) {
                    for (var t = 0; t < g.length; t++) {
                        var n = g[t];
                        if (n.key == e) return n.name
                    }
                }

                function a(e, t, i) {
                    return n.renderString("<dd title='{{ typeName }}' class={{ type }}>{{ word }}</dd>", { word: e, type: t, typeName: i })
                }

                function o(e) {
                    return n.renderString("<dt>实体类别图示:</dt>{% for type in types %}<dd class='{{ type }}'>{{ getTypeName(type) }}</dd>{% endfor %}", {
                        types: e,
                        getTypeName: function(e) {
                            return t(e)
                        }
                    })
                }

                function l(n, l) {
                    e(".title .feedback", w).remove(), m = n;
                    var d = {
                            _cache: {},
                            push: function(e) {
                                for (var t = 0; t < g.length; t++) {
                                    var n = g[t];
                                    if (n.key == e && !this._cache[e]) {
                                        this._cache[e] = !0;
                                        break
                                    }
                                }
                            },
                            get: function(e) {
                                return e ? this._cache[e] : this._cache
                            }
                        },
                        c = isNaN(n) ? "?category=" : "?category=" + n;
                    c += "&sensitivity=" + (l || 3);
                    var u = p(),
                        C = k.nerReq = e.post("/analysis/ner" + c, u);
                    C.done(function(r) {
                        var c = JSON.parse(r);
                        v.sensitivity = l, v.category = n;
                        var u = "";
                        for (var p in c)
                            if (c.hasOwnProperty(p)) {
                                for (var m = c[p].entity, g = c[p].word, k = [], C = 0, S = 0; S < m.length; S++)
                                    if (m.hasOwnProperty(S)) {
                                        var N = m[S];
                                        C < N[0] && k.push([C, N[0], ""]), C = N[1], N.isEntity = !0, k.push(N)
                                    }
                                g.length >= C && k.push([C, g.length, ""]);
                                for (var $ = f(), S = 0; S < k.length; S++)
                                    if (k.hasOwnProperty(S)) {
                                        var N = k[S],
                                            O = N.isEntity,
                                            E = N[2],
                                            _ = t(E),
                                            R = g.slice(N[0], N[1]),
                                            q = "",
                                            D = "";
                                        if (O) {
                                            for (var j in R)
                                                if (R.hasOwnProperty(j)) {
                                                    var P = R[j];
                                                    $.indexOf(D + P) < 0 && (P = " " + P), D += P
                                                }
                                            q = a(D, E, _)
                                        } else {
                                            D = "";
                                            for (var j in R)
                                                if (R.hasOwnProperty(j)) {
                                                    var P = R[j];
                                                    q += a(P, E, _)
                                                }
                                        }
                                        u += q, d.push(E)
                                    }
                            }
                        y.html(u);
                        var z = d.get(),
                            W = Object.keys(z),
                            J = o(W);
                        x.html(J), b.addClass("hide"), i(), T.refreshSlide();
                        var B = new h(w),
                            F = B.render().$el;
                        e(".title", w).append(F), B.setData({ api: "ner", text: s(), actual: r, params: v })
                    }).fail(function(e) { r(w, e), i(), T.refreshSlide() })
                }
                var m, v = {},
                    g = [{ name: "时间", key: "time" }, { name: "人名", key: "person_name" }, { name: "地点", key: "location" }, { name: "组织名", key: "org_name" }, { name: "公司名", key: "company_name" }, { name: "产品名", key: "product_name" }, { name: "职位", key: "job_title" }],
                    w = e("#overview-ner"),
                    y = e(".words", w),
                    b = e(".loading", w),
                    x = e(".word-mean", w),
                    S = e(".title", w),
                    N = e(".warn-tips", w),
                    $ = new c;
                $.push(new d("1", "更多")), $.push(new d("2", "较多")), $.push(new d("3", "平衡", !0)), $.push(new d("4", "准确")), $.push(new d("5", "更准确"));
                var O = C.ner = new u,
                    E = O.render($, "ner", function() {
                        var t = O;
                        t.$("input:radio").on("click", function(t) {
                            var n = e(t.currentTarget).val();
                            y.empty(), x.empty(), N.addClass("hide"), b.removeClass("hide"), l(m, n)
                        })
                    }).el;
                return S.append(E), l
            }(),
            $ = function() {
                //依存文法
                function t() {
                    return e('<div class="depend-tree" style="background-color:#f6f6f6"></div>').append(v.children().clone()).dialog({ dialogClass: "no-title", autoOpen: !1, height: c, width: d, draggable: !1, modal: !0 })
                }

                function n(t, n) {
                    var i = e("<div></div>").text(t).html(),
                        a = document.getElementsByTagName("body")[0],
                        r = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                        s = document.createElementNS("http://www.w3.org/2000/svg", "text"),
                        o = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                    a.appendChild(r), r.appendChild(s), s.appendChild(o), o.innerText = i, o.textContent = i, n === !0 && (s.style.fontWeight = "bold");
                    var l = 0 === o.getBoundingClientRect().width ? e(o).width() : o.getBoundingClientRect().width,
                        d = o.getBoundingClientRect().height ? e(o).height() : o.getBoundingClientRect().height;
                    return a.removeChild(r), { width: l, height: d }
                }

                function a(t) {
                    var n = e.Deferred(),
                        i = k.dependReq = e.post("/analysis/depend", t);
                    return i.done(function(e) {
                        u = e;
                        for (var t = JSON.parse(e)[0], i = t.role, a = t.head, r = t.tag, s = t.word, o = [], l = [], d = [], c = [], h = [], f = i.length, p = 0; p < f; p++) {
                            var m = i[p],
                                v = a[p],
                                w = r[p],
                                y = s[p],
                                b = p + " | " + w;
                            o.push({ label: m, size: g.calculate(m) }), l.push({ label: v }), d.push({ label: w }), c.push({ label: y, size: v === -1 ? g.calculate(y, !0) : g.calculate(y) }), h.push({ label: b, size: g.calculate(b) })
                        }
                        var x = { roles: o, heads: l, tags: d, words: c, tips: h };
                        n.resolve(x)
                    }).fail(function(e) { n.reject(e) }), n.promise()
                }

                function o(t) {
                    var n = e.Deferred(),
                        i = JSON.stringify(t),
                        a = k.dependReq = e.ajax({ url: "/analysis/dependency_tree", method: "POST", contentType: "application/json", data: i });
                    return a.done(function(e) { v.html(e), n.resolve() }).fail(function(e) { n.reject(e) }), n.promise()
                }
                var l, d, c, u, f = e("#overview-depend"),
                    m = "#overview-depend .depend-tree",
                    v = e(m);
                if (!window.supportSVG()) return function() { e(".loading", f).addClass("hide"), e(m).html('<div class="warn-svg">您的当前浏览器不支持SVG，请使用<a href="https://www.google.com/chrome/browser/" target="_blank">Chrome</a>、<a href="http://firefox.com" target="_blank">firefox</a>等。</div>') };
                var g = {
                    calculate: function(e, t) {
                        var i = n(e, t);
                        return i
                    }
                };
                return e(".btn", f).click(function() {
                        l = l || t(), l.dialog("open"), l.find(".ui-dialog-titlebar").hide(), l.removeAttr("style");
                        l.attr("id");
                        e(".ui-widget-overlay").one("click", function() { l.dialog("destroy"), l = null })
                    }),
                    function() {
                        var t = p(!0);
                        v.css({ height: 0 }), e.when(a(t)).then(o).then(function() {
                            e(".emotion-tips").removeClass("hide"), e(".loading", f).addClass("hide");
                            var t = v[0];
                            v.css({ overflow: "auto", width: 900, height: v[0].scrollHeight }), v.css({ height: t.scrollHeight + (t.offsetHeight - t.clientHeight) }), d = t.scrollWidth + 2 > document.body.offsetWidth - 50 ? document.body.offsetWidth - 50 : t.scrollWidth + 2, c = t.clientHeight;
                            var n = e(".tree-shadow-wrap").width(t.clientWidth).height(t.clientHeight);
                            e("svg", f).mouseenter(function(e) { n.removeClass("hide") }), n.mouseleave(function() { n.addClass("hide") }), i();
                            var a = new h(f),
                                r = a.render().$el;
                            e(".title", f).append(r), a.setData({ api: "depparser", text: s(), actual: u })
                        }).fail(function(e) { r(f, e), i() })
                    }
            }(),
            O = function() {
                //情感分析
                function t(t) {
                    e(".title .feedback", n).remove(), t = "string" == typeof t ? t : "";
                    var o = p(),
                        d = k.emotionReq = e.post("/analysis/sentiment?analysisType=" + t, o);
                    d.done(function(r) {
                        a.removeClass("hide"), m.addClass("hide");
                        var o = JSON.parse(r)[0];
                        g.analysisType = t;
                        var d = [{ name: "正面指数", value: o[0], color: "#4daf7c" }, { name: "负面指数", value: o[1], color: "#e5613b" }];
                        d[0].label = d[0].name + " " + o[0].toFixed(4), d[1].label = d[1].name + " " + (1 - o[0].toFixed(4)).toFixed(4), l(e(".emotion-chart"), [
                            ["正面指数", o[0]],
                            ["负面指数", o[1]]
                        ]), i();
                        var c = new h(n),
                            u = c.render().$el;
                        e(".title", n).append(u), c.setData({ api: "sentiment", text: s(), actual: r, params: g })
                    }).fail(function(e) { r(n, e), i() })
                }
                var n = e("#overview-emotion"),
                    a = e(".emotion-tips", n),
                    o = e(".warn-tips", n),
                    f = e(".emotion-chart", n),
                    m = e(".loading", n),
                    v = e(".title", n),
                    g = {},
                    w = new c;
                w.push(new d("", "通用", !0)), w.push(new d("auto", "汽车")), w.push(new d("kitchen", "厨具")), w.push(new d("food", "餐饮")), w.push(new d("news", "新闻")), w.push(new d("weibo", "微博"));
                var y = C.emotion = new u,
                    b = y.render(w, "emotion", function() {
                        var n = y;
                        n.$("input:radio").on("click", function(n) {
                            var i = e(n.currentTarget).val();
                            f.empty(), a.addClass("hide"), o.addClass("hide"), m.removeClass("hide"), t(i)
                        })
                    }).el;
                return v.append(b), t
            }(),
            E = function() {
                //新闻摘要
                function t(t) {
                    e(".title .feedback", n).remove(), t = "string" == typeof t ? t : "0.5";
                    var a = p(),
                        d = k.emotionReq = e.post("/analysis/summary?percentage=" + t, a);
                    d.done(function(t) {
                        l.addClass("hide");
                        var a = JSON.parse(t);
                        o.html(a), i();
                        var r = new h(n),
                            d = r.render().$el;
                        e(".title", n).append(d), r.setData({ api: "summary", text: s(), actual: t, params: m })
                    }).fail(function(e) { r(n, e), i() })
                }
                var n = e("#overview-summary"),
                    a = e(".warn-tips", n),
                    o = e(".result", n),
                    l = e(".loading", n),
                    f = e(".title", n),
                    m = {},
                    v = new c;
                v.push(new d("0.5", "50%", !0)), v.push(new d("0.4", "40%")), v.push(new d("0.3", "30%")), v.push(new d("0.2", "20%"));
                var g = C.summary = new u,
                    w = g.render(v, "summary", function() {
                        var n = g;
                        n.$("input:radio").on("click", function(n) {
                            var i = e(n.currentTarget).val();
                            o.empty(), a.addClass("hide"), l.removeClass("hide"), t(i)
                        })
                    }).el;
                return f.append(w), t
            }(),
            _ = [y, m, $, O, v, E, g, w];
        b(_),
            function() {
                var t, n = function(e) {
                    if ("" == e) return {};
                    for (var t = {}, n = 0; n < e.length; ++n) {
                        var i = e[n].split("=");
                        2 == i.length && (t[i[0]] = decodeURIComponent(i[1].replace(/\+/g, " ")))
                    }
                    return t
                }(window.location.search.substr(1).split("&"));
                if (t = n.text) e("#txt-analysis").val(t);
                else {
                    var i = ["继前不久始于中国的召回风波，宝马因为车辆的发动机螺栓故障，在全球范围将召回48.9万辆车，在原有中国召回的基础上数量进一步增加。据悉，召回车辆将包括北美市场的15.6万辆，宝马曾于3月宣布在华召回232,098辆发动机螺栓故障车辆。涉及车型包括搭载六缸发动机的宝马5系、7系、X3、X5，。但具体型号Santer并没有透露。宝马发言人Bernhard Santer表示，目前尚无该故障造成事故或伤亡的报告。但他仍建议相关车主及时检查车辆引擎。Santer说，凭借剩余的动力，车辆仍旧可以坚持到最近的修理厂。", "新浪手机讯 4月17日上午消息，近期关于iPhone 6传闻格外多，最新一则来自法国网站nowhereelse.fr，因为iPhone 6屏幕变大，它的电源键将被放在机身侧面。这种推测来源于几张“iPhone 6硅胶壳”图片，“i6”这种写法似乎是中国南方一些附件厂商喜爱的称呼。假设这种保护壳为真，那下一代iPhone最明显的改善就是机身变得更大，并且电源键从机身顶部被转移到了侧面，相信这是为了唤醒手机更方便，现在很多5寸以上大屏手机都采用这种方式。", "15日，备受关注的电影《黄金时代》在北京举行了电影发布会，导演许鞍华和编剧李樯及汤唯、冯绍峰等众星悉数亮相。据悉，电影确定将于10月1日公映。本片讲述了“民国四大才女”之一的萧红短暂而传奇的一生，通过她与萧军、汪恩甲、端木蕻良、洛宾基四人的情感纠葛，与鲁迅、丁玲等人一起再现上世纪30年代的独特风貌。电影原名《穿过爱情的漫长旅程》，后更名《黄金时代》，这源自萧红写给萧军信中的一句话：“这不正是我的黄金时代吗？”"];
                    e("#txt-analysis").val(i[Math.floor(Math.random() * i.length)])
                }
            }(), e("#btn-analysis").click(), a(), e.fn.slide = function() {
                var t = this;
                e(document).on("scroll", function() {
                    if (0 != t.length && 0 !== e(".word-mean dd", t).length) {
                        var n = e(".word-mean", t),
                            i = e(window).scrollTop(),
                            a = t.height(),
                            r = n.height(),
                            s = t.offset().top + parseInt(t.css("padding-top")),
                            o = s + a;
                        t.scrollRange || (t.scrollRange = {}, t.scrollRange.start = n.offset().top, t.scrollRange.end = o - r - parseInt(n.css("margin-bottom")));
                        var l = t.scrollRange.start,
                            d = t.scrollRange.end;
                        if (i < s) return void n.removeAttr("style");
                        if (!(i > o || i < l)) {
                            if (i > d) {
                                var c = d - s;
                                return void n.css({ width: "auto", position: "static", top: "auto", "margin-top": c })
                            }
                            n.css({ height: n.height(), width: n.width(), position: "fixed", top: "0", "margin-top": "0" })
                        }
                    }
                })
            }, e.fn.refreshSlide = function() { delete this.scrollRange }, e(".main-content .chunk").mouseenter(function() { e(".title .docs", this).show() }).mouseleave(function() { e(".title .docs", this).hide() });
        var R = e("#overview-analysis"),
            T = e("#overview-ner");
        R.slide(), T.slide()
    })
});
*/