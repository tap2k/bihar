define([
    "marionette"
], function (Marionette) {
    "use strict";
    return Marionette.Controller.extend({
        initialize: function (options) {
            this.app = options.app;
        },
        storyDetail: function (id) {
            //todo: move this to store detail:
            this.app.vent.trigger("load-panel", id, false);
            this.app.mainRegion.$el.hide();
            this.app.mapRegion.$el.show();
        },
        storyDetailFullScreen: function (id) {
            this.app.vent.trigger("load-panel", id, true);
        },
        home: function () {
            this.app.mainRegion.$el.show();
        },
        explore: function () {
            this.app.vent.trigger("zoom-to-extents");
            this.app.mainRegion.$el.hide();
            this.app.mapRegion.$el.show();
            $('#map').css({
                "height": "100vh"
            });
        }
    });
});