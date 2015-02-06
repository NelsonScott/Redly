Redly.Views.sidebar = Backbone.CompositeView.extend({
  template: JST['feeds/sidebar'],

  initialize: function(options) {
    var that = this;
    this.entries = options.entries

    this.listenTo(this.collection, 'add', this.attachFeedSubView);
    this.listenTo(this.collection, 'add sync remove', this.render);
    this.collection.each(function(feed){
      that.attachFeedSubView(feed);
    });
  },

  events: {
    "click #add_feed": "addFeed"
  },

  addFeed: function(event){
    event.preventDefault();

    var url = this.$('.URL').val();
    var newFeed = new Redly.Models.Feed({
      url: url
    });
    var that = this;
    newFeed.save({}, {
      success: function(){
        that.collection.add(newFeed);
        that.entries.fetch()
      },
      error: function(){
        console.log("Could not Save Feed.");
      }
    });
  },

  attachFeedSubView: function(feed){
    var feedView = new Redly.Views.feedListItem({model: feed});
    this.addSubview('ul#feeds-index', feedView);
  },

  render: function(){
    // console.log("sidebar render called");
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.entries.fetch();

    return this;
  },
});
