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
                    model.set("imageURL", (that.baseURL + model.get("image").url));
                    model.set("audioURL", (that.baseURL + model.get("audio").url));
                });
            }
        });
        return Base;
    });
