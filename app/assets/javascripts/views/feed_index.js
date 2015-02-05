Redly.Views.feedIndex = Backbone.CompositeView.extend({
  template: JST['feeds/index'],

  initialize: function(){
    var that = this;
    this.listenTo(this.collection, 'add', this.attachFeedSubView);
    this.collection.each(function(feed){
      that.attachFeedSubView(feed);
    });
  },

  attachFeedSubView: function(feed){
    var feedView = new Redly.Views.feedListItem({model: feed});
    this.addSubview('ul#feeds-index', feedView);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);

    return this;
  },
});
