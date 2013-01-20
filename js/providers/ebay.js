SP.Providers = SP.Providers || {};
SP.Providers.Ebay = function() {
  function supports(url) {
    return url.indexOf('ebay.com') != -1;
  }
  function detect(callbackFound, callbackNotFound) {
    // see if this a music page
    var productDescription = $('.pds-l').text();
    if (!productDescription || productDescription.indexOf('Album Features') == -1) {
      callbackNotFound();
      return;
    }

    var pageTitle = $('.tpc-titr').text();
    var parts = pageTitle.split('by');
    if (parts.length == 1) {
      callbackNotFound();
      return;
    }
    var track = parts[0].trim();
    parts = parts[1].split('(');
    var artist = parts[0].trim();

    // find the title

    if (track) {
      callbackFound(track + ' - ' + artist);
      SP.Search.searchTrack(track + ' - ' + artist, function(href) {
        $('<iframe style="margin: 0 auto;display: block; padding: 1em;" src="https://embed.spotify.com/?uri=' + href + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>')
        .prependTo('.iv.iv-wrpr');
      }, function() {
        callbackNotFound();
      });
    } else {
      callbackNotFound();
    }
  }

  return {
    supports: supports,
    detect: detect,
    toString: function() {return 'Ebay';}
  };
};
