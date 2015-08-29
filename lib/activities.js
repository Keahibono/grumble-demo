Activities = new Mongo.Collection('activities');
// Activities.initEasySearch('activities');

// On Client and Server
// Tags = new Meteor.Collection('tags');

// // name is the field to search over
// Tags.initEasySearch('name');

Activities.allow({
  insert: function(userId, doc) {
    return doc.userId === userId;
  }
});

// Activities.initEasySearch(['firstName', 'text'], {
//     'limit' : 20,
//     'use' : 'mongo-db'
// });

if (Meteor.isServer) {
  // Meteor.startup(function () {
    // code to run on server at startup

    // ########TODO############ use twit stream for live grumble tweets. 

    var Twit = Meteor.npmRequire('twit');

    var T = new Twit({
      consumer_key: "uJbwaikF3EVYg3qObJkKrSsTJ", 
      consumer_secret: "zDRdHaonjAr7r7DssDIq3AVOMwAgd22bAu5uKVuGAEdksgc9kI",
      app_only_auth: true // API secret
    });

    var now = new Date().getTime();

    var wrappedInsert = Meteor.bindEnvironment(function(tweet) {
      // console.log(tweet);
      Activities.insert({
        text: tweet.text,
        userName: tweet.user.screen_name,
        userAvatar: tweet.user.profile_image_url,
        place: tweet.user.location,
        date: new Date
      });
    });

    T.get('search/tweets',
      {
          q: '#grumble',
          lang: 'en',
          count: 100
      },
      function(err, data, response) {
        var statuses = data['statuses'];
        for(var i in statuses) {
          wrappedInsert(statuses[i]);
        }
      }
    );
}

Activities.latest = function() {
  return Activities.find({}, {sort: {date: -1}, limit: 2});
}

Activities.traffic = function() {
  return Activities.find({ text: { $in: [/traffic/] } } );
}

Activities.work = function() {
  return Activities.find({ text: { $in: [/work/, /boss/] } } );
}

Activities.school = function() {
  return Activities.find({ text: { $in: [/school/, /homework/, /study/, /finals/, /teacher/, /exam/, /college/, /university/, /universities/, /test/] } } );
}

Activities.people = function() {
  return Activities.find({ text: { $in: [/people/, /friend/, /family/, /sister/, /brother/, /mom/, /dad/, /coworker/, /dude/, /bitch/, /jerk/, /asshole/, /bf/, /gf/] } } );
}

Activities.weather = function() {
  return Activities.find({ text: { $in: [/weather/, /muggy/, /humid/, /chilly/, /hurricane/, /rain/, /heat/] } } );
}

Activities.politics = function() {
  return Activities.find({ text: { $in: [/politics/, /political/, /president/, /election/, /democart/, /republican/, /senate/, /congress/, /amendment/, /constitution/, /government/] } } );
}

Activities.tech = function() {
  return Activities.find({ text: { $in: [/tech/, /software/, /phone/, /computer/, /laptop/, /program/, /developer/, /javascript/, /code/, /download/, /install/, /virus/, /css/, /electronics/, /robots/] } } );
}

Meteor.methods({
  createActivity: function(activity, tweet, loc) {
    check(Meteor.userId(), String);
    check(activity, {
      text: String
      // image: String
    });
    check(tweet, Boolean);
    // check(loc, Match.OneOf(Object, null));
    
    activity.userId = Meteor.userId();
    activity.userAvatar = Meteor.user().services.twitter.profile_image_url_https;
    activity.userName = Meteor.user().profile.name;
    activity.date = new Date;
    
    // if (! this.isSimulation && loc)
    //   activity.place = getLocationPlace(loc);
    
    var id = Activities.insert(activity);
    
    if (! this.isSimulation && tweet)
      tweetActivity(activity);
    
    return id;
  }
});

if (Meteor.isServer) {
  var twitterOauth = function(options) {
    var config = Meteor.settings.twitter
    var userConfig = Meteor.user().services.twitter;

    return {
      consumer_key: config.consumerKey,
      consumer_secret: config.secret,
      token: userConfig.accessToken,
      token_secret: userConfig.accessTokenSecret
    };
  }
  
  var tweetActivity = function(activity) {
    // creates the tweet text, optionally truncating to fit the appended text
    function appendTweet(text, append) {
      var MAX = 117; // Max size of tweet with image attached
      
      if ((text + append).length > MAX)
        return text.substring(0, (MAX - append.length - 3)) + '...' + append;
      else
        return text + append;
    }
    
    // we need to strip the "data:image/jpeg;base64," bit off the data url
    // var image = activity.image.replace(/^data.*base64,/, '');

    // var response = HTTP.post(
    //   'https://upload.twitter.com/1.1/media/upload.json', {
    //     params: { media: image },
    //     npmRequestOptions: { oauth: twitterOauth() }
    //   }
    // );
    
    // if (response.statusCode !== 200)
    //   throw new Meteor.Error(500, 'Unable to post image to twitter');

    // if (! response.data)
    //   throw new Meteor.Error(500, 'Did not receive attachment from twitter');

    // var attachment = response.data;

    response = HTTP.post(
      'https://api.twitter.com/1.1/statuses/update.json', {
        params: {
          status: appendTweet(activity.text, ' #grumble')
          // media_ids: attachment.media_id_string
        },
        npmRequestOptions: { oauth: twitterOauth() }
      }
    );

    if (response.statusCode !== 200)
      throw new Meteor.Error(500, 'Unable to create tweet');
  }
  
  // var getLocationPlace = function(loc) {
  //   var url = 'https://api.twitter.com/1.1/geo/reverse_geocode.json'
  //     + '?granularity=neighborhood'
  //     + '&max_results=1'
  //     + '&accuracy=' + loc.coords.accuracy
  //     + '&lat=' + loc.coords.latitude
  //     + '&long=' + loc.coords.longitude;
    
  //   var response = HTTP.get(url,
  //                           {npmRequestOptions: { oauth: twitterOauth() } });

  //   if (response.statusCode === 200 && response.data) {
  //     var place = _.find(response.data.result.places, function(place) {
  //       return place.place_type === 'neighborhood';
  //     });
      
  //     return place && place.full_name;
  //   }
  // }
}

// Initialize a seed activity
// Meteor.startup(function() {
//   if (Meteor.isServer && Activities.find().count() === 0) {
//     Activities.insert({
//       recipeName: 'summer-apricots-honey-panna-cotta',
//       text: 'I substituted strawberries for apricots - incredible!',
//       image: '/img/activity/activity-placeholder-strawberry-640x640.jpg',
//       userAvatar: 'https://avatars3.githubusercontent.com/u/204768?v=2&s=400',
//       userName: 'Matt Debergalis',
//       place: 'SoMA, San Francisco',
//       date: new Date
//     });
//   }
// });

// EasySearch.createSearchIndex('recipes', {
//   'field' : ['firstName', 'text'],
//   'collection' : Activities,
//   'props' : {
//     'filteredCategories' : ["traffic", "work"]
//   },
//   'query' : function (searchString) {
//     // Default query that will be used for searching
//     var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

//     // filter for categories if set
//     if (this.props.filteredCategories.length > 0) {
//       query.categories = { $in : this.props.filteredCategories };
//     }

//     return query;
//   }
// });