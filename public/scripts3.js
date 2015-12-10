

var $ = require('jquery');
var Spotify = require('../node_modules/spotify-web-api-js');
var s = new Spotify();
var async = require('async');

console.log("Hello");
// // credentials are optional
// var spotifyApi = new SpotifyWebApi({
//   clientId : 'd137fe25b31c4f3ba9e29d85f4e47c66',
//   clientSecret : '044d1250a8e74f8481b20cf3ad3316ee',
//   redirectUri : 'http://localhost:3000/callback'
// });

// closure waiting for page to load event
// window.addEventListener('click', getOriginalArtist)

$(document).ready(function($) {
  $('#s').on('submit', function() {
    searchArtists($('#originalartist').val());
    return false;
  });

});

function searchArtists(originalArtist) {
  console.log('originalArtist', originalArtist);
  $.getJSON("https://api.spotify.com/v1/search?type=artist&q=" + originalArtist, function(json) {

   $('#artist').html('<p>'+ '<img src="' + json.artists.items[0].images[2].url + '" height="100" width="100" /> ' + json.artists.items[0].name +'</p>');

   var originalArtistId = json.artists.items[0].id;

   async.waterfall([
      function(callback){
          s.getArtistRelatedArtists(originalArtistId, function(err, data) {
             callback(null, data);
         });
      },
      function(data, callback){
        var relatedArtists = {};

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

          callback(null, counter, relatedArtists);
      },
      function(counter, relatedArtists, callback){

        async.times(counter, function(n, next){
          s.getArtistTopTracks(relatedArtists[n].id, "US", function (err, data2) {
            relatedArtists[n].song = data2.tracks[0].name;
            next(null);
          });
        }, function(err) {
          callback(null, relatedArtists);
        });
      }
  ], function (err, relatedArtists) {

      console.table(relatedArtists);
  });

 });
}
