# Redly

[Heroku link][heroku]

[heroku]:https://redly.herokuapp.com/session/new

## Minimum Viable Product
Redly is a clone of Feedly that allows users to rate and tag entries, built on Rails and Backbone. Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Add feeds
- [x] View feeds
- [ ] Tag entries
- [x] Rate entries
- [ ] View entries' tags and ratings

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication and login (~1 day)
I will implement user login and authentication using Rails based on the lessons from app academy.  Users will be able to sign up with an email or choose a demo account.  Users will not yet be able to see any feeds or tags, but will see a basic template upon login.  

[Details][phase-one]

### Phase 2: Feeds, JSON API and Backbone Views (~2 days)
Allow users to create feeds with a URL, store these URLs in the database.  Create feed API for retrieving feed data with corresponding entries.  Create Backbone views to display information about a feed on the homepage. Ensure feeds index returns feeds only for the current user and that URL's are valid.  

[Details][phase-two]

### Phase 3: Add sidebar view, Easier Feed Creation (~1 days)
By this point users should be able to properly add and see feeds on their page.  Have sidebar to slide open to show a list of the user's current feeds to select from.  Also change Feed creation to be done from the sidebar instead of with the current separate form.

[Details][phase-three]

### Phase 4: Entries, Ratings, & Taggings(~2 days)
Create Model and Controller for entries. Add ability to see a feed's entries.  Allow user to rate entries from 1 to 5 stars using jquery raty and rails controllers.  Create tags for feeds in order to better organize them.  Use nokogiri to parse sources for images.

[Details][phase-four]

### Phase 5: Search Bar/Feed Selection (~2 days)
Implement a search bar that displays a realtime preview of feeds to select from.  Allow a user to click on a result to add it to their list of feeds.  

[Details][phase-five]

### Bonus Features
- [ ] Display feeds higher based on rating and popularity
- [ ] Pagination of the feeds show
- [ ] Divide page into feeds categories (tech, science, etc)
- [ ] Add a feeds suggestion index

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
