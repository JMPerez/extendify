SP.Providers = SP.Providers || {};
SP.Providers.Gmail = function() {
  function supports(url) {
    return url.indexOf("mail.google.com") != -1;
  }

  function detect(callbackFound, clallbackNotFound) {

    $('a[href^="http://open.spotify.com/"]').each(function(i, a) {
      var url = $(a).attr("href");
      url = url.replace("http://open.spotify.com", "spotify");
      url = url.split("/").join(":");
      if (SP.Lib.isSupportedUri(url)) {
        $(a).after($('<iframe src="https://embed.spotify.com/?uri=' + url + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>'));
      }
    });
  }

    return {
      supports:supports,
      detect:detect,
      toString: function() {return "Gmail";}
    };
};
