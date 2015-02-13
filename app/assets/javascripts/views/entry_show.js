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
      that.$('.entry-show-img').attr('src', "http://res.cloudinary.com/redly/image/upload/v1423802426/spinner_vbivfw.gif" )
      PreloadImage(this.model.get('image'), function(){
        that.$('.entry-show-img').attr('src', that.model.get('image'));
      });
    }

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
