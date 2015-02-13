Redly.Views.sidebar = Backbone.CompositeView.extend({
  template: JST['feeds/sidebar'],

  attributes: function(){
    return {
      class: 'sidebar-content'
    };
  },

  initialize: function() {
    var that = this;

    this.listenTo(this.collection, 'add', this.attachFeedSubView);
    this.listenTo(this.collection, 'add sync', this.render);
    this.listenTo(this.collection, 'remove', this.removeFeed);
    this.collection.each(function(feed){
      that.attachFeedSubView(feed);
    });
  },

  events: {
    "click .add-feed": "addFeed",
    "click .logout": "logoutUser",
    "click .toggle-side": "toggleSlide",
    "focus .URL": "enlargeInput",
    "blur .URL": "shrinkInput",
    "keyup .URL": "searchFeeds",
    "click .feed-result": "addSearchResult"
  },

  enlargeInput: function(){
    this.$('.URL').animate({ width: 130 }, 400);
  },

  shrinkInput: function(){
    this.$('.URL').animate({ width: 80 }, 600);
  },

  toggleSlide: function(){
    this.$el.toggleClass("slide-left");
  },

  logoutUser: function(){
    $.ajax({
    type: 'DELETE',
    url: '/session',
    success: function(msg) {
        if (msg == 'loggedOut') {
            window.location.href = '/users/new';
          }
      },
    error: function(msg){
      console.log("Error logging out");
      }
    });
  },

  searchFeeds: function(event){
    var that = this;

    var term = $(event.target).val();
    $.ajax({
    type: 'GET',
    url: 'api/feeds',
    data: {searchTerm: term},
    success: function(msg) {
      that.$('.search-results').html("");

      _(msg).each(function(result){
        that.$('.search-results').append("<a class='feed-result' data-feed-url="+ result.url+">"+result.title+"</a>"+'<br>');
      });
      },
    error: function(msg){
      console.log("Could not find results.");
      }
    });
  },

  addSearchResult: function(event){
    event.preventDefault;
    this.$('.URL').val($(event.target).data('feedUrl'));
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

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },
});
