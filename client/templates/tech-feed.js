Template.techFeed.helpers({
  
  activities: function() {
    return Activities.tech();
  }
});

Template.techFeed.events({
  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});
