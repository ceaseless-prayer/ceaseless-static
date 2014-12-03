var fbAppId = '114260328766572';

var refreshToken = function () {
  $.ajax({
    type: 'GET',
    url: '/refreshToken.php',
    dataType: 'json',
    success: function (data) {
      if (data.success) {
        console.log("token refresh succeeded");
      } else {
        console.log("token refresh failed");
      }
    },
    data: {
      'access_token': FB.getAccessToken(),
      'fb_id': FB.getUserID()
    },
    async: true
  });
};

var authenticate = function (response) {
  if(fbInitActions) {
    if (response.status === 'connected') {
      fbInitActions.connected();
    } else if (response.status === 'not_authorized') {
      if (fbInitActions.not_authorized) {
         fbInitActions.not_authorized();
      } else {
        window.location = '/index.html';
      }
    } else {
      FB.Event.subscribe('auth.authResponseChange', authenticate);
      $('div.loading-spinner').hide();
      $('div.fb-login-wrapper').show();
    }
  }
};

var getPreferences = function () {
  var preferences = {};
  $.ajax({
    type: 'GET',
    url: '/getPreferences.php',
    dataType: 'json',
    success: function (data) {
      preferences = data.preferences || {};
    },
    async: false
  });
  return preferences;
};

var isRegistered = function () {
  var registered;
  $.ajax({
    type: 'GET',
    url: '/checkRegistered.php',
    dataType: 'json',
    success: function (data) {
      registered = data.registered;
    },
    async: false
  });

  return registered;
};

// initalizing the fb lib
window.fbAsyncInit = function () {
  FB.init({
    appId: fbAppId,        // App ID
    status: true,           // check login status
    cookie: true,           // enable cookies to allow the server to access the session
    xfbml: true            // parse page for xfbml or html5 social plugins like login button below
  });
  FB.getLoginStatus(authenticate);
};
