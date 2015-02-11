Redly.Models.Feed = Backbone.Model.extend({
  urlRoot: "api/feeds",

  // parse: function(response){
  //   if (response.latest_entries){
  //     this.entries().set(response.latest_entries, {parse: true});
  //     delete response.latest_entries;
  //   }
  //
  //   return response;
  // },

  // entries: function(){
  //   if (!this._entries){
  //     this._entries = new Redly.Collections.Entries([], {feed: this});
  //   }
  //
  //   return this._entries;
  // }
});
