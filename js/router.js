define([
    "jquery",
    "marionette",
    "backbone",
    "controller"
], function ($, Marionette, Backbone, Controller) {
    "use strict";
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'home',
            'explore': 'explore',
            'places/zoom/:id': 'storyDetailFullScreen',
            'places/:id': 'storyDetail'
        },
        initialize: function (options) {
            this.controller = new Controller({
                app: options.app
            });
            Marionette.AppRouter.prototype.initialize.apply(this, [options]);
            this.applyRoutingHacks();
        },
        applyRoutingHacks: function () {
            $('a').click(function (e) {
                if ('#/' + Backbone.history.fragment == $(this).attr('href')) {
                    Backbone.history.loadUrl(Backbone.history.fragment);
                }
            });
        }
    });
    return Router;
});
