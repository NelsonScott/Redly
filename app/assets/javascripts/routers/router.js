Redly.Routers.Router = Backbone.Router.extend({
  initialize: function($content, feeds){
    this.$content = $content;
    this.feeds = feeds;
  },

  routes: {
    "": "entriesIndex",
    "feeds/:id": "feedShow",
    "feeds/:feedId/entries/:entryId": "entryShow"
  },

  entriesIndex: function(){
    var entriesView = new Redly.Views.entriesIndex({
      collection: this.feeds
    });
    // TODO need this?
    // this.feeds.fetch();

    this._swapView(entriesView);
  },

  feedShow: function(id){
    var feed = this.feeds.getOrFetch(id);
    var feedShow = new Redly.Views.FeedShow({ model: feed });

    this._swapView(feedShow);
  },

  entryShow: function(feedId, entryId){
    var entry = new Redly.Models.Entry({
      feedId: feedId,
      id: entryId
    });

    entry.fetch();
    var entryShow = new Redly.Views.EntryShow({ model: entry });

    this._swapView(entryShow);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$content.html(view.render().$el);
  },
})
