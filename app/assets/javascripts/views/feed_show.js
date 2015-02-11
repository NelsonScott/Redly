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
    event.preventDefault();
    var feed = this.model;
    $.ajax({
    type: 'DELETE',
    url: 'api/user_feeds/'+this.model.id,
    success: function(msg) {
          feed.collection.remove(feed);
      },
    error: function(msg){
      console.log("Error, could not delete feed.");
      }
    });

    this.remove();
  },

  attachFeedEntries: function(feed){
    var that = this;
    var entries = new Redly.Collections.Entries({feedId: feed.id});
    entries.fetch();

    this.listenTo(entries, 'add', this.attachEntry);
    this.listenTo(entries, 'sync', this.render);
    // this.listenTo(entries, 'sync add', this.render);

    // feed.entries().each(function(entry){
    //   var entryView = new Redly.Views.entryListItem({model: entry});
    //   that.addSubview('ul.entries-index', entryView);
    // });
  },

  attachEntry: function(entry){
    var entryView = new Redly.Views.entryListItem({model: entry});
    this.addSubview('ul.entries-index', entryView);
  },

  render: function(){
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();

    return this;
  },
});
