var $ = require('jquery');
var Spotify = require('../node_modules/spotify-web-api-js');
var s = new Spotify();
var async = require('async');

// import timesSeries from 'async/timesSeries';


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




$(document).ready(function($) {
  $('#s').on('submit', function() {
    searchArtists($('#originalartist').val());
    $("#related-artist").empty();
    return false;

  });




window.onload = function () {

var params = getHashParams();




          if (params.access_token) {

          s.setAccessToken(params.access_token);
          s.getMe().then(function(data) {

            // and here it goes the user's data!!!

            user_id = data.id;
            
            s.createPlaylist(user_id, {name: playlistTitle}).then(function(data3) {

              playlist_id = data3.uri;
              playlist_id = playlist_id.substring(33);

              var song_uris = JSON.parse(sessionStorage.getItem("song_uris") || "null");
              if (!song_uris) {
                  // There weren't any in storage, populate in another way or set dfeault
                }






              s.addTracksToPlaylist(user_id, playlist_id, song_uris).then(function(data){

                    });

                });
            });
        }

    };

window.onhashchange = function () {

      };


function searchArtists(originalArtist, callback) {
    $(window).on('hashchange', function() {

    });
  $.getJSON("https://api.spotify.com/v1/search?type=artist&q=" + originalArtist, function(json) {

    $('#artist').html('<p>'+ '<img src="' + json.artists.items[0].images[2].url + '" height="100" width="100" />  <span id="originalartistname">' + json.artists.items[0].name +'</span></p>');
    var playlistTitle = "Related Artist Playlist - " + $('#originalartistname').text();
            console.log(playlistTitle);


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

        async.times(counter, function(n, next) {

          s.getArtistTopTracks(relatedArtists[n].id, "US", function (err, data2) {
            relatedArtists[n].song = data2.tracks[0].name; //sometimes this is a TypeError? idk
            relatedArtists[n].uri = data2.tracks[0].uri;

            $('#related-artist').append('<p><strong>' + relatedArtists[n].name + '</strong> -- \"' + relatedArtists[n].song + '\"</p>');
            song_uris.push(relatedArtists[n].uri);

            next(null, relatedArtists[n].uri);
            $("#spotify").css("display", "block");

          });

        }, function(err, song_uris) {



          sessionStorage.setItem("song_uris", JSON.stringify(song_uris));
          // Or localStorage.setItem...

                });

            });
        });
    }
});
