define(["jquery", "marionette", "underscore", "mapbox-lib"], function ($, Marionette, _, L) {
    "use strict";
    var Marker = Marionette.ItemView.extend({
        model: null,
        marker: null,
        modelEvents: {
            'zoom-to-marker': 'zoomTo',
            'center-marker': 'centerMarker'
        },
        
        initialize: function (opts) {
            _.extend(this, opts);
            this.markerOpts = this.markerOpts || {};
            this.initIcons();
            this.marker = L.marker(this.getCoords(), this.getProperties());
            this.marker.bindTooltip(this.model.get("title"), {className: 'myTooltip'});
            this.marker.on('click', this.markerClick.bind(this));
            //this.marker.on('mouseover', this.markerOver.bind(this));
            //this.marker.on('mouseout', this.markerOut.bind(this));
        },

        initIcons: function () {
            var factor = 1.5, baseIconURL = 'https://api.mapbox.com/v4/marker/';
            if (this.markerOpts.color) {
                this.model.set("color", this.markerOpts.color);
            }
            this.icon = L.icon({
                iconUrl: baseIconURL + "pin-m+" + (this.model.get("color") || "CCC") + ".png?access_token=" + this.token,
                iconRetinaUrl: baseIconURL + "pin-m+" + (this.model.get("color") || "CCC") + "@2x.png?access_token=" + this.token,
                iconSize: [30 * factor, 70 * factor],
                iconAnchor: [15 * factor, 35 * factor]
            });
            this.highlightIcon = L.icon({
                iconUrl: baseIconURL + "pin-m+999.png?access_token=" + this.token,
                iconRetinaUrl: baseIconURL + "pin-m+999@2x.png?access_token=" + this.token,
                iconSize: [30 * factor, 70 * factor],
                iconAnchor: [15 * factor, 35 * factor]
            });
            if (this.markerOpts.icon) {
                this.icon = L.icon(this.markerOpts.icon);
            }
            if (this.markerOpts.highlightIcon) {
                this.highlightIcon = L.icon(this.markerOpts.highlightIcon);
            }
        },

        getCoords: function () {
            return [
                this.model.get("lat"),
                this.model.get("long")
            ];
        },

        getProperties: function () {
            return {
                id: this.model.get("id"),
                title: this.model.get("title"),
                "icon": this.icon,
                "originalIcon": this.icon,
                "highlightIcon": this.highlightIcon
            };
        },

        markerClick: function (e) {
            var id = e.target.options.id,
                url = this.markerOpts.clickURL;
            if (url) {
                url = url.replace(":id", id);
                window.location.hash = "#/" + url;
            }
        },

        /*markerOver: function (e) {
            console.log("marker title = " + e.target.options.title);
        },

        markerOut: function (e) {
            console.log("marker ID = " + e.target.options.id);
        },*/

        zoomTo: function (zoom) {
            this.map.setView(this.getCoords(), zoom, { animation: true });
        },

        centerMarker: function () {
            var zoom, target, screenW;
            zoom = this.map.getZoom();
            screenW = $(window).width();
            if (zoom < this.markerOpts.zoomLevelDetail && this.map.reset) {
                zoom = this.markerOpts.zoomLevelDetail;
                this.map.reset = false;
            }
            if (screenW > 700) {
                target = this.map.project(this.getCoords(), zoom).subtract([150, 0]);
                target = this.map.unproject(target, zoom);
                this.map.setView(target, zoom, { animation: true });
            } else {
                this.map.setView(this.getCoords(), zoom, { animation: true });
            }
        }
    });
    return Marker;
});