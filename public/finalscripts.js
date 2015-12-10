

var $ = require('jquery');
var Spotify = require('../node_modules/spotify-web-api-js');
var s = new Spotify();
var async = require('async');


// // credentials are optional
// var spotifyApi = new SpotifyWebApi({
//   clientId : 'd137fe25b31c4f3ba9e29d85f4e47c66',
//   clientSecret : '044d1250a8e74f8481b20cf3ad3316ee',
//   redirectUri : 'http://localhost:3000/callback'
// });

// closure waiting for page to load event
// window.addEventListener('click', getOriginalArtist)

/**
 * Returns an object with the query parameters passed in the
 * hash of the URL
 */
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

var user_id;
var playlist_id;
var relatedArtists;
var n;
var k;
var song_uris = [];
var params = getHashParams();

$(document).ready(function($) {
  $('#s').on('submit', function() {
    searchArtists($('#originalartist').val());
    return false;
  });

  // var params = getHashParams();


  // if "access_token" is there, it probably means that we have come back from the
  // Spotify authentication page, and we now have an access token
  if (params.access_token) {
    // yuhu!!!
    // make sure the Spotify Web API JS wrapper has an access token that it can use
    // to fetch the current user's info
    s.setAccessToken(params.access_token);
    // and now, let's call getMe(). Here we are using a Promise, but we could have
    // also used a callback function
    s.getMe().then(function(data) {
      // and here it goes the user's data!!!
      console.log(data);
      console.log(data.id);
      user_id = data.id;
      // playlists are showing up as undefined
// spotify:user:tenderoni-:playlist:5NPwZMgVoWo8WDTRdJ23l0
      s.createPlaylist(user_id, {name: 'Related Artist Playlist'}).then(function(data3) {
        console.log(data3);
        playlist_id = data3.uri;
        playlist_id = playlist_id.substring(33);
        console.log(playlist_id);


       console.log(song_uris);
      //  s.addTracksToPlaylist(user_id, playlist_id, song_uris);

      });
    });
    }
});

// });

function searchArtists(originalArtist) {
  console.log('originalArtist', originalArtist);
  $.getJSON("https://api.spotify.com/v1/search?type=artist&q=" + originalArtist, function(json) {

   $('#artist').html('<p>'+ '<img src="' + json.artists.items[0].images[2].url + '" height="100" width="100" /> ' + json.artists.items[0].name +'</p>');

   var originalArtistId = json.artists.items[0].id;

   s.getArtistRelatedArtists(originalArtistId, function(err, data) {
      relatedArtists = {};

      for (var i = 0; i < data.artists.length; i++) {
         relatedArtists[data.artists[i].id] = {};
         relatedArtists[data.artists[i].id].name = data.artists[i].name;
         relatedArtists[data.artists[i].id].id = data.artists[i].id;
      }

      var counter = 0;
      for (var id in relatedArtists) {
         relatedArtists[counter] = relatedArtists[id];
         delete relatedArtists[id];
         counter++;
      }

      async.times(counter, function(n, next){
        s.getArtistTopTracks(relatedArtists[n].id, "US", function (err, data2) {
          relatedArtists[n].song = data2.tracks[0].name;
          relatedArtists[n].uri = data2.tracks[0].uri;
          console.log(relatedArtists[n].uri);
          // make sure to put the access token here add song to playlist
          // create array
          song_uris.push(relatedArtists[n].uri);
          console.log(song_uris);

          // song_uris = relatedArtists[n].uri;
          //
          // console.log(song_uris);

          next(null);

      $("#playlist").load(function() {
            s.addTracksToPlaylist(user_id, playlist_id, song_uris);
          });
        });


      }, function(err) {
        // console.table(relatedArtists);

        for (k = 0; k < 20; k++)
        {
          $('#related-artist').append('<p><strong>' + relatedArtists[k].name + '</strong> -- \"' + relatedArtists[k].song + '\"</p>');
          // console.log(song_uris);
          // s.addTracksToPlaylist(user_id, playlist_id, [song_uris]);

          // s.addTracksToPlaylist(user_id, playlist_id, [relatedArtists[n].uri], {position: k});

        }


      });

  });

 });
}
