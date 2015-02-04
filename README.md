# Redly

[Heroku link][heroku]

[heroku]:

## Minimum Viable Product
Redly is a clone of Feedly with a reddit twist, built on Rails and Backbone. Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [ ] Create feeds
- [ ] Choose feeds
- [ ] Tag feeds
- [ ] Rate feeds
- [ ] View feeds and tags

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication and login (~1 day)
I will implement user login and authentication using Rails based on the lessons from app academy.  Users will be able to sign up with an email or choose a demo account.  Users will not yet be able to see any feeds or tags, but will see a basic template upon login.  

[Details][phase-one]

### Phase 2: Seeds, JSON API and Backbone Views (~2 days)
I will seed the database will some feeds and tags.  I will add API routes to serve feed post data as JSON, then add Backbone
models and collections that fetch data from those routes. The previous Rails views will be transferred to Backbone.

[Details][phase-two]

### Phase 3: Connecting and Configuring Third-Party API (~3 days)
I plan to use third-party APIs to fetch feed data.  I'll need to use the RSS feed reader for rails to parse feed data.  This will involve storing those results in the database and creating corresponding backbone views and models.  

[Details][phase-three]

### Phase 4: Feeds and Ratings (~2 days)
By this point users should be able to properly add and see feeds on their page.  I will now add views to display the ratings and tags next to feed data on the user's page.  This will involve finding the average ratings through SQL and implementing a displaying it in terms of stars.  

[Details][phase-four]

### Phase 5: CSS and Tidying up (~2 days)
Improve site appearance and functionality by adding Bootstrap, improving CSS, and implementing Jquery functions.  Spend time improving the layout and add effects for sliding in/fading out of feeds/tags/ratings.  Optional method to hide these features.  Make sure users can edit and update content.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Display feeds higher based on rating and popularity
- [ ] Pagination of the feeds show
- [ ] Divide page into feeds categories (tech, science, etc)
- [ ] Adding friends and seeing their feeds
- [ ] User pages

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
