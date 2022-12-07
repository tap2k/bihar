define([
    "jquery",
    "underscore",
    "handlebars",
    "marionette",
    "text!../../templates/place-detail.html",
    "text!../../templates/place-detail-zoom.html",
    "hammerjs",
    "jquery-hammerjs"
], function ($, _, Handlebars, Marionette, StoreTemplate, StoreSheetTemplate, Hammer) {
    "use strict";
    var StoreDetail = Marionette.ItemView.extend({
        events: {
            'click .zoom': 'zoomToMarker',
            'click .close-btn': 'hideSheet',
            'click .previous-place': 'previous',
            'click .next-place': 'next',
            'click .previous-place-zoom': 'previous',
            'click .next-place-zoom': 'next',
            'click #play': 'toggle',
        },
        template: Handlebars.compile(StoreTemplate),
        initialize: function (opts) {
            _.extend(this, opts);
            Marionette.ItemView.prototype.initialize.call(this);
            if (this.isFullScreen) {
                this.template = Handlebars.compile(StoreSheetTemplate);
            } else {
                this.template = Handlebars.compile(StoreTemplate);
            }
        },
        showSheet: function (e) {
            if ($(document).width() > 650) { return; }
            this.app.vent.trigger('load-panel', this.model.get("id"), true);
            if (e) { e.preventDefault(); }
        },
        hideSheet: function (e) {
            this.app.vent.trigger('load-panel', this.model.get("id"), false);
            this.model.trigger("center-marker");
            if (e) { e.preventDefault(); }
        },
        onRender: function () {
            this.addSwipeHandlers();
            var player = this.$el.find('#player').get(0);
            player.addEventListener("timeupdate", this.onTimeUpdate);
        },
        checkIfIsFullScreen: function () {
            return this.$el.find(".mobile-sheet").length > 0;
        },
        addSwipeHandlers: function () {
            //http://stackoverflow.com/questions/30079136/how-to-get-hammer-js-to-work-with-backbone
            //https://github.com/wookiehangover/backbone.hammer/issues/2
            var that = this, div, hammerMain;
            //idea: if fullscreen, div should be image
            div = this.$el.find('.story-detail').get(0);
            if (this.isFullScreen) {
                div = this.$el.find('.zoom-photo-container').get(0);
            }
            if (div) {
                hammerMain = new Hammer(div);
                hammerMain.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
                hammerMain.on('swipeleft', function () {
                    that.next();
                });
                hammerMain.on('swiperight', function () {
                    that.previous();
                });
                hammerMain.on('swipeup', function () {
                    that.showSheet();
                });
                hammerMain.on('swipedown', function () {
                    that.hideSheet();
                });
            }
        },
        navigate: function (url, index) {
            var model = this.model.collection.at(index);
            this.app.router.navigate(url + model.get("id"), {trigger: true});
        },
        previous: function (e) {
            var url = this.isFullScreen ? "places/zoom/" : "places/",
                i = this.model.collection.indexOf(this.model);
            this.navigate(url, (i == 0) ? this.model.collection.length - 1 : i - 1);
            if (e) { e.preventDefault(); }
        },
        next: function (e) {
            var url = this.isFullScreen ? "places/zoom/" : "places/",
                i = this.model.collection.indexOf(this.model);
            this.navigate(url, (i == this.model.collection.length - 1) ? 0 : i + 1);
            if (e) { e.preventDefault(); }
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
            if (e) { e.preventDefault(); }
        },
        toggle: function () {
            var player = this.$el.find('#player').get(0);
            var play = this.$el.find('#play').get(0);
            if (!player.paused)
            {
                play.classList.remove("pause");
                player.pause();
            }
            else
            {
                play.classList.add("pause");
                player.play();
            }
        },
        onTimeUpdate: function(){
            var percent = this.currentTime/this.duration*100;
            var elem = document.getElementById('progress').children[0];
            elem.style.width = percent + "%";
        }
    });
    return StoreDetail;
});