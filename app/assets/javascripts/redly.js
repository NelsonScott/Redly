window.Redly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#feeds');
    var feeds = new Redly.Collection.Feeds();
    feeds.fetch();
    
    new Redly.Routers.Router($rootEl);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Redly.initialize();
});
