Redly.Views.EntryShow = Backbone.View.extend({
  template: JST['entries/show'],

  attributes: function(){
    return {
      class: 'entry-show'
    };
  },

  initialize: function(){
      this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
    var content = this.template({ entry: this.model });
    this.$el.html(content);

    return this;
  },
});
