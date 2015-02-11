Redly.Views.FeedShow = Backbone.CompositeView.extend({
  template: JST['feeds/show'],

  attributes: function(){
    return {
      class: 'feed-show'
    };
  },

  initialize: function(){
      this.attachFeedEntries(this.model);
      this.listenTo(this.model, 'sync', this.attachFeedEntries);
      this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .delete-feed': 'removeSelf'
  },

  removeSelf: function(event){
    this.model.destroy({});
    this.remove();
  },

  attachFeedEntries: function(feed){
    var that = this;
    feed.entries().each(function(entry){
      var entryView = new Redly.Views.entryListItem({model: entry});
      that.addSubview('ul.entries-index', entryView);
    });
  },

  render: function(){
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();

    return this;
  },
});
