window.Redly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    var feeds = new Redly.Collections.Feeds();
    feeds.fetch();

    new Redly.Routers.Router($rootEl, feeds);
    Backbone.history.start();
  }
};
