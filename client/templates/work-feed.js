Template.workFeed.helpers({
  
  activities: function() {
    return Activities.work();
  }
});

Template.workFeed.events({
  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});
