Meteor.startup(function() {
  // Potentially prompts the user to enable location services. We do this early
  // on in order to have the most accurate location by the time the user shares
	Accounts.loginServiceConfiguration.remove({
        service : 'twitter'
   	});
 
    Accounts.loginServiceConfiguration.insert({
        service     : 'twitter',
        consumerKey : 'uJbwaikF3EVYg3qObJkKrSsTJ',
        secret      : 'zDRdHaonjAr7r7DssDIq3AVOMwAgd22bAu5uKVuGAEdksgc9kI'
    });

  	Geolocation.currentLocation();
});
