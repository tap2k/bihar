define(["jquery", "marionette", "mapbox-lib", "views/marker", "marker-clusterer"],
    function ($, Marionette, L, MarkerView) {
        "use strict";
        var MapboxView = Marionette.View.extend({
            id: 'map',
            map: null,
            initialized: false,
            markerRoute: null,
            layer: null,
            initialize: function (opts) {
                // optional dataset:
                _.extend(this, opts);
                this.opts = opts;
                this.collection = opts.collection;
                this.listenTo(this.collection, 'reset', this.collectionReset);
                this.listenTo(this.collection, 'filter-applied', this.filterApplied);
                this.listenTo(this.app.vent, 'load-panel', this.highlightMarker);
                this.lastScrolled = 0;
                this.scrollInterval = 1500;
                this.attachEventHandlers();
            },
            attachEventHandlers: function () {
                //var that = this;
                this.listenTo(this.app.vent, 'zoom-to-extents', this.fitMapToLayer);
            },
            onShow: function () {
                this.initMap();
            },
            collectionReset: function () {
                this.renderMarkers();
            },
            filterApplied: function () {
                this.renderMarkers();
            },
            initMap: function () {
                //initialize the map:
                if (this.initialized) {
                    console.log("map already initialized");
                    return;
                }

                L.mapbox.accessToken = 'pk.eyJ1IjoibGciLCJhIjoibWd5aTl2VSJ9.W9ZsT1zQsI9ZP72KtTdZTA';
                this.map = L.mapbox.map('map', "mapbox.light", {
                    zoomControl: false
                }).setView(this.opts.center, this.opts.zoom);

                this.map.reset = true;

                //add logo:
                var logoControl = L.control.attribution({ position: "bottomright" });
                //Powered by
                logoControl.setPrefix('<a class="lg" href="http://localground.org" target="_blank"><img class="lg-logo" src="assets/lg-logo-circle-100.png" />Local Ground</a>');
                logoControl.addTo(this.map);

                //<a href="https://youthradio.org" target="_blank"><img class="lg-logo" src="assets/YR_logo(30x30).png" /></a>
                //add zoom:
                new L.Control.Zoom({ position: 'topright' }).addTo(this.map);
                if (this.options.disableZoomScroll) {
                    this.map.scrollWheelZoom.disable();
                }
                this.initialized = true;
            },
            highlightMarker: function (id) {
                this.layer.eachLayer(function (marker) {
                    if (marker.options.id == id) {
                        marker.setIcon(marker.options.highlightIcon);
                    } else {
                        marker.setIcon(marker.options.originalIcon);
                    }
                });
            },
            renderActiveMarker: function () {
                this.activeMarker = L.marker(this.getCoords(), this.getProperties());
            },
            renderMarkers: function () {
                var itemView,
                    that = this;
                if (this.layer != null) {
                    this.map.removeLayer(this.layer);
                }
                this.layer = L.markerClusterGroup({
                    iconCreateFunction: function (cluster) {
                        return L.icon(that.marker.icon);
                    },
                    maxClusterRadius: 30
                });
                //this.layer = new L.FeatureGroup();
                this.collection.each(function (model) {
                    itemView = new MarkerView({
                        map: that.map,
                        model: model,
                        token: that.opts.accessToken,
                        markerOpts: that.options.marker
                    });
                    that.layer.addLayer(itemView.marker);
                });
                this.map.addLayer(this.layer);
            },

            fitMapToLayer: function () {
                if (this.layer) {
                    this.map.fitBounds(this.layer.getBounds());
                    this.layer.eachLayer(function (marker) {
                        marker.setIcon(marker.options.originalIcon);
                    });
                    this.map.reset = true;
                }
            },

            onDestroy: function () {
                this.undelegateEvents();
                $(this.el).empty();
            }
        });
        return MapboxView;
    });