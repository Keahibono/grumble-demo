Meteor.publish('bookmarkCounts', function() {
  return BookmarkCounts.find();
});

Meteor.publish('news', function() {
  return News.find({}, {sort: {date: -1}, limit: 1});
});

Meteor.publish('latestActivity', function () {
  return Activities.latest();
});

Meteor.publish('feed', function() {
  return Activities.find({}, {sort: {date_created: -1}});
});

Meteor.publish('trafficFeed', function() {
  return Activities.traffic();
});

Meteor.publish('schoolFeed', function() {
  return Activities.school();
});

Meteor.publish('peopleFeed', function() {
  return Activities.people();
});

Meteor.publish('weatherFeed', function() {
  return Activities.weather();
});

Meteor.publish('workFeed', function() {
  return Activities.work();
});

Meteor.publish('politicsFeed', function() {
  return Activities.politics();
});

Meteor.publish('techFeed', function() {
  return Activities.tech();
});

Meteor.publish('recipe', function(name) {
  check(name, String);
  return [
    BookmarkCounts.find({recipeName: name}),
    Activities.find({recipeName: name})
  ];
});

Meteor.startup(function () {
  // code to run on server at startup
});

// autopublish the user's bookmarks and admin status
Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {
    fields: {
      admin: 1,
      bookmarkedRecipeNames: 1,
      'services.twitter.profile_image_url_https': 1
    }
  });
})