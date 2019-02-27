const SpotifyWebApi = require('spotify-web-api-node');

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-modify-playback-state"
];

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({
  clientId: '',
  clientSecret: '',
  redirectUri: '',
})