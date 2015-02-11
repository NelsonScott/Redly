Redly.Views.feedListItem = Backbone.View.extend({
  tagName: "li",

  template: JST['feeds/list_item'],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template({feed: this.model});
    this.$el.html(content);
    return this;
  },
});
