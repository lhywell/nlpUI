require.config({
    urlArgs: "1a37c12",
    baseUrl: "./mininglampNLP/",
    paths: {
        jquery: "http://static.bosonnlp.com/vendor/jquery/jquery.min",
        "jquery-ui": "http://static.bosonnlp.com/vendor/jquery-ui/ui/jquery-ui.min",
        bowser: "http://static.bosonnlp.com/vendor/bowser/bowser.min",
        json2: "http://static.bosonnlp.com/vendor/json2/json2.min",
        backbone: "http://static.bosonnlp.com/vendor/backbone/backbone.min",
        underscore: "http://static.bosonnlp.com/vendor/underscore/underscore.min",
        nunjucks: "http://static.bosonnlp.com/vendor/nunjucks/browser/nunjucks.min",
        highcharts: "https://code.highcharts.com/highcharts",
        "bootstrap.affix": "http://static.bosonnlp.com/vendor/bootstrap/js/affix.min",
        "bootstrap.scrollspy": "http://static.bosonnlp.com/vendor/bootstrap/js/scrollspy.min",
        "bootstrap.tooltip": "http://static.bosonnlp.com/vendor/bootstrap/js/tooltip.min",
        d3: "http://static.bosonnlp.com/vendor/d3/d3.min",
        d3cloud: "http://static.bosonnlp.com/vendor/d3-cloud/d3.layout.cloud.min",
        async: "http://static.bosonnlp.com/vendor/async/lib/async.min",
        "jquery.validate": "http://static.bosonnlp.com/vendor/jquery.validation/jquery.validate.min",
        "jquery.form": "http://static.bosonnlp.com/vendor/jquery-form/jquery.form.min",
        zeroClipboard: "http://static.bosonnlp.com/vendor/zeroclipboard/dist/ZeroClipboard.min",
        switch: "switch",
        vue: "http://static.bosonnlp.com/static-lib/vue/dist/vue.min",
        "vue-strap": "http://static.bosonnlp.com/static-lib/vue-strap/dist/vue-strap.min",
        "vue-qrcode": "http://static.bosonnlp.com/static-lib/vue-qrcode/dist/vue-qrcode",
        "vue-spinner": "http://static.bosonnlp.com/static-lib/vue-spinner/dist/vue-spinner.min"
    },
    shim: {
        jquery: {
            exports: "jQuery"
        },
        "jquery-ui": {
            exports: "jQuery",
            deps: ["jquery"]
        },
        "jquery.validate": {
            deps: ["jquery"]
        },
        "jquery.form": {
            deps: ["jquery"]
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        underscore: {
            exports: "_"
        },
        highcharts: {
            deps: ["jquery"]
        },
        "bootstrap.affix": {
            deps: ["jquery"]
        },
        "bootstrap.scrollspy": {
            deps: ["jquery"]
        },
        "bootstrap.tooltip": {
            deps: ["jquery"]
        },
        zeroClipboard: {
            exports: "zeroClipboard"
        }
    }
});
