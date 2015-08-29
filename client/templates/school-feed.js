Template.schoolFeed.helpers({
  
  activities: function() {
    return Activities.school();
  }
});

Template.schoolFeed.events({
  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});
