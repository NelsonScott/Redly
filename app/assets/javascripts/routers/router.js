Redly.Routers.Router = Backbone.Router.extend({
  initialize: function($rootEl){
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "feedIndex"
  },

  feedIndex: function(){
  },

})
