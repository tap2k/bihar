define(["underscore", "backbone"],
    function (_, Backbone) {
        "use strict";
        var Base = Backbone.Collection.extend({
            initialize: function (data, opts) {
                _.extend(this, opts);
                this.url = this.baseURL + this.endpoint;
            },
            parse: function (response) {
                return response;
            },
            setMediaURLs: function ()
            {
                var that = this;
                this.each(function (model) {
                    //model.set("imageURL", (that.baseURL + model.get("thumbnail").url));
                    //model.set("audioURL", (that.baseURL + model.get("mediafile").url));
                    let imageurl = model.get("mediafile").formats.large ? model.get("mediafile").formats.large.url : model.get("mediafile").url;
                    model.set("imageURL", imageurl);
                    model.set("audioURL", (model.get("audiofile").url))
                });
            }
        });
        return Base;
    });
