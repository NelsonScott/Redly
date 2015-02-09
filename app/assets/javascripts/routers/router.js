Redly.Routers.Router = Backbone.Router.extend({
  initialize: function($content, feeds){
    this.$content = $content;
    this.feeds = feeds;
  },

  routes: {
    "": "entriesIndex",
    "feeds/:id": "feedShow"
  },

  entriesIndex: function(){
    var entriesView = new Redly.Views.entriesIndex({
      collection: this.feeds
    });

    this._swapView(entriesView);
  },

  feedShow: function(id){
    var feed = this.feeds.get(id);
    var feedShow = new Redly.Views.FeedShow({ model: feed });

    this._swapView(feedShow);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$content.html(view.render().$el);
  },
})
