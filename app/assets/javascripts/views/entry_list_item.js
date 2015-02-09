Redly.Views.entryListItem = Backbone.View.extend({
  tagName: 'li',

  template: JST['entries/list_item'],

  events: {
    "click .rate-entry": "handleRating"
  },

  handleRating: function(event){
    var score = this.$('.rate-entry').raty('score');
    var entryId = this.model.id;
    $.ajax({
    type: 'POST',
    url: '/ratings',
    data: {entry_id: entryId, entry_val: score} ,
    success: function(msg) {
      if (msg == "Updated rating."){
        console.log("Updated successfully.");
        } else {
          console.log("Added rating successfully.");
        }
      },
    error: function(msg){
      console.log(msg);
      console.log("Error updating rating.");
      }
    });
  },

  getRating: function(){
    var that = this;
    $.ajax({
    type: 'GET',
    url: 'api/entries/'+this.model.id,
    success: function(msg) {
        that.$('.rate-entry').raty({
          half: true,
          score: msg,
          hints: ['Poor', 'Boring', 'Neutral', 'Interesting', 'Incredible']
        });
    },
    error: function(msg){
      console.log("Error finding rating.");
      }
    });
  },

  render: function(){
    var content = this.template({entry: this.model});
    this.$el.html(content);
    return this;
  },

  onRender: function () {
    this.$('.rate-entry').empty();
    this.getRating();
  }
});
