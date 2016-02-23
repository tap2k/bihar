define([
    "jquery",
    "underscore",
    "handlebars",
    "marionette",
    "text!../../templates/place-detail.html",
    "text!../../templates/place-detail-zoom.html"
], function ($, _, Handlebars, Marionette, StoreDetailTemplate, StoreDetailMobileTemplate) {
    "use strict";
    var StoreDetail = Marionette.ItemView.extend({
        events: {
            'click .zoom': 'zoomToMarker',
            'click .previous-place': 'previousPlace',
            'click .next-place': 'nextPlace',
            'click .previous-place-zoom': 'previousPlaceZoom',
            'click .next-place-zoom': 'nextPlaceZoom'
        },
        template: Handlebars.compile(StoreDetailTemplate),
        initialize: function (opts) {
            _.extend(this, opts);
            Marionette.ItemView.prototype.initialize.call(this);
            if (this.isMobile) {
                this.template = Handlebars.compile(StoreDetailMobileTemplate);
            } else {
                this.template = Handlebars.compile(StoreDetailTemplate);
            }
        },
        navigate: function (url, index) {
            var model = this.model.collection.at(index);
            this.app.router.navigate(url + model.get("id"), {trigger: true});
        },
        previous: function (url) {
            var i = this.model.collection.indexOf(this.model);
            this.navigate(url, (i == 0) ? this.model.collection.length - 1 : i - 1);
        },
        next: function (url) {
            var i = this.model.collection.indexOf(this.model);
            this.navigate(url, (i == this.model.collection.length - 1) ? 0 : i + 1);
        },
        previousPlace: function (e) {
            this.previous("places/");
            e.preventDefault();
        },
        previousPlaceZoom: function (e) {
            this.previous("places/zoom/");
            e.preventDefault();
        },
        nextPlace: function (e) {
            this.next("places/");
            e.preventDefault();
        },
        nextPlaceZoom: function (e) {
            this.next("places/zoom/");
            e.preventDefault();
        },
        onShow: function () {
            this.model.trigger("center-marker");
        },
        zoomToMarker: function (e) {
            var zoom = $(e.target).attr("zoom-level");
            if (!zoom) {
                alert("Please give your zoom a \"zoom-level\" attribute.");
            }
            this.model.trigger('zoom-to-marker', zoom);
            e.preventDefault();
        }
    });
    return StoreDetail;
});