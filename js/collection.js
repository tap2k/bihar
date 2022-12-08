define(["underscore", "backbone", "lib/sqlParser"],
    function (_, Backbone, SqlParser) {
        "use strict";
        /**
         * An "abstract" Backbone Collection; the root of all of the other
         * localground.collections.* classes. Has some helper methods that help
         * Backbone.Collection objects more easily interact with the Local Ground
         * Data API.
         * @class localground.collections.Base
         */
        var Base = Backbone.Collection.extend({
            key: null,
            next: null,
            previous: null,
            count: 0,
            page_size: 100,
            defaults: {
                isVisible: true
            },
            initialize: function (data, opts) {
                _.extend(this, opts);
                this.url = this.api_endpoint + '?page_size=' + this.page_size;
                this.url += '&format=json';
            },
            parse: function (response) {
                this.count = response.count;
                this.next = response.next;
                this.previous = response.previous;
                //console.log(this.next, this.previous, this.count);
                return response.results;
            },
            applyFilter: function (sql) {
                var sqlParser = new SqlParser(sql);
                this.each(function (model) {
                    if (sqlParser.checkModel(model)) {
                        model.set("hidden", false);
                    } else {
                        model.set("hidden", true);
                    }
                });
                this.trigger('filter-applied');
            },
            clearFilter: function () {
                //console.log("clearFilter");
                this.each(function (model) {
                    model.set("hidden", false);
                });
                this.trigger('filter-applied');
            },
            setMediaURLs: function ()
            {
                var that = this;
                this.each(function (model) {
                    that.setPhotoURL(model);
                    that.setAudioURL(model);
                });
            },
            setAudioURL: function (model) {
                if (model.attributes.attached_audio.length == 0)
                {
                    model.set({audio: ""});
                    return;
                }
                var lg_url = "https://localground.org/api/0/audio/" + model.attributes.attached_audio[0].id + '?format=json';
                fetch(lg_url)
                .then((response) => response.json())
                .then((data) => {
                    model.set("audio", data.file_path);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            },
            setPhotoURL: function (model) {
                var lg_url = null;
                model.attributes.attached_photos_videos.forEach(function (mediaModel) {
                    if (mediaModel.overlay_type == "photo")
                        lg_url = "https://localground.org/api/0/photos/" + mediaModel.id;
                });
                if (!lg_url)
                {
                    model.set({photo: ""});
                    return;
                };
                lg_url += '?format=json';
                fetch(lg_url)
                    .then((response) => response.json())
                    .then((data) => {
                        model.set("photo", data.path_medium_sm);
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });
            }
        });
        return Base;
    });
