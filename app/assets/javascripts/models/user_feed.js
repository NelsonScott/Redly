Redly.Models.userFeed = Backbone.Model.extend({
  urlRoot: 'api/userFeeds', 

  initialize: function(user_id, feed_id){
    this.user_id = user_id;
    this.feed_id = feed_id;
  },

});
