Redly.Collections.Entries = Backbone.Collection.extend({
  initialize: function(options){
    this.feedId = options.feedId;
  },

  model: Redly.Models.Entry,

  url: function(){
    return "/api/feeds/" + this.feedId + "/entries";
  },
});
