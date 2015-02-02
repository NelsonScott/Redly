# Phase 2: Seeds, JSON API and Backbone Views

## Rails
### Models

### Controllers
Api::FeedsController (create, destroy, index, show)
Api::TagsController (create, destroy, show, update)

### Views
* feeds/show.json.jbuilder

## Backbone
### Models
* Feed
* Tag

### Collections
* Feeds
* Tags

### Views
* FeedShow (composite view, contains TagShow subviews)
* TagShow

## Gems/Libraries
