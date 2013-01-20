var SP = SP || {};
SP.Search = (function() {
  function searchAlbum(albumName, callbackSuccess, callbackError) {
    var attempts = 10;
    var loop = function() {
      if (attempts<0) {
        callbackError();
        return;
      }
      $.ajax({
        'url': 'http://ws.spotify.com/search/1/album.json?q=' + encodeURI(albumName)
      }).done(function(data) {
        if (data.info.num_results > 0 && data.albums.length > 0) {
          // grab the first one
          var result = data.albums[0].href;
          callbackSuccess(result);
        } else {
          callbackError();
        }
      }).error(function() {
        attempts--;
        setTimeout(
          function() {
            loop();
          }, 1000);
      });
    };
    loop();
  }

  function searchTrack(trackName, callbackSuccess, callbackError) {
    var attempts = 10;
    var loop = function() {
      if (attempts<0) {
        callbackError();
        return;
      }
      $.ajax({
        'url': 'http://ws.spotify.com/search/1/track.json?q=' + encodeURI(trackName)
      }).done(function(data) {
        if (data.info.num_results > 0 && data.tracks.length > 0) {
          // grab the first one
          var result = data.tracks[0].href;
          callbackSuccess(result);
        } else {
          callbackError();
        }
      }).error(function() {
        attempts--;
        setTimeout(
          function() {
            loop();
          }, 1000);
      });
    };
    loop();
  }

  function searchArtist(artistName, callbackSuccess, callbackError) {
    var attempts = 10;
    var loop = function() {
      if (attempts<0) {
        callbackError();
        return;
      }
      $.ajax({
        'url': 'http://ws.spotify.com/search/1/artist.json?q=' + encodeURI(artistName)
      }).done(function(data) {
        if (data.info.num_results > 0 && data.artists.length > 0) {
          // grab the first one
          var result = data.artists[0].href;
          callbackSuccess(result);
        } else {
          callbackError();
        }
      }).error(function() {
        attempts--;
        setTimeout(
          function() {
            loop();
          }, 1000);
      });
    };
    loop();
  }

  return {
    searchTrack: searchTrack,
    searchAlbum: searchAlbum,
    searchArtist: searchArtist
  }
})();
