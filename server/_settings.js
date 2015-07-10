// Provide defaults for Meteor.settings
//
// To configure your own Twitter keys, see:
//   https://github.com/meteor/meteor/wiki/Configuring-Twitter-in-Local-Market
if (typeof Meteor.settings === 'undefined')
  Meteor.settings = {};

_.defaults(Meteor.settings, {
  twitter: {
    consumerKey: "uJbwaikF3EVYg3qObJkKrSsTJ", 
    secret: "zDRdHaonjAr7r7DssDIq3AVOMwAgd22bAu5uKVuGAEdksgc9kI"
  }
});

ServiceConfiguration.configurations.upsert(
  { service: "twitter" },
  {
    $set: {
      consumerKey: Meteor.settings.twitter.consumerKey,
      secret: Meteor.settings.twitter.secret
    }
  }
);

ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      clientId: "1624452264458581",
      loginStyle: "popup",
      secret: "7911016187a44b373d0e8b81a944f3b3"
    }
  }
);

ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      clientId: "959537698298-o6m1fvqvt717maifjp196bemi3ku00hu.apps.googleusercontent.com",
      loginStyle: "popup",
      secret: "vfbVr4zNmQFTAARGBq2jiPeX"
    }
  }
);
