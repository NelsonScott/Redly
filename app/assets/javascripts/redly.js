window.Redly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content')
    new Redly.Routers.Router($rootEl);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Redly.initialize();
});
