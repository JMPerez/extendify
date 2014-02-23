SP.Providers = SP.Providers || {};
SP.Providers.Twitter = function() {
  function supports(url) {
    return url.indexOf("twitter.com") != -1;
  }
  function detect(callbackFound, clallbackNotFound) {
    var findCompleteSpotifyLinks = function(node) {
      $('a[data-expanded-url^="http://open.spotify.com"]', node).each(function(i, a) {
        var url = $(a).attr("data-expanded-url");
        url = url.replace("http://open.spotify.com", "spotify");
        url = url.split("/").join(":");
        if (SP.Lib.isSupportedUri(url)) {
          $('<iframe src="https://embed.spotify.com/?uri=' + url + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>')
            .insertAfter($(a).closest(".tweet-text"));
          }
      });
    };

    var findShortenedSpotifyLinks = function(node) {
      $('a[data-expanded-url^="http://spoti.fi/"]', node).each(function(i, a) {
        $.ajax({
          'url': "http://api.unshort.me/?r=" + a + "&t=json"
        }).done(function(data) {
          if (data.success) {
            var url = data.resolvedURL;
            url = url.replace("http://open.spotify.com", "spotify");
            url = url.split("/").join(":");

            if (SP.Lib.isSupportedUri(url)) {
              $('<iframe src="https://embed.spotify.com/?uri=' + url + '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>')
                .insertAfter($(a).closest(".tweet-text"));
            }
          }
        });
      });
    };

    findCompleteSpotifyLinks(document);
    findShortenedSpotifyLinks(document);

    var list = document.querySelector('.stream-items');

    var insertedNodes = [];
    var observer = new WebKitMutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
          var node = mutation.addedNodes[i];
          findCompleteSpotifyLinks(node);
          findShortenedSpotifyLinks(node);
        }
      });
    });
    observer.observe(list, { childList: true });
  }
  return {
    supports:supports,
    detect:detect,
    toString: function() {return "Twitter";}
  };
};
