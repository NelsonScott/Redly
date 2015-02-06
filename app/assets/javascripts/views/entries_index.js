Redly.Views.entriesIndex = Backbone.CompositeView.extend({
  template: JST['entries/index'],

  initialize: function(){
    var that = this;

    this.listenTo(this.collection, 'add', this.attachEntrySubView);
    this.listenTo(this.collection, 'sync remove', this.render);
    this.collection.each(function(entry){
      that.attachEntrySubView(entry);
    });
  },

  attachEntrySubView: function(entry){
    var feedView = new Redly.Views.entryListItem({model: entry});
    this.addSubview('ul#entries-index', feedView);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    console.log(this.collection.length);
    this.attachSubviews();

    return this;
  },

});
