//everything should happen in the callback
relatedArtists = s.getArtistRelatedArtists(originalArtistId);
console.log(relatedArtists);
relatedArtistsLength = relatedArtists.length;
console.log(relatedArtistsLength);
});
}

 relatedArtists = s.getArtistRelatedArtists(originalArtistId, function(err, data) {
console.log(data);
relatedArtistsLength = relatedArtists.length;
console.log(relatedArtistsLength);
});
}



for (var i = 0; i < relatedArtistsLength; i++) {

    //search for related artist ID to get top song
    console.log(relatedArtists[i].items[0].name);
    var relatedArtistId = searchArtists(relatedArtists[i].items[0].name);
    console.log(relatedArtistId[i].items[0].name);

    //get top song from that related artist
    var relatedArtistTopTracks = s.getArtistTopTracks(relatedArtistId[i], US);


    // reset html of related artist for new search
    $('#related-artist').html('');

    $('#related-artist').append('<p>'+ '<img src="' + relatedArtists[i].images[2].url + '" height="100" width="100" /> ' + relatedArtists[i].name + '<i> \"' + relatedArtists.tracks[0].name + '\"</i></p>');
  }
