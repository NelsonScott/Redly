Redly.Models.Entry = Backbone.Model.extend({
  initialize: function(options){
    this.feedId = options.feedId;
  },

  url: function() {
    return "/api/feeds/" + this.feedId + "/entries/"+this.id;
  },
});
