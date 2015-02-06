Redly.Routers.Router = Backbone.Router.extend({
  initialize: function($content, feeds){
    this.$content = $content;
    this.feeds = feeds;
  },

  routes: {
    "": "entriesIndex",
  },

  entriesIndex: function(){
    var userEntries = new Redly.Collections.Entries();
    userEntries.fetch();
    var entriesView = new Redly.Views.entriesIndex({
      collection: userEntries
    });

    this._swapView(entriesView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$content.html(view.render().$el);
  },
})
