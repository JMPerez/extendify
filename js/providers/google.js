SP.Providers = SP.Providers || {};
SP.Providers.Google = function() {
  // todo: kill current one
  function supports(url) {
    return url.indexOf('www.google.') != -1;
  }

  var ResultTypes = {
    artist: 0,
    album: 1,
    track: 2,
    other: -1
  };

  function getResultType() {
    // get type
    var resultType = $('.kno-result ._Gr').text();
    if (
      resultType.indexOf('followers on Google+') !== -1 &&
      $('._Ve.kno-sh')
        .text()
        .indexOf('Songs') !== -1
    ) {
      return ResultTypes.artist;
    } else {
      switch (resultType) {
        case 'Band':
          return ResultTypes.artist;
        case 'Musical Album':
          return ResultTypes.album;
        default:
          return ResultTypes.other;
      }
    }
  }

  function getName() {
    var name = $('.kno-result .kno-ecr-pt').text();
    return name;
  }

  function getPlaceholder() {
    return $('.kno-fb-ctx._Wv');
  }

  function detect(callbackFound, callbackNotFound) {
    setTimeout(function() {
      var resultType = getResultType(),
        name = getName();
      switch (resultType) {
        case ResultTypes.artist:
          SP.Search.searchArtist(name, function(href) {
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
                      '<iframe src="https://open.spotify.com/embed/?uri=' +
                        a.album.href +
                        '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>'
                    ).appendTo(getPlaceholder());
                  });
                } else {
                  callbackNotFound();
                }
              },
              function() {
                callbackNotFound();
              }
            );
          });
          break;

        case ResultTypes.album:
          SP.Search.searchAlbum(name, function(href) {
            // fetch album by that artist
            $.ajax({
              url: 'http://ws.spotify.com/lookup/1/.json?uri=' + href
            }).done(
              function(data) {
                if (data.album) {
                  $(
                    '<iframe src="https://open.spotify.com/embed/?uri=' +
                      data.album.href +
                      '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>'
                  ).appendTo(getPlaceholder());
                } else {
                  callbackNotFound();
                }
              },
              function() {
                callbackNotFound();
              }
            );
          });
          break;
      }
    }, 1000);
  }
  return {
    supports: supports,
    detect: detect,
    toString: function() {
      return 'Google';
    }
  };
};
