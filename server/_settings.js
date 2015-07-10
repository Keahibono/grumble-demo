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
