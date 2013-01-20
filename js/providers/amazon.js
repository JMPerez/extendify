SP.Providers = SP.Providers || {};
SP.Providers.Amazon = function() {
  function supports(url) {
    return url.indexOf("amazon") != -1;
  }
  function detect(callbackFound, clallbackNotFound) {
    // see if this a music page
    var mp3Text = $(".tiny").text();
    if (!mp3Text || mp3Text.indexOf("MP3") == -1) {
      clallbackNotFound();
    }

    // track name
    var track = $("td.songTitle").eq(0).text();
    // 1.
    if (track) {
      track = track.split("1.").join("").trim();
    }

    // artist name
    var artist = $("td.artist").eq(0).text();
    if (!artist) {
      artist = $(".buying span a").text();
    }

    // find the title

    if (track) {
      callbackFound(track + " - " + artist);
      SP.Search.searchTrack(track + " - " + artist, function(href) {
        $('<iframe style="padding:1em" src="https://embed.spotify.com/?uri=' + href + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>')
        .prependTo('.productImageGrid');
      }, function() {
        clallbackNotFound();
      });
    } else {
      clallbackNotFound();
    }
  }

  return {
    supports:supports,
    detect:detect,
    toString: function() {return "Amazon";}
  };
};
