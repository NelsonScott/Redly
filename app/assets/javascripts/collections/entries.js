Redly.Collections.Entries = Backbone.Collection.extend({
  intialize: function (options) {
    this.feed = options.feed;
  },

  model: Redly.Models.Entry,

  url: function(){
    if (this.feed){
      return "api/feeds/"+this.feed.id+"/entries";
    } else {
      return "api/entries";
    }
  },

});
