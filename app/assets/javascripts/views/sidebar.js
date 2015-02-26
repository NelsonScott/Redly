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
    // "click .add-feed-btn": "addFeed",
    "click .logout": "logoutUser",
    "click .toggle-side": "toggleSlide",
    "focus .URL": "enlargeInput",
    "blur .URL": "shrinkAndClearInput",
    "keyup .URL": "searchFeeds",
    "click .add-feed-btn": "addSearchResult"
  },

  enlargeInput: function(){
    this.$('.URL').animate({ width: 130 }, 400);
  },

  shrinkAndClearInput: function(){
    this.$('.URL').animate({ width: 80 }, 600);
    // TODO clear input on closing the sidebar instead or when empty search
  },

  toggleSlide: function(){
    this.$el.toggleClass("slide-left");
    this.$('.search-results').html("");
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
        //TODO fix naming
        var test = JST['feeds/test'];
        var content = test({result: result});
        that.$('.search-results').append(content);
      });
      },
    error: function(msg){
      console.log("Could not find results.");
      }
    });
  },

  addSearchResult: function(event){
    event.preventDefault;
    // this.$('.URL').data('feedUrl', $(event.target).data('feedUrl'));
    this.addFeed($(event.target).data('feedUrl'));
  },

  addFeed: function(url){
    // event.preventDefault();

    // var url = this.$('.URL').data('feedUrl');
    if (typeof url == "undefined"){
      console.log("No Feed To Add.");
    } else {
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
    }

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
