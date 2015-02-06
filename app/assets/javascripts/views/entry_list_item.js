Redly.Views.entryListItem = Backbone.View.extend({
  tag: 'li',

  template: JST['entries/list_item'],

  render: function(){
    var content = this.template({entry: this.model});
    this.$el.html(content);
    return this;
  },

  onRender: function () {
    this.$('.rate-entry').empty();
    this.$('.rate-entry').raty();
  }
});
