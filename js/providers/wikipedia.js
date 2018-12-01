SP.Providers = SP.Providers || {};
SP.Providers.Wikipedia = () => {
  function supports(url) {
    return url.includes('en.wikipedia.org');
  }

  function getRawWikiContent(callbackSuccess, callbackError) {
    $.ajax({
      url: `${window.location.href}?&action=raw` // http://www.hpl.hp.com/techreports/2007/HPL-2007-182.pdf
    })
      .done(data => {
        callbackSuccess(data);
      })
      .error(data => {
        callbackError();
      });
  }

  function detect(callbackFound, callbackNotFound) {
    const $tracks = $('.haudio .fn');

    let track;
    if ($tracks.length === 1) {
      track = $('.haudio .fn').text();
    }

    if (track) {
      track = track.substr(1, track.length - 2);
      SP.Search.searchTrack(
        track,
        href => {
          $(
            `<iframe style="float:right" src="https://open.spotify.com/embed/?uri=${href}" width="271" height="80" frameborder="0" allowtransparency="true"></iframe>`
          ).prependTo('#bodyContent');
        },
        () => {
          callbackNotFound();
        }
      );
    } else {
      const $box = $('.infobox.vevent').length
        ? $('.infobox.vevent')
        : $('.infobox.vcard');

      if ($box) {
        // look for infoboxes
        getRawWikiContent(data => {
          if (data.includes('Infobox musical artist')) {
            const artist = $box
              .find('th')
              .eq(0)
              .text();
            SP.Search.searchArtist(
              artist,
              href => {
                callbackFound(artist); //todo: add artist
                $(
                  `<iframe style="float:right" src="https://open.spotify.com/embed/?uri=${href}" width="271" height="80" frameborder="0" allowtransparency="true"></iframe>`
                ).prependTo('#bodyContent');
              },
              () => {
                callbackNotFound();
              }
            );
          } else if (data.includes('Infobox album')) {
            // todo: read name and artist
            const albumName = $box
              .find('th')
              .eq(0)
              .text();
            const artistName = $box.find('.contributor').text();
            SP.Search.searchAlbum(
              `${albumName} - ${artistName}`,
              href => {
                callbackFound(`${albumName} - ${artistName}`); //todo: add artist
                $(
                  `<iframe style="float:right" src="https://open.spotify.com/embed/?uri=${href}" width="271" height="80" frameborder="0" allowtransparency="true"></iframe>`
                ).prependTo('#bodyContent');
              },
              () => {
                callbackNotFound();
              }
            );
          } else if (
            data.includes('Infobox song') ||
            data.includes('Infobox single')
          ) {
            // todo: read name, artist, album
            const track = $box
              .find('th')
              .eq(0)
              .text();
            SP.Search.searchTrack(
              track,
              href => {
                callbackFound(track); //todo: add artist
                $(
                  `<iframe style="float:right" src="https://open.spotify.com/embed/?uri=${href}" width="271" height="80" frameborder="0" allowtransparency="true"></iframe>`
                ).prependTo('#bodyContent');
              },
              () => {
                callbackNotFound();
              }
            );
          }
        });
      } else {
        callbackNotFound();
      }
    }
  }

  return {
    supports,
    detect,
    toString() {
      return 'Wikipedia';
    }
  };
};
