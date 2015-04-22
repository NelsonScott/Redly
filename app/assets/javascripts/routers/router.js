Redly.Routers.Router = Backbone.Router.extend({
  initialize: function($content, feeds){
    this.$content = $content;
    this.feeds = feeds;

    this.startTour();
  },

  routes: {
    "": "entriesIndex",
    "feeds/:id": "feedShow",
    "feeds/:feedId/entries/:entryId": "entryShow"
  },

  entriesIndex: function(){
    var entriesView = new Redly.Views.entriesIndex({
      collection: this.feeds
    });

    this._swapView(entriesView);
  },

  feedShow: function(id){
    var feed = this.feeds.getOrFetch(id);
    var feedShow = new Redly.Views.FeedShow({ model: feed });

    this._swapView(feedShow);
  },

  entryShow: function(feedId, entryId){
    var entry = new Redly.Models.Entry({
      feedId: feedId,
      id: entryId
    });

    entry.fetch();
    var entryShow = new Redly.Views.EntryShow({ model: entry });

    this._swapView(entryShow);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$content.html(view.render().$el);
  },

  addTourStep: function(tour, stepName, title, text, buttons){
    tour.addStep(stepName, options)
  },

  startTour: function(){
    var options = {};

    tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows',
      }
    });

    options.stepName = ""
    options.title = 'Welcome to Redly!';
    options.text = "Redly lets you organize and read your favorite news stories from different sources all in one place.";
    options.buttons = [
      {
        text: 'Next',
        action: tour.next,
        classes: 'shepherd-button-example-primary'
      },
      {
        text: 'End Tutorial',
        classes: 'shepherd-button-secondary',
        action: tour.complete
      }
    ];
    debugger
    this.addTourStep(tour, options);

    // tour.addStep('welcomeStep', {
    //   title: 'Welcome to Redly!',
    //   text: "Redly lets you organize and read your favorite news stories from different sources all in one place.",
    //   classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    //   buttons: [
    //     {
    //       text: 'Next',
    //       action: tour.next,
    //       classes: 'shepherd-button-example-primary'
    //     },
    //
    //     {
    //       text: 'End Tutorial',
    //       classes: 'shepherd-button-secondary',
    //       action: tour.complete
    //     }
    //   ]
    // });

    tour.addStep('showFeeds', {
      title: 'Your Feeds',
      text: "Here you can see your current list of Feeds in the sidebar.",
      attachTo: ".feeds-index",
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      buttons: [
        {
          text: 'Next',
          action: tour.next,
          classes: 'shepherd-button-example-primary'
        },

        {
          text: 'End Tutorial',
          classes: 'shepherd-button-secondary',
          action: tour.complete
        }
      ]
    });

    tour.addStep('showFeeds', {
      title: 'Show Feed',
      text: "Click on a Feed to see Entries Only From That Feed.",
      attachTo: ".feed-item-title:first-child bottom",
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      buttons: [
        {
          text: 'Next',
          action: function(){
            var feedItem = $('.feed-item-title').first();
            feedItem.effect("highlight", {}, 500, function(event){
              feedItem.trigger('click');
              tour.next();
            });
          },
          classes: 'shepherd-button-example-primary'
        },

        {
          text: 'End Tutorial',
          classes: 'shepherd-button-secondary',
          action: tour.complete
        }
      ]
    });

    tour.addStep('showFeeds', {
      title: 'Show Entry',
      text: "Click on an Entry to see The Full Story.",
      attachTo: ".entry-title right",
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      buttons: [
        {
          text: 'Next',
          action: function(){
            var entryItem = $('.entry-title').first();
            entryItem.effect("highlight", {}, 500, function(event){
              entryItem.trigger('click');
              tour.next();
            });
          },
          classes: 'shepherd-button-example-primary'
        },

        {
          text: 'End Tutorial',
          classes: 'shepherd-button-secondary',
          action: tour.complete
        }
      ]
    });

    tour.addStep('showFeeds', {
      title: 'Searching',
      text: "Search for more content by organization (e.g. New York Times) or type of content you want to see (e.g. Tech)",
      attachTo: "#new-feed-form",
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      buttons: [
        {
          text: 'Next',
          action: tour.next,
          classes: 'shepherd-button-example-primary'
        },

        {
          text: 'End Tutorial',
          classes: 'shepherd-button-secondary',
          action: tour.complete
        }
      ]
    });

    tour.addStep('hideSidebar', {
      title: 'Sidebar Toggle',
      text: "Click Here to Show/Hide the Sidebar",
      attachTo: ".toggle-side bottom",
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      buttons: [
        {
          text: 'Next',
          action: tour.next,
          classes: 'shepherd-button-example-primary'
        },

        {
          text: 'End Tutorial',
          classes: 'shepherd-button-secondary',
          action: tour.complete
        }
      ]
    });

    tour.addStep('hideSidebar', {
      title: 'Back Home',
      text: "Click Home to Go Back to your Homepage",
      attachTo: ".back-home bottom",
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      buttons: [
        {
          text: 'Next',
          action: function(){
            $('.back-home').trigger('click');
            tour.next();
          },
          classes: 'shepherd-button-example-primary'
        },

        {
          text: 'End Tutorial',
          classes: 'shepherd-button-secondary',
          action: tour.complete
        }
      ]
    });

    tour.addStep('hideSidebar', {
      title: 'Finish',
      text: "Happy Reading",
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      buttons: [
        {
          text: 'Thanks!',
          classes: 'shepherd-button-secondary',
          action: tour.complete
        }
      ]
    });

    tour.start();
  },

})
