Redly.Views.sidebar = Backbone.CompositeView.extend({
  template: JST['feeds/sidebar'],

  attributes: function(){
    return {
      class: 'sidebar-content'
    };
  },

  initialize: function() {
    var that = this;
    this.handleScrolling();

    this.listenTo(this.collection, 'add', this.attachFeedSubView);
    this.listenTo(this.collection, 'add sync', this.render);
    this.listenTo(this.collection, 'remove', this.removeFeed);
    this.collection.each(function(feed){
      that.attachFeedSubView(feed);
    });
  },

  events: {
    "click .add_feed": "addFeed",
    "click .logout": "logoutUser",
    "click .toggle-side": "toggleSlide",
    "focus .URL": "enlargeInput",
    "blur .URL": "shrinkInput",
  },

  enlargeInput: function(){
    this.$('.URL').animate({ width: 130 }, 400);
  },

  shrinkInput: function(){
    this.$('.URL').animate({ width: 80 }, 600);
  },

  toggleSlide: function(){
    if (this.$el.offset().left >= 0){
      this.$el.animate({left: "-=175px"});
    } else {
      this.$el.animate({
        left: "+=175px"
      }, 500);
    }
    // if (this.$el.hasClass("slide-left")){
    //   this.$el.removeClass("slide-left");
    // } else{
    //   this.$el.addClass("slide-left");
    // }

    // var that = this;
    // if (this.$('#sidebar-content').is(":visible")){
    //   this.$('#sidebar-content').toggle("slide", 500, function(){
    //     that.$('.open-side').css("visibility", "visible");
    //   });
    // } else{
    //     that.$('.open-side').css("visibility", "hidden");
    //   this.$('#sidebar-content').toggle("slide", 400, function(){
    //   });
    // }
  },

  logoutUser: function(){
    $.ajax({
    type: 'DELETE',
    url: '/session',
    success: function(msg) {
        if (msg == 'loggedOut') {
            window.location.href = '/session/new';
          }
      },
    error: function(msg){
      console.log("Error logging out");
      }
    });
  },

  addFeed: function(event){
    event.preventDefault();

    var url = this.$('.URL').val();
    var newFeed = new Redly.Models.Feed({
      url: url
    });

    var that = this;
    newFeed.save({}, {
      success: function(msg){
        that.collection.add(newFeed);
      },
      error: function(msg){
        console.log("Error adding Feed.");
      }
    });

    this.$('input').val("");
  },

  removeFeed: function(feed){
    var subview = _.find(
     this.subviews("ul.feeds-index"),
     function (subview) {
       return subview.model === feed;
     }
   );

   this.removeSubview("ul.feeds-index", subview);
   this.render();
  },

  attachFeedSubView: function(feed){
    var feedView = new Redly.Views.feedListItem({model: feed});
    this.addSubview('ul.feeds-index', feedView);
  },

  handleScrolling: function(){
    // var $sidebar = $("#sidebar"),
    //     $window = $(window),
    //     offset = $sidebar.offset();
    //
    // $window.scroll(function() {
    //     if ($window.scrollTop() > offset.top) {
    //         $sidebar.css('margin-top', $window.scrollTop() - offset.top);
    //     } else {
    //         $sidebar.css('margin-top', 0);
    //     }
    // });
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },
});
