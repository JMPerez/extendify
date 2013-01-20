SP.Providers = SP.Providers || {};
SP.Providers.Wikipedia = function() {
  function supports(url) {
    return url.indexOf("en.wikipedia.org") != -1;
  }

  function getRawWikiContent(callbackSuccess, callbackError) {
    $.ajax({
      'url': window.location.href + '?&action=raw' // http://www.hpl.hp.com/techreports/2007/HPL-2007-182.pdf
    }).done(function(data) {
      callbackSuccess(data);
    }).error(function(data) {
      callbackError();
    });
  }

  function detect(callbackFound, callbackNotFound) {

    var $tracks = $('.haudio .fn');

    var track;
    if ($tracks.length === 1) {
      track = $('.haudio .fn').text();
    }

    if (track) {
      track = track.substr(1, track.length-2);
      SP.Search.searchTrack(track, function(href) {
         $('<iframe style="float:right" src="https://embed.spotify.com/?uri=' + href + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>')
          .prependTo('#bodyContent');
      }, function() {
        callbackNotFound();
      });
    } else {
      var $box = $('.infobox.vevent');

      if ($box) {
        // look for infoboxes
        getRawWikiContent(function(data) {
          if (data.indexOf('Infobox album' != -1)) {
            // todo: read name and artist
            var albumName = $box.find('th').eq(0).text();
            var artistName = $box.find(".contributor").text();
            SP.Search.searchAlbum(albumName + " - " + artistName, function(href) {
              callbackFound(albumName + " - " + artistName); //todo: add artist
               $('<iframe style="float:right" src="https://embed.spotify.com/?uri=' + href + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>')
                .prependTo('#bodyContent');
            }, function() {callbackNotFound();});
          } else if (data.indexOf('Infobox song' != -1)) {
            // todo: read name, artist, album
            var track = $box.find('th').eq(0).text();
            SP.Search.searchTrack(track, function(href) {
              callbackFound(track); //todo: add artist
               $('<iframe style="float:right" src="https://embed.spotify.com/?uri=' + href + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>')
                .prependTo('#bodyContent');
            }, function() {callbackNotFound();});
          }
        });
      } else {
        callbackNotFound();
      }
    }
  }

  return {
    supports:supports,
    detect:detect,
    toString: function() {return "Wikipedia";}
  };
};
