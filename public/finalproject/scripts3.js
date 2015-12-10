var searchArtists = function(originalArtist) {

  $.getJSON("https://api.spotify.com/v1/search?type=artist&q=" + originalArtist, function(json) {
    console.log(json.artists.items[0].id);
    $('#artist').html('<p>'+ json.artists.items[0].name +'</p>');
    
    relatedArtists(json.artists.items[0].id);
  });

};

var relatedArtists = function(originalArtistId) {
  console.log(originalArtistId);
  
  $.getJSON("https://api.spotify.com/v1/artists/" + originalArtistId + "/related-artists", function(json) {
    if(json.artists.length > 0) {
      var artistsLength = json.artists.length;
      
      for(var i = 0; i < artistsLength; i++) {
        $('#related-artist').append('<p>'+ json.artists[i].name +'</p>');
      }
    }
  });
};

var originalArtist = document.getElementById("originalartist");

var searchButton = document.getElementById("button");

var form = document.getElementById("fetch");
if (form) {} {
    form.addEventListener("click", searchArtists, false);
}

//search.addEventListener(click, searchArtists);

//// document.getElementById("mybutton").onclick = function(event) { ... }.
//$('#search').click(searchArtists);
// 
//    $('#originalartist').keyup(function(event){
// 
//       if (event.keyCode == 13){
// 
//           searchArtists(originalArtist);
//       };
//   });



//if (originalArtist.length === 0) {
//        alert("Please enter an artist's name.");      
//    };

 
// searchArtists("pink");
// onclick handler
