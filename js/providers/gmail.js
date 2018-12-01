SP.Providers = SP.Providers || {};
SP.Providers.Gmail = function() {
  function supports(url) {
    return url.indexOf('mail.google.com') != -1;
  }

  function detect(callbackFound, clallbackNotFound) {
    [
      'http://open.spotify.com',
      'https://open.spotify.com',
      'http://play.spotify.com',
      'https://play.spotify.com'
    ].each(function(base) {
      $('a[href^="' + base + '/"]').each(function(i, a) {
        var url = $(a).attr('href');
        url = url.replace(base, 'spotify');
        url = url.split('/').join(':');
        if (SP.Lib.isSupportedUri(url)) {
          $(a).after(
            $(
              '<iframe src="https://open.spotify.com/embed/?uri=' +
                url +
                '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>'
            )
          );
        }
      });
    });
  }

  return {
    supports: supports,
    detect: detect,
    toString: function() {
      return 'Gmail';
    }
  };
};
