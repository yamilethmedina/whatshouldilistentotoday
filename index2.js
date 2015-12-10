var express = require('express');
var cors = require('cors');
var Spotify = require('spotify-web-api-js');
var spotifyApi = new Spotify();
var app = express();
var port = 3000;
//
// var corsOptions = {
//   origin: true
// };

// app.use(cors());

// app.get('/', cors(), function(req, res, next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.json({msg: 'This is COS-enabled for all origins!'});
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// app.all('/', function(req, res){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
// });

app.use(express.static(__dirname + '/public')); // looks in public directory, not root directory (protects files)

app.get('/', function(req, res) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.send(__dirname + '\\index.html')
});

app.get('/login', function(req, res) {
var scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
var my_client_id = '5fe01282e44241328a84e7c5cc169165';
var redirect_uri = 'http://localhost:3000/callback';
res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + my_client_id +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

/* Handle authorization callback from Spotify */
// app.get('/callback', function(req, res) {
//
//   /* Read query parameters */
//   var code  = req.query.code; // Read the authorization code from the query parameters
//   var state = req.query.state; // (Optional) Read the state from the query parameter
//
//   /* Get the access token! */
//   spotifyApi.authorizationCodeGrant(code)
//     .then(function(data) {
//       console.log('The token expires in ' + data['expires_in']);
//       console.log('The access token is ' + data['access_token']);
//       console.log('The refresh token is ' + data['refresh_token']);
//
//       /* Ok. We've got the access token!
//          Save the access token for this user somewhere so that you can use it again.
//          Cookie? Local storage?
//       */
//       var token = data[access_token];
//
//       /* Redirecting back to the main page! :-) */
//       res.redirect('/');
//
//     }, function(err) {
//       res.status(err.code);
//       res.send(err.message);
//     }
//   );
// });


// var token = data[access_token];


// app.post('/', function(req, res) {
//     res.send(req.body.spotify);
// });

app.listen(port, function() {
          console.log('CORS-enabled web server listening on port ' + port);
});
