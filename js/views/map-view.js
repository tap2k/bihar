define(["marionette",
        "handlebars",
        "views/mapbox",
        "views/story-detail",
        "text!../../templates/map-page.html"],
    function (Marionette, Handlebars, MapboxView, StoryDetail, MapPageTemplate) {
        'use strict';
        var MapLayout = Marionette.LayoutView.extend({
            regions: {
                mapboxRegion: ".map",
                leftPanelRegion: "#left-panel"
            },
            events: {
                'click #search-button': 'closeLeftPanel',
            },
            initialize: function (opts) {
                _.extend(this, opts);
                this.opts = opts;
                Marionette.LayoutView.prototype.initialize.call(this);
                this.listenTo(this.app.vent, 'load-panel', this.loadStoryPanel);
                this.listenTo(this.app.vent, 'zoom-to-extents', this.hideStoryPanel);
            },
            template: function () {
                return Handlebars.compile(MapPageTemplate);
            },
            onShow: function () {
                this.mapboxView = new MapboxView(this.opts);
                this.mapboxRegion.show(this.mapboxView);
            },
            loadStoryPanel: function (id, isFullScreen) {
                var model = this.opts.collection.get(id);
                console.log("photo = " + model.get("photo"));
                this.storyView = new StoryDetail({
                    model: model,
                    isFullScreen: isFullScreen,
                    app: this.app
                });
                this.leftPanelRegion.show(this.storyView);
                $('#map').css({
                    "height": "100vh"
                });
                this.leftPanelRegion.$el.show();
                if (isFullScreen) {
                    this.mapboxRegion.$el.hide();
                } else {
                    this.mapboxRegion.$el.show();
                }
            },
            hideStoryPanel: function () {
                if (this.leftPanelRegion.$el) {
                    this.leftPanelRegion.$el.hide();
                }
                this.mapboxRegion.$el.show();
            },
            closeLeftPanel: function () {
                var elem = document.getElementById('left-panel');
                elem.style.display = "none";
            }        
        });
        return MapLayout;
    });