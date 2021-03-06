SP.Providers = SP.Providers || {};
SP.Providers.AllMusic = function() {
  function supports(url) {
    return url.indexOf('allmusic.com') != -1;
  }
  function detect(callbackFound, clallbackNotFound) {
    // see if this a music page
    var albumArtist = $('.album-artist')
      .text()
      .trim();
    var albumTitle = $('.album-title')
      .text()
      .trim();

    if (albumArtist && albumTitle) {
      callbackFound(albumTitle + ' - ' + albumArtist);
      SP.Search.searchAlbum(
        albumTitle + ' - ' + albumArtist,
        function(href) {
          $(
            '<iframe style="padding-bottom: 1em" src="https://open.spotify.com/embed/?uri=' +
              href +
              '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>'
          ).prependTo('.content');
        },
        function() {
          clallbackNotFound();
        }
      );
    } else {
      var songArtist = $('.song-artist')
        .text()
        .trim();
      var songTitle = $('.song-title')
        .text()
        .trim();

      if (songArtist && songTitle) {
        callbackFound(songTitle + ' - ' + songArtist);
        SP.Search.searchAlbum(
          songTitle + ' - ' + songArtist,
          function(href) {
            $(
              '<iframe style="padding-bottom: 1em" src="https://open.spotify.com/embed/?uri=' +
                href +
                '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>'
            ).prependTo('.content');
          },
          function() {
            clallbackNotFound();
          }
        );
      } else {
        var artist = $('.artist-name')
          .text()
          .trim();
        if (artist) {
          SP.Search.searchArtist(artist, function(href) {
            // fetch album by that artist
            $.ajax({
              url:
                'http://ws.spotify.com/lookup/1/.json?uri=' +
                href +
                '&extras=album'
            }).done(
              function(data) {
                if (data.artist.albums.length > 0) {
                  data.artist.albums.slice(0, 1).forEach(function(a) {
                    $(
                      '<iframe style="padding-bottom: 1em" src="https://open.spotify.com/embed/?uri=' +
                        a.album.href +
                        '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>'
                    ).prependTo('.content');
                  });
                } else {
                  clallbackNotFound();
                }
              },
              function() {
                clallbackNotFound();
              }
            );
          });
        } else {
          clallbackNotFound();
        }
      }
    }
  }
  return {
    supports: supports,
    detect: detect,
    toString: function() {
      return 'All Music';
    }
  };
};
