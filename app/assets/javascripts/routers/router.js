Redly.Routers.Router = Backbone.Router.extend({
  initialize: function($content, feeds, entries){
    this.$content = $content;
    this.feeds = feeds;
    this.entries = entries;
  },

  routes: {
    "": "entriesIndex",
  },

  entriesIndex: function(){
    // var userEntries = new Redly.Collections.Entries();
    // userEntries.fetch();
    this.entries.fetch();
    var entriesView = new Redly.Views.entriesIndex({
      collection: this.entries
    });

    this._swapView(entriesView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$content.html(view.render().$el);
  },
})
