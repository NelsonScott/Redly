Redly.Views.entryListItem = Backbone.View.extend({
  tagName: 'li',

  attributes: function(){
    return {
      class: 'entry-list-item'
    };
  },

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

  render: function(){
    var div = $('<div></div>').html(this.model.get('description'));
    var desc = div.text();
    var content = this.template({entry: this.model, description: desc});
    this.$el.html(content);
    this.$('.entry-list-description img').remove();
    var shortened = this.$('.entry-list-description').text().substring(0,180)+"...";
    this.$('.entry-list-description').html(shortened);

    return this;
  },

  onRender: function () {
    this.$('.rate-entry').empty();
    var that = this;
    this.$('.rate-entry').raty({
      score: that.model.get('average_rating'),
      hints: ['Just Awful', 'Boring', 'Neutral', 'Interesting', 'Incredible']
    });
  }
});
