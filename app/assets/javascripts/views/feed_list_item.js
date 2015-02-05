Redly.Views.feedListItem = Backbone.View.extend({
  template: JST['feeds/list_item'],

  render: function(){
    var content = this.template({feed: this.model});
    this.$el.html(content);

    return this;
  }
});
