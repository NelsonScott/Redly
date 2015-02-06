window.Redly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $content = $('#content');
    var $sidebar = $('#feed-items');
    var feeds = new Redly.Collections.Feeds();
    var entries = window.ent = new Redly.Collections.Entries();
    feeds.fetch();

    var sidebarView = new Redly.Views.sidebar({
      collection: feeds,
      entries: entries
    });
    $sidebar.html(sidebarView.render().$el)


    new Redly.Routers.Router($content, feeds, entries);
    Backbone.history.start();
  }
};
