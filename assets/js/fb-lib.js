var fbAppId = '114260328766572';

var refreshToken = function(){
  $.ajax({
    type: 'GET',
    url: 'refreshToken.php',
    dataType: 'json',
    success: function(data){
      if(data.success){
        console.log("token refresh succeeded");
      } else {
        console.log("token refresh failed");
      }
    },
    data: {
            'access_token': FB.getAccessToken(),
    'fb_id': FB.getUserID()
          },
    async:true
  });
};

var authenticate = function(response){
  if (response.status === 'connected') {
    refreshToken();
    $("div.loading_spinner").hide();
    $("div.refreshed").show();
  } else if (response.status === 'not_authorized') {
    window.location = "/";
  } else {
    $("div.loading_spinner").hide();
    $("div.fb-login-wrapper").show();
  }
};

// initalizing the fb lib
window.fbAsyncInit = function() {
  FB.init({
    appId      : fbAppId,        // App ID
    status     : true,           // check login status
    cookie     : true,           // enable cookies to allow the server to access the session
    xfbml      : true            // parse page for xfbml or html5 social plugins like login button below
  });

  FB.Event.subscribe('auth.authResponseChange', authenticate);
  FB.getLoginStatus(authenticate);
};
