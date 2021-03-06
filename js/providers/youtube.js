SP.Providers = SP.Providers || {};
SP.Providers.Youtube = function() {
  function supports(url) {
    return url.indexOf('youtube.com') != -1;
  }

  function detect(callbackFound, clallbackNotFound) {
    // see if this a music page
    var category = $('.watch-meta-item .title').text();
    if (!category || category.toLowerCase() != 'music') {
      clallbackNotFound();
    }
    // find the title
    // <meta property="og:title" content="PSY - GANGNAM STYLE (강남스타일) M/V">
    var title = $('meta[property="og:title"]').attr('content');

    if (title) {
      SP.Search.searchTrack(
        title,
        function(href) {
          callbackFound(title);
          $(
            '<iframe style="padding:1em" src="https://open.spotify.com/embed/?uri=' +
              href +
              '" width="250" height="80" frameborder="0" allowtransparency="true"></iframe>'
          ).prependTo('#watch7-main');
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
      return 'Youtube';
    }
  };
};
