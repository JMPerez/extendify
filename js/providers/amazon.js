SP.Providers = SP.Providers || {};
SP.Providers.Amazon = function() {
  function supports(url) {
    return url.indexOf("amazon") != -1;
  }
  function detect(callbackFound, callbackNotFound) {
    // see if this a music page

    var subnav = document.getElementById('nav-subnav');
    if (!subnav || subnav.getAttribute('data-category') != 'dmusic') {
      callbackNotFound();
    }

    var albumIndicator = $("#dmusic_digital_buy_button_row .a-text-bold");
    var isAlbum = (albumIndicator.length && albumIndicator.eq(0).text().trim() === "Buy MP3 Album");

    // track name
    var title = $('#handleBuy h1').text().trim();

    // artist name
    var artist = $('#artist_row').text().trim();

    // find the title
    if (title) {
      callbackFound(title + " - " + artist);
      if (isAlbum) {
        SP.Search.searchAlbum(title + " - " + artist, function(href) {
          $('<iframe style="padding:1em; box-sizing: content-box;" src="https://embed.spotify.com/?uri=' + href + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>')
          .prependTo('.productImageGrid');
        }, function() {
          callbackNotFound();
        });
      } else {
        SP.Search.searchTrack(title + " - " + artist, function(href) {
          $('<iframe style="padding:1em; box-sizing: content-box;" src="https://embed.spotify.com/?uri=' + href + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>')
          .prependTo('.productImageGrid');
        }, function() {
          callbackNotFound();
        });
      }
    } else {
      callbackNotFound();
    }
  }

  return {
    supports:supports,
    detect:detect,
    toString: function() {return "Amazon";}
  };
};
