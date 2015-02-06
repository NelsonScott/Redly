window.Redly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $content = $('#content');
    var $sidebar = $('#feed-items');
    var feeds = new Redly.Collections.Feeds();
    feeds.fetch();

    var sidebarView = new Redly.Views.sidebar({
      collection: feeds
    });
    $sidebar.html(sidebarView.render().$el)


    new Redly.Routers.Router($content, feeds);
    Backbone.history.start();
  }
};
