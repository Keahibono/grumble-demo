Template.bookmarks.helpers({
  recipeCount: function() {
    return pluralize(this.length, 'recipe');
  }
});

Template.bookmarks.events({
  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});
