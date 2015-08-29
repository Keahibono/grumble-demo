Template.politicsFeed.helpers({
  
  activities: function() {
    return Activities.politics();
  }
});

Template.politicsFeed.events({
  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});
