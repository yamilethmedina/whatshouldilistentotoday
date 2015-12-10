var browserify = require('browserify')
var Spotify = require('/node_modules/spotify-web-api-js/src/spotify-web-api.js');
var s = new Spotify();


// // credentials are optional
// var spotifyApi = new SpotifyWebApi({
//   clientId : 'd137fe25b31c4f3ba9e29d85f4e47c66',
//   clientSecret : '044d1250a8e74f8481b20cf3ad3316ee',
//   redirectUri : 'http://localhost:3000/callback'
// });

var searchButton = document.getElementById('search');
if(searchButton) {
    searchButton.addEventListener('click', getOriginalArtist, false);


function getOriginalArtist() {
  var originalArtist = document.getElementById('originalartist').value;
  console.log(originalArtist);
  searchArtists(originalArtist);

  }

  function searchArtists(originalArtist) {
    var originalArtistId =  $.getJSON("https://api.spotify.com/v1/search?type=artist&q=" + originalArtist);
    console.log(originalArtistId);

  //  $.getJSON("https://api.spotify.com/v1/search?type=artist&q=" + originalArtist, function(json) {
  //    $('#artist').html('<p>'+ '<img src="' + json.artists.items[0].images[2].url + '" height="100" width="100" /> ' + json.artists.items[0].name +'</p>');
  //    var originalArtistId
   //
  //    relatedArtists(json.artists.items[0].id);
   };
 }

 Constr.prototype.getArtist = function(artistId, options, callback) {
     var requestData = {
       url: _baseUri + '/artists/' + artistId
     };
     return _checkParamsAndPerformRequest(requestData, options, callback);
   };

  // function searchArtists(originalArtist) {
  //   $.getJSON("https://api.spotify.com/v1/search?type=artist&q=" + originalArtist, function(json) {
  //     $('#artist').html('<p>'+ '<img src="' + json.artists.items[0].images[2].url + '" height="100" width="100" /> ' + json.artists.items[0].name +'</p>');
  //
  //     relatedArtists(json.artists.items[0].id);
  //   });
  // }


//
// spotifyApi.getArtist('originalArtist') {
//   .then(function(data) {
//     ('#artist').html('<p>'+ '<img src="' + data.body.items[0].images[2].url + '" height="100" width="100" /> ' + json.artists.items[0].name +'</p>', data.body);
//   }, function(err) {
//     console.error(err);
//   });
//
//   $.getJSON(spotifyApi.getArtist('originalArtist'), function(json) {
//     $('#artist').html('<p>'+ '<img src="' + json.artists.items[0].images[2].url + '" height="100" width="100" /> ' + json.artists.items[0].name +'</p>');



// Get an artist
var originalArtistName = spotifyApi.getArtist(originalArtistId)
  .then(function(data) {
    console.log('Artist information', data.body);
  }, function(err) {
    console.error(err);
  });

// Get artists related to an artist
var relatedArtists = spotifyApi.getArtistRelatedArtists(originalArtistName)
  .then(function(data) {
    console.log(data.body);
  }, function(err) {
    done(err);
  });



for (var i=0; i < relatedArtists.length; i++)
{
// Get an artist's top tracks
  var relatedArtistsTopTracks = spotifyApi.getArtistTopTracks(relatedArtists[i], 'US')
    .then(function(data) {
      console.log(data.body);
      }, function(err) {
        console.log('Something went wrong!', err);
      });



      // get the most popular song from each related artist
    var relatedArtistsTopSong = relatedArtistsTopTracks[i][0];
    console.log(relatedArtistsTopSong);

};

// var searchButton = document.getElementById('search');
// if(searchButton) {
//     searchButton.addEventListener('click', getOriginalArtist, false);
//
//
// function getOriginalArtist() {
//   var originalArtist = document.getElementById('originalartist').value;
//   searchArtists(originalArtist);
// }
//
// function searchArtists(originalArtist) {
//   $.getJSON("https://api.spotify.com/v1/search?type=artist&q=" + originalArtist, function(json) {
//     $('#artist').html('<p>'+ '<img src="' + json.artists.items[0].images[2].url + '" height="100" width="100" /> ' + json.artists.items[0].name +'</p>');
//
//     relatedArtists(json.artists.items[0].id);
//   });
// }
//
// function relatedArtists(originalArtistId) {
//   $.getJSON("https://api.spotify.com/v1/artists/" + originalArtistId + "/related-artists", function(json) {
//     if(json.artists.length > 0) {
//       var artistsLength = json.artists.length;
//
//       //search for related artist ID to get top song
//       var relatedArtistId = searchArtists(artists[i]);
//
//       //get top song from that related artist
//       function relatedArtistTopSong(relatedArtistId) {
//         $.getJSON("https://api.spotify.com/v1/artists/" + relatedArtistId + "/top-tracks?country=US", function(json) {
//           if(json.tracks.length > 0) {
//             var tracksLength = json.track.length;
//
//       // reset html of related artist for new search
//       $('#related-artist').html('');
//
//       //reset html of tracks for new search
//       $('#related-artist-track').html('');
//
//       // loop through related artists, append name of each
//       for(var i = 0; i < artistsLength; i++) {
//         $('#related-artist').append('<p>'+ '<img src="' + json.artists[i].images[2].url + '" height="100" width="100" /> ' + json.artists[i].name + '<i>' + json.tracks[0].name + '</i></p>');
//
//       //append the top track
//       }
//     }
//   });
// }
// }
