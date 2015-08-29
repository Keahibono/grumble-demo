Template.peopleFeed.helpers({
  
  activities: function() {
    return Activities.people();
  }
});

Template.peopleFeed.events({
  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});
