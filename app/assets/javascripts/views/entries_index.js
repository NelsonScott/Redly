Redly.Views.entriesIndex = Backbone.CompositeView.extend({
  template: JST['entries/index'],

  initialize: function(){
    var that = this;

    this.listenTo(this.collection, 'add', this.attachFeedEntries);
    this.listenTo(this.collection, 'sync add', this.render);
    this.listenTo(this.collection, 'remove', this.removeFeedEntries);
    this.collection.each(function(feed){
      that.attachFeedEntries(feed);
    });
  },

  attachFeedEntries: function(feed){
    var that = this;
    var entries = new Redly.Collections.Entries({feedId: feed.id});
    entries.fetch();

    this.listenTo(entries, 'add', this.attachEntry);
    this.listenTo(entries, 'sync add', this.render);
    // feed.entries().each(function(entry){
      // var entryView = new Redly.Views.entryListItem({model: entry});
      // that.addSubview('ul.entries-index', entryView);
    // });
  },

  attachEntry: function(entry){
    var entryView = new Redly.Views.entryListItem({model: entry});
    this.addSubview('ul.entries-index', entryView);
  },

  removeFeedEntries: function(feed){
    _(this.subviews()).each(function (subviews, selector) {
      _(subviews).each(function (subview) {
        if (subview.model.attributes.feed_id == feed.id){
          subview.remove();
        }
      })
    });
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

});
