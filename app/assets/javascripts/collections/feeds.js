Redly.Collections.Feeds = Backbone.Collection.extend({
  model: Redly.Models.Feed,

  url: "api/feeds",

  getOrFetch: function (id) {
    var feed = this.get(id);

    if (!feed) {
      feed = new Redly.Models.Feed({ id: id });
      feed.fetch({
        success: function () {
          this.add(feed);
        }.bind(this)
      });
    } else {
      feed.fetch();
    }

    return feed;
  },

});
