Redly.Routers.Router = Backbone.Router.extend({
  initialize: function($content, $sidebar, feeds){
    this.$content = $content;
    this.$sidebar = $sidebar;
    this.feeds = feeds;
  },

  routes: {
    "": "feedIndex"
  },

  feedIndex: function(){
    // var indexView = new Redly.Views.feedIndex({
    //   collection: this.feeds
    // });
    //
    // this._swapView(indexView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$content.html(view.render().$el);
  },
})
