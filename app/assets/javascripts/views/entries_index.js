Redly.Views.entriesIndex = Backbone.CompositeView.extend({
  template: JST['entries/index'],

  initialize: function(){
    var that = this;
    this.limit = 20;
    this.count = 0;

    this.listenTo(this.collection, 'add', this.attachFeedEntries);
    this.listenTo(this.collection, 'sync add', this.render);
    this.listenTo(this.collection, 'remove', this.removeFeedEntries);
    this.collection.each(function(feed){
      that.attachFeedEntries(feed);
    });
  },

  attachFeedEntries: function(feed){
    var entries = new Redly.Collections.Entries({feedId: feed.id});
    entries.fetch();

    this.listenTo(entries, 'add', this.attachEntry);
    this.listenTo(entries, 'sync', this.render);
  },

  attachEntry: function(entry){
    if (this.count < this.limit){
      var entryView = new Redly.Views.entryListItem({model: entry});
      this.addSubview('ul.entries-index', entryView);
      this.count++;
    }
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
