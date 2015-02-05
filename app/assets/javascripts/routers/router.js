Redly.Routers.Router = Backbone.Router.extend({
  initialize: function($rootEl, feeds){
    this.$rootEl = $rootEl;
    this.feeds = feeds;
  },

  routes: {
    "": "feedIndex"
  },

  feedIndex: function(){
    
  },

})
