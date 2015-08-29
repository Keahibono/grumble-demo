Template.weatherFeed.helpers({
  
  activities: function() {
    return Activities.weather();
  }
});

Template.peopleFeed.events({
  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  }
});
