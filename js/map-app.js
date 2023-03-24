define([
    "jquery",
    "marionette",
    "backbone",
    "router",
    "collection",
    "views/splash-view",
    "views/map-view",
    "handlebars-helpers"
], function ($, Marionette, Backbone, Router, Collection, SplashView, MapView) {
    "use strict";
    var MapApp = Marionette.Application.extend({
        regions: {
            mainRegion: ".splash-page",
            mapRegion: ".map-page",
        },
        start: function (options) {
            // Perform the default 'start' functionality
            Marionette.Application.prototype.start.apply(this, [options]);
            this.router = new Router({ app: this});
            //Backbone.history.start();
        },
        isMobile: function () {
            return $(document).width() < 700;
        },
        initialize: function (options) {
            Marionette.Application.prototype.initialize.apply(this, [options]);

            //fetch data:
            this.collection = new Collection(null, {
                baseURL: 'http://localhost:1337',
                endpoint: '/api/getContentForChannel?uniqueID=bihar',
            });
            this.collection.fetch({ reset: true })
                .then(() => {this.collection.setMediaURLs(); Backbone.history.start()});
            
            //initialize views:
            this.mainView = new SplashView({
                app: this
            });
            this.mapView = new MapView({
                collection: this.collection,
                app: this,
                //accessToken: "pk.eyJ1IjoibGciLCJhIjoibWd5aTl2VSJ9.W9ZsT1zQsI9ZP72KtTdZTA",
                //styleID: "lg/cikx1uo6900eh92kl5iy354t1",
                center: [39.889, -97.114],
                zoom: 4,
                //disableZoomScroll: true,
                marker: {
                    clickURL: "places/:id",
                    //color: "eb6627",
                    icon: {
                        iconUrl: 'assets/iconselected.png',
                        iconSize: [50, 50],
                        iconAnchor: [25, 25]
                    },
                    highlightIcon: {
                        iconUrl: 'assets/iconselected.png',
                        iconSize: [100, 100],
                        iconAnchor: [50, 50]
                    },
                    clusterIcon: {
                        iconUrl: 'assets/iconcluster.png',
                        iconSize: [50, 50],
                        iconAnchor: [25, 25]
                    },
                    zoomLevelDetail: 16 //14
                }
            });

            //load views into regions:
            this.mainRegion.show(this.mainView);
            this.mapRegion.show(this.mapView);
        },
    });
    return MapApp;
});
