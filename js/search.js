var SP = SP || {};
SP.Search = (function() {
  function searchAlbum(albumName, callbackSuccess, callbackError) {
    $.ajax({
      'url': 'https://api.spotify.com/v1/search?type=album&q=' + encodeURI(albumName)
    }).done(function(data) {
      if (data.albums.items.length > 0) {
        // grab the first one
        var result = data.albums.items[0].uri;
        callbackSuccess(result);
      } else {
        callbackError();
      }
    });
  }

  function searchTrack(trackName, callbackSuccess, callbackError) {
    $.ajax({
      'url': 'https://api.spotify.com/v1/search?type=track&q=' + encodeURI(trackName)
    }).done(function(data) {
      if (data.tracks.items.length > 0) {
        // grab the first one
        var result = data.tracks.items[0].uri;
        callbackSuccess(result);
      } else {
        callbackError();
      }
    });
  }

  function searchArtist(artistName, callbackSuccess, callbackError) {
    $.ajax({
      'url': 'https://api.spotify.com/v1/search?type=artist&q=' + encodeURI(artistName)
    }).done(function(data) {
      if (data.artists.items.length > 0) {
        // grab the first one
        var result = data.artists.items[0].uri;
        callbackSuccess(result);
      } else {
        callbackError();
      }
    });
  }

  return {
    searchTrack: searchTrack,
    searchAlbum: searchAlbum,
    searchArtist: searchArtist
  }
})();
