var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: 'a11348b400434a2ba1cbcf618dadf888',
  clientSecret: 'c38b37d0392f4234bc44fe635c0b4596'
});

//https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow


//Get access token.
spotifyApi.clientCredentialsGrant().then(
    function(data) {
        console.log('The access token expires in ' + data.body['expires_in']);//Defaults to one hour.
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
        console.log(
        'Something went wrong when retrieving an access token',
        err.message);
    }
);

//Search
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function(data) {
        console.log('Artist albums', data.body);
    },
    function(err) {
        console.error(err);
    }
);

