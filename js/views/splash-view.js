define(["marionette",
        "underscore",
        "handlebars",
        "text!../../templates/splash-page.html"],
    function (Marionette, _, Handlebars, SplashTemplate) {
        'use strict';
        var SplashView = Marionette.ItemView.extend({
            initialize: function (opts) {
                _.extend(this, opts);
                Marionette.ItemView.prototype.initialize.call(this);
            },
            template: function () {
                return Handlebars.compile(SplashTemplate);
            },
        });
        return SplashView;
    });