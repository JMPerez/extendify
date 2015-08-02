# Extendify

This is a Google Chrome Extension that appends a [Spotify Play Button](https://developer.spotify.com/technologies/widgets/spotify-play-button/) to the website you are browsing if it detects references to tracks, albums or artists that exist on Spotify.

The extension only tries to fetch a Spotify Play Button when it makes sure the displayed content refers to a potential music item, thus avoiding making a large amount of requests, keeping a fast browsing experience. The SPB control is injected in the page in a suitable area, depending on the website.

You can install [Extendify from the Chrome Web Store](https://chrome.google.com/webstore/detail/extendify/jjajfginmjgdpblfanoimdanifdmcokd?authuser=1) to give it a try.

This is a screenshot of the extension in action:

![Sample of Spotify Play Button Chrome Extension](https://github.com/JMPerez/extendify/raw/master/wikipedia-sample.png)

## Supported sites

So far it supports the following websites:

### All Music
It works with any track, album or artist page.

* [Track page (i.e. Someone Like You by Adele)](http://www.allmusic.com/song/someone-like-you-mt0042770499)
* [Album page (i.e. 21 by Adele)](http://www.allmusic.com/album/21-mw0002080092)
* [Artist page (i.e. Adele)](http://www.allmusic.com/artist/adele-mn0000503460)

### Amazon

* [Album page (i.e. B'Day Deluxe Edition by Beyoncé)](http://www.amazon.co.uk/BDay-Deluxe-Edition-Beyonce/dp/B002ZVG86C/)
* [Track page (i.e. Single Ladies (Put A Ring On It) by Beyoncé)](http://www.amazon.co.uk/Single-Ladies-Put-Ring-On/dp/B002SPA21M/)

### Ebay
Items under [Music category](http://www.ebay.com/hcp/entertainment/music).

* [Album page (i.e. My Love Is Your Love by Whitney Houston)](http://www.ebay.com/ctg/My-Love-Your-Love-Whitney-Houston-CD-Jan-1998-2-Discs-Arista-/3190079?fvcs=1226&_fcls=1&_tab=2&_trksid=m185&_trkparms=algo%3DPP.GENRES%26its%3DK%26itu%3DUCK%252BUA%26otn%3D16%26ps%3D63%26clkid%3D5005620363478891640&_qi=RTM1002374)

### Gmail
It works with any link pointing to https://open.spotify.com or https://play.spotify.com that belongs to a track, album or playlist

### Google
It works with search results for artist, album or tracks.

* [Artist search results (i.e. "Lady Gaga")](https://www.google.se/search?q=lady+gaga&oq=lady+gaga&aqs=chrome.0.59j60j61l3j59.908&sugexp=chrome,mod=1&sourceid=chrome&ie=UTF-8)
* [Artist search results, and then navigation to a song (i.e. "Lady Gaga - Telephone")](https://www.google.se/search?q=lady+gaga&oq=lady+gaga&aqs=chrome.0.59j60j61l3j59.908&sugexp=chrome,mod=1&sourceid=chrome&ie=UTF-8#hl=en&sa=X&tbo=d&q=lady+gaga+telephone&stick=H4sIAAAAAAAAAGOovnz8BQMDgy4HsxCXfq6-gYm5RXx8rhJXiIKhhYmlubmxpZagb2lxZrJjUUlmcUlIfnB-XnrV57zKAwcU4sWMmr-Jr7GMed67thcATs49_EoAAAA&extab=1&npsic=-49&bav=on.2,or.r_gc.r_pw.r_qf.&bvm=bv.41248874,d.d2k&fp=54ed95ba89a39dc3&biw=1375&bih=330)

### Pirate Bay
It supports album download pages:

* [Album page (i.e. 21 by Adele)](https://thepiratebay.la/torrent/6590427/Adele_-_21)

### Wikipedia
Articles on Wikipedia in English about albums or tracks.

* [Album page (i.e. Kill 'Em All by Metallica)](http://en.wikipedia.org/wiki/Kill_%27Em_All).
* [Track page (i.e. Disposable Heroes by Metallica)](http://en.wikipedia.org/wiki/Disposable_Heroes).

### Youtube
Videos of tracks

* [Video (i.e. Call Me Maybe by Carly Rae Jepsen)](http://www.youtube.com/watch?v=fWNaR-rxAic).

## Installation
On Google Chrome, open the _Extensions page_ (chrome://chrome/extensions/) and enable Developer Mode. Then, click on "Load unpacked extension..." and select the folder where you have deployed the source code.

## Known issues
The extension relies heavily on the DOM structure of the supported sites. When these change, the extension could stop detecting the placeholders for the key information (album name, track name and artist name).

## About the authors
This extension was built during the Music Hack Day 2013 in Stockholm by [@jmperezperez](https://twitter.com/jmperezperez) and [@aandelkovic](https://twitter.com/aandelkovic).
