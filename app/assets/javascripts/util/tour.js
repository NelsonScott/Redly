Redly.Tour = {
  addTourStep: function(tour, options){
    tour.addStep(options.stepName, options)
  },

  newTour: function(){
    var options = {};

    tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows',
      }
    });

    options.stepName = "welcomeStep";
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
    this.addTourStep(tour, options);

    options.stepName = 'showFeeds';
    options.title = 'Your Feeds';
    options.text = 'Here you can see your current list of Feeds in the sidebar.';
    options.attachTo = ".feeds-index";
    this.addTourStep(tour, options);

    options.stepName = 'clickFeed';
    options.title = 'Show Feed';
    options.text = 'Click on a Feed to see Entries Only From That Feed.';
    options.attachTo = '.feed-item-title:first-child bottom';
    options.buttons = [
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
    ];
    this.addTourStep(tour, options);

    options.stepName = 'clickEntry';
    options.title = 'Show Entry';
    options.text = 'Click on an Entry to see The Full Story.';
    options.attachTo = '.entry-title right';
    options.buttons = [
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
    ];
    this.addTourStep(tour, options);

    options.stepName = 'searchForFeed';
    options.title = 'Searching';
    options.text = 'Search for more content by organization (e.g. New York Times) or type of content you want to see (e.g. Tech)';
    options.attachTo = '#new-feed-form';
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
    ]
    this.addTourStep(tour, options);

    options.stepName = 'hideSidebar';
    options.title = 'Sidebar Toggle';
    options.text = 'Click Here to Show/Hide the Sidebar';
    options.attachTo = '.toggle-side bottom';
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
    this.addTourStep(tour, options);

    options.stepName = 'backHome';
    options.title = 'Back Home';
    options.text = 'Click Home to Go Back to your Homepage';
    options.attachTo = ".back-home bottom";
    options.buttons = [
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
    ];
    this.addTourStep(tour, options);

    options.stepName = 'EndTour';
    options.title = "Finish";
    options.text = "Happy Reading!";
    options.attachTo = null;
    options.buttons = [
      {
        text: 'Thanks!',
        classes: 'shepherd-button-secondary',
        action: tour.complete
      }
    ];
    this.addTourStep(tour, options);

    tour.start();
  },
}
