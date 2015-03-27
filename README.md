# Redly

[Live Demo][heroku]

Redly is an RSS reader built with Rails that provides customized content to users.  Users can choose relevant news sources, rate entries, and read full length articles.  
[heroku]:https://redly.herokuapp.com

## Minimum Viable Product
- [x] Create accounts
- [x] Log in
- [x] Add feeds
- [x] View feeds
- [x] Rate entries
- [x] View entries' and corresponding ratings
- [x] Periodically Update Feeds with Heroku Scheduler

## Design Docs
* [DB schema][schema]

[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication and login (~1 day)
I will implement user login and authentication using Rails based on the lessons from app academy.  Users will be able to sign up with an email or choose a demo account.  Users will not yet be able to see any feeds or tags, but will see a basic template upon login.  

[Details][phase-one]

### Phase 2: Feeds, JSON API and Backbone Views (~2 days)
Allow users to add feeds from a list, store these selections in the database.  Create feed API for retrieving feed data with corresponding entries.  Create Backbone views to display information about a feed on the homepage. Ensure feeds index returns feeds only for the current user and that URL's are valid.  

[Details][phase-two]

### Phase 3: Add sidebar view, Easier Feed Creation (~1 days)
By this point users should be able to properly add and see feeds on their page.  Enable sidebar to slide in and out to show a list of the user's current feeds.  Change feed creation to be done from the sidebar instead of main page.  Add CSS to position index items and sliding animation on sidebar close/open.

[Details][phase-three]

### Phase 4: Entries, Ratings, & Taggings(~2 days)
Create Model and Controller for entries. Add ability to see a feed's entries.  Enable a user to rate entries from 1 to 5 stars using jquery raty, store ratings in DB.  Use nokogiri to parse sources for images.  Use cloudinary for fast image retrieval.  

[Details][phase-four]

### Phase 5: Search Bar/Feed Selection (~2 days)
Implement a search bar that displays a realtime list of feeds.  Allow a user to just click on a result to add it to their list of feeds.  

[Details][phase-five]

### Bonus Features
- [x] Add Tour of the App using Shepherd

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
