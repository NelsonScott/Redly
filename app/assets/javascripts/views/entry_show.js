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

    var that = this;
    if (this.model.get('image')){
      that.$('.entry-show-img').attr('src', "http://phette23.github.io/speed-is-a-feature/img/loadingBar.gif")
      PreloadImage(this.model.get('image'), function(){
        that.$('.entry-show-img').attr('src', that.model.get('image'));
      });
    }
    // TODO add more text show feature
    // var shortened = this.$('.entry-show-content').text().substring(0,2500)+"...";
    // this.remaining = this.$('.entry-show-content').text().slice(2500);
    // this.$('.entry-show-content').html(shortened);

    return this;
  },
});

function PreloadImage(imgSrc, callback){
  var objImagePreloader = new Image();

  objImagePreloader.src = imgSrc;
  if(objImagePreloader.complete){
    callback();
    objImagePreloader.onload = function(){};
  }
  else{
    objImagePreloader.onload = function() {
      callback();
      //    clear onLoad, IE behaves irratically with animated gifs otherwise
      objImagePreloader.onload = function(){};
    }
  }
}
