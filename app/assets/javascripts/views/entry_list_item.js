Redly.Views.entryListItem = Backbone.View.extend({
  template: JST['entries/list_item'],

  render: function(){
    var content = this.template({entry: this.model});
    this.$el.html(content);

    return this;
  },
});
