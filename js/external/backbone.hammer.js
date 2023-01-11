(function(root){
  var Backbone = root.Backbone;
  var _ = root._;
  var $ = Backbone.$;

  if( !Backbone || !$.fn.hammer ){
    return;
  }

  var delegateEvents = Backbone.View.prototype.delegateEvents;
  var undelegateEvents = Backbone.View.prototype.undelegateEvents;

  Backbone.View.prototype.delegateEvents = function(){
    var events = this.hammerEvents;
    if( events ){
      var options = this.hammerOptions || {};
      var hammerContext = _.extend({}, this, {
        $el: this.hammer(options)
      });
      delegateEvents.call(hammerContext, events);
    }
    return delegateEvents.apply(this, arguments);
  };

  Backbone.View.prototype.undelegateEvents = function(){
    this.hammer().off('.delegateEvents' + this.cid);
    return undelegateEvents.apply(this, arguments);
  };

  Backbone.View.prototype.hammer = function(options){
    return this.$el.hammer(options);
  };
})(window);
