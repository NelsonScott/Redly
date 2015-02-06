Redly.Views.feedListItem = Backbone.View.extend({
  template: JST['feeds/list_item'],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .delete-feed': 'removeSelf'
  },

  removeSelf: function(event){
    this.model.destroy({});
    this.remove();
  },

  render: function(){
    var content = this.template({feed: this.model});
    this.$el.html(content);
    return this;
  }
});
