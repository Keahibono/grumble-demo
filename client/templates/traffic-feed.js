Template.trafficFeed.helpers({
  
  activities: function() {
    return Activities.traffic();
  }
});

Template.trafficFeed.events({
  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});
