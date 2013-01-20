(function($, chrome) {
  "use strict";

  // read providers
  var providers = [];
  for (var v in SP.Providers) {
    providers.push(SP.Providers[v]);
  }

  function processUrl() {

    var l = providers.length;
    var i = 0;

    var loop = function() {
      if (i<l) {
        var provider = providers[i]();
        if (provider.supports(window.location.href)) {
          console.log("Trying", provider.toString());
          provider.detect(function(title) {
            console.log("Detected " + title);
          }, function() {
            i++;
            loop();
          });
        } else {
          i++;
          loop();
        }
      }
    };
    loop();
  }

  $(window).bind('hashchange', function() {
    processUrl();
  });


  chrome.extension.sendMessage({action:'url'}, processUrl);

})(jQuery, chrome);
