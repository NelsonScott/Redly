window.Redly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // alert('Hello from Backbone!');
    var $rootEl = $('#content')
    new Redly.Routers.Router($rootEl);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Redly.initialize();
});
