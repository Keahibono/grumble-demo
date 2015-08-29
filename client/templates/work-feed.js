Template.workFeed.helpers({
  
  activities: function() {
    return Activities.work();
  }
});

Template.workFeed.events({
  'click .js-share': function() {
    Overlay.open('shareOverlay', this);
  },
  'click .js-back': function(event) {
    nextInitiator = 'back';
    
    // XXX: set the back transition via Location.back() when IR 1.0 hits
    history.back();
    event.stopImmediatePropagation();
    event.preventDefault();
  },
});
