var SP = SP || {};
SP.Lib = SP.Lib || {};
SP.Lib.isSupportedUri = function(uri) {
  var supported = ["track", "album", "playlist"];
  var parts = uri.split(":");
  for (var i in supported) {
    if (parts.indexOf(supported[i]) != -1) {
      return true;
    }
  }
  return false;
};
