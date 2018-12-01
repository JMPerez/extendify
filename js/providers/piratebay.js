SP.Providers = SP.Providers || {};
SP.Providers.PirateBay = function() {
  function supports(url) {
    return url.indexOf('thepiratebay') != -1;
  }

  function detect(callbackFound, clallbackNotFound) {
    if (
      $('#details')
        .text()
        .indexOf('Audio > Music')
    ) {
      var title = $('#title')[0].firstChild.nodeValue.trim();
      callbackFound(title);
      SP.Search.searchAlbum(
        title,
        function(href) {
          $(
            '<iframe src="https://open.spotify.com/embed/?uri=' +
              href +
              '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>'
          ).prependTo('#title');
        },
        function() {
          clallbackNotFound();
        }
      );
    } else {
      clallbackNotFound();
    }
  }

  return {
    supports: supports,
    detect: detect,
    toString: function() {
      return 'Pirate Bay';
    }
  };
};
