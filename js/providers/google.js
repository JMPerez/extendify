SP.Providers = SP.Providers || {};
SP.Providers.Google = function() {
    // todo: kill current one
    function supports(url) {
      return url.indexOf('www.google.') != -1;
    }
    function detect(callbackFound, clallbackNotFound) {

      setTimeout(function() {
        // see if this an artist page
        if ($('.kno-sh.ellip').text().indexOf('Songs') != -1 || $('.kno-sh.ellip').text().indexOf('Upcoming events') != -1) {
          // fetch artist name
          var artist = $('.kno-ecr-pt').text();
          SP.Search.searchArtist(artist, function(href) {
            // fetch album by that artist
            $.ajax({
              'url': 'http://ws.spotify.com/lookup/1/.json?uri=' + href + '&extras=album'
            }).done(function(data) {
              if (data.artist.albums.length > 0) {
                data.artist.albums.slice(0, 1).forEach(function(a) {
                  $('<iframe src="https://embed.spotify.com/?uri=' + a.album.href + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>')
                    .prependTo('.kno-desc');
                });
              } else {
                clallbackNotFound();
              }
          }, function() {
            clallbackNotFound();
          });
        });
      } else {
        if ($('.kltb-tr.selected').length) {
          var trackName = $('.kltb-tr.selected .kltb-a').text();
          var artistName = $('.klptitle.ellip').eq(0).text();
          SP.Search.searchTrack(trackName + ' - ' + artistName, function(href) {
            $('.appcenter iframe').remove();
            $('<iframe style="position: absolute;left: 741px;top: 33px;" src="https://embed.spotify.com/?uri=' + href + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>')
              .prependTo('.appcenter');
            }, function() {
              clallbackNotFound();
            });
        } else {
          clallbackNotFound();
        }
      }
    }, 1000);
  }
  return {
    supports: supports,
    detect: detect,
    toString: function() {return 'Google';}
  };
};
