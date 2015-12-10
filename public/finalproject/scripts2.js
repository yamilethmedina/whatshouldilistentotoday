$(document).ready(function(){});

   //This is to remove the validation message if no related artists are present

   $('#originalartist').focus(function(){
      var full = $("#artist").has("img").length ? true : false;
      if(full == false){
         $('artist').empty();
      }
   });
   
   // create loop to show all related artists
   //function definition

   var getArtist = function originalArtist (){

        //Grab the artist name and store it in a variable

        var originalartist = $('#originalartist').val();

         //Check if the user has entered anything

         if(originalartist == ''){

            //If the input field was empty, display a message

            $('#artist').html("<h2 class='loading'> Please enter something.</h2>");
            } else {

            //They must have entered a value, carry on with API call, first display a loading message to notify the user of activity

            $('#artist').html("<h2 class='loading'>Gathering similar artists...</h2>");
            document.getElementById('fetch').addEventListener('submit', function (e) {
    e.preventDefault();
    var originalArtist = searchArtists(document.getElementById('originalartist').value);
}, false);

 var searchArtists = function (originalartist) {
        $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'artist'
        },
        success: function (response) {
            resultsPlaceholder.innerHTML = template(response);
        }
    });
 };

    var originalArtistId = $.getJSON("https://api.spotify.com/v1/search?type=artist" + searchArtists + "callback=?");
        
   



            
           $.getJSON("https://api.spotify.com/v1/artists/" + originalArtistId + "/related-artists" + "callback=?", function(json) {

             

               if (json != "Nothing found."){

                  //Display similar artists and pictures of them

                     $('#artist').html('<h2 class="artists">Check out these similar artists</h2><img id="ArtistPhotos" src=' + json[0].artists[0].image.url + ' />');
                     
    
                    }
                });
            };
         }
       
     
         
          $('#search').click(getArtist);

   $('#term').keyup(function(event){

       if(event.keyCode == 13){

           getArtist();

       }

   });



