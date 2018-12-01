class TokenFetcher {
  constructor() {
    this.lastFetched = 0;
    this.accessToken = null;
  }
  fetchAccessToken() {
    return new Promise((resolve, reject) => {
      if (Date.now() - this.lastFetched > 60 * 60 * 1000) {
        fetch('https://spotify-web-api-token.herokuapp.com/token?ref=extendify')
          .then(r => r.json())
          .then(data => {
            this.lastFetched = Date.now();
            this.accessToken = data.token;
            resolve(data.token);
          });
      } else {
        resolve(this.accessToken);
      }
    });
  }
}

class Search {
  constructor(tokenFetcher) {
    this.tokenFetcher = tokenFetcher;
  }
  searchAlbum(albumName, callbackSuccess, callbackError) {
    this.tokenFetcher.fetchAccessToken().then(accessToken => {
      console.log({ accessToken });
      fetch(
        `https://api.spotify.com/v1/search?type=album&q=${encodeURI(
          albumName
        )}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
        .then(r => r.json())
        .then(data => {
          if (data.albums.items.length > 0) {
            // grab the first one
            const result = data.albums.items[0].uri;
            callbackSuccess(result);
          } else {
            callbackError();
          }
        });
    });
  }

  searchTrack(trackName, callbackSuccess, callbackError) {
    this.tokenFetcher.fetchAccessToken().then(accessToken => {
      console.log({ accessToken });
      fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURI(
          trackName
        )}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
        .then(r => r.json())
        .then(data => {
          if (data.tracks.items.length > 0) {
            // grab the first one
            const result = data.tracks.items[0].uri;
            callbackSuccess(result);
          } else {
            callbackError();
          }
        });
    });
  }

  searchArtist(artistName, callbackSuccess, callbackError) {
    this.tokenFetcher.fetchAccessToken().then(accessToken => {
      fetch(
        `https://api.spotify.com/v1/search?type=artist&q=${encodeURI(
          artistName
        )}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
        .then(r => r.json())
        .then(data => {
          if (data.artists.items.length > 0) {
            // grab the first one
            const result = data.artists.items[0].uri;
            callbackSuccess(result);
          } else {
            callbackError();
          }
        });
    });
  }
}

window.SP = window.SP || {};
SP.Search = new Search(new TokenFetcher());
