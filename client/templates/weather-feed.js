Template.weatherFeed.helpers({
  
  activities: function() {
    return Activities.weather();
  }
});

Template.weatherFeed.events({
  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});
