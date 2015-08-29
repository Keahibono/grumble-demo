Template.peopleFeed.helpers({
  
  activities: function() {
    return Activities.people();
  }
});

Template.peopleFeed.events({
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
