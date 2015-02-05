Redly.Views.feedIndex = Backbone.View.extend({
  template: JST['feeds/index'],

  render: function(){
    var content = this.template({feeds: this.collection});
    this.$el.html(content);

    return this;
  },
});
