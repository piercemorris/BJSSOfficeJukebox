const request = require("supertest");
const serverPromise = require("../../index");
const { Song } = require("../../models/song");

let httpServer;

describe("api/songs/", () => {
  beforeAll(async () => {
    httpServer = await serverPromise;
  });
  afterAll(() => httpServer.close());

  afterEach(async () => {
    await Song.remove({});
  });

  describe("GET /", () => {
    it("should return all songs", async () => {
      await Song.collection.insertMany([
        {
          song: {
            album: {
              album_type: "album",
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x"
                  },
                  href:
                    "https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x",
                  id: "5K4W6rqBFWDnAN6FQUkS6x",
                  name: "カニエ・ウェスト",
                  type: "artist",
                  uri: "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
                }
              ],
              available_markets: [
                "AD",
                "AE",
                "AR",
                "AT",
                "AU",
                "BE",
                "BG",
                "BH",
                "BO",
                "BR",
                "CA",
                "CH",
                "CL",
                "CO",
                "CR",
                "CY",
                "CZ",
                "DE",
                "DK",
                "DO",
                "DZ",
                "EC",
                "EE",
                "EG",
                "ES",
                "FI",
                "FR",
                "GB",
                "GR",
                "GT",
                "HK",
                "HN",
                "HU",
                "ID",
                "IE",
                "IL",
                "IS",
                "IT",
                "JO",
                "JP",
                "KW",
                "LB",
                "LI",
                "LT",
                "LU",
                "LV",
                "MA",
                "MC",
                "MT",
                "MX",
                "MY",
                "NI",
                "NL",
                "NO",
                "NZ",
                "OM",
                "PA",
                "PE",
                "PH",
                "PL",
                "PS",
                "PT",
                "PY",
                "QA",
                "RO",
                "SA",
                "SE",
                "SG",
                "SK",
                "SV",
                "TH",
                "TN",
                "TR",
                "TW",
                "US",
                "UY",
                "VN",
                "ZA"
              ],
              external_urls: {
                spotify: "https://open.spotify.com/album/0Ds6i3h0F9RcYIKAD5Olum"
              },
              href: "https://api.spotify.com/v1/albums/0Ds6i3h0F9RcYIKAD5Olum",
              id: "0Ds6i3h0F9RcYIKAD5Olum",
              images: [
                {
                  height: 634,
                  url:
                    "https://i.scdn.co/image/ec8c017ce711faa452508279574d8684717d223e",
                  width: 640
                },
                {
                  height: 297,
                  url:
                    "https://i.scdn.co/image/ada39ac20c146a7d28e0b6082c47a9d152e88019",
                  width: 300
                },
                {
                  height: 63,
                  url:
                    "https://i.scdn.co/image/9d38eb7954ef6c76b8aa723033d18de18962700b",
                  width: 64
                }
              ],
              name: "Late Registration",
              release_date: "2005-01-01",
              release_date_precision: "day",
              total_tracks: 22,
              type: "album",
              uri: "spotify:album:0Ds6i3h0F9RcYIKAD5Olum"
            },
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x"
                },
                href:
                  "https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x",
                id: "5K4W6rqBFWDnAN6FQUkS6x",
                name: "カニエ・ウェスト",
                type: "artist",
                uri: "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
              },
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/7LnaAXbDVIL75IVPnndf7w"
                },
                href:
                  "https://api.spotify.com/v1/artists/7LnaAXbDVIL75IVPnndf7w",
                id: "7LnaAXbDVIL75IVPnndf7w",
                name: "Jamie Foxx",
                type: "artist",
                uri: "spotify:artist:7LnaAXbDVIL75IVPnndf7w"
              }
            ],
            available_markets: [
              "AD",
              "AE",
              "AR",
              "AT",
              "AU",
              "BE",
              "BG",
              "BH",
              "BO",
              "BR",
              "CA",
              "CH",
              "CL",
              "CO",
              "CR",
              "CY",
              "CZ",
              "DE",
              "DK",
              "DO",
              "DZ",
              "EC",
              "EE",
              "EG",
              "ES",
              "FI",
              "FR",
              "GB",
              "GR",
              "GT",
              "HK",
              "HN",
              "HU",
              "ID",
              "IE",
              "IL",
              "IS",
              "IT",
              "JO",
              "JP",
              "KW",
              "LB",
              "LI",
              "LT",
              "LU",
              "LV",
              "MA",
              "MC",
              "MT",
              "MX",
              "MY",
              "NI",
              "NL",
              "NO",
              "NZ",
              "OM",
              "PA",
              "PE",
              "PH",
              "PL",
              "PS",
              "PT",
              "PY",
              "QA",
              "RO",
              "SA",
              "SE",
              "SG",
              "SK",
              "SV",
              "TH",
              "TN",
              "TR",
              "TW",
              "US",
              "UY",
              "VN",
              "ZA"
            ],
            disc_number: 1,
            duration_ms: 207626,
            explicit: true,
            external_ids: { isrc: "USUM70500143" },
            external_urls: {
              spotify: "https://open.spotify.com/track/3QHPHLAkYV5cQBUYs6rowx"
            },
            href: "https://api.spotify.com/v1/tracks/3QHPHLAkYV5cQBUYs6rowx",
            id: "3QHPHLAkYV5cQBUYs6rowx",
            is_local: false,
            name: "Gold Digger",
            popularity: 64,
            preview_url: null,
            track_number: 4,
            type: "track",
            uri: "spotify:track:3QHPHLAkYV5cQBUYs6rowx"
          }
        },
        {
          song: {
            album: {
              album_type: "album",
              artists: [
                {
                  external_urls: {
                    spotify:
                      "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x"
                  },
                  href:
                    "https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x",
                  id: "5K4W6rqBFWDnAN6FQUkS6x",
                  name: "カニエ・ウェスト",
                  type: "artist",
                  uri: "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
                }
              ],
              available_markets: [
                "AD",
                "AE",
                "AR",
                "AT",
                "AU",
                "BE",
                "BG",
                "BH",
                "BO",
                "BR",
                "CA",
                "CH",
                "CL",
                "CO",
                "CR",
                "CY",
                "CZ",
                "DE",
                "DK",
                "DO",
                "DZ",
                "EC",
                "EE",
                "EG",
                "ES",
                "FI",
                "FR",
                "GB",
                "GR",
                "GT",
                "HK",
                "HN",
                "HU",
                "ID",
                "IE",
                "IL",
                "IS",
                "IT",
                "JO",
                "JP",
                "KW",
                "LB",
                "LI",
                "LT",
                "LU",
                "LV",
                "MA",
                "MC",
                "MT",
                "MX",
                "MY",
                "NI",
                "NL",
                "NO",
                "NZ",
                "OM",
                "PA",
                "PE",
                "PH",
                "PL",
                "PS",
                "PT",
                "PY",
                "QA",
                "RO",
                "SA",
                "SE",
                "SG",
                "SK",
                "SV",
                "TH",
                "TN",
                "TR",
                "TW",
                "US",
                "UY",
                "VN",
                "ZA"
              ],
              external_urls: {
                spotify: "https://open.spotify.com/album/2Ek1q2haOnxVqhvVKqMvJe"
              },
              href: "https://api.spotify.com/v1/albums/2Ek1q2haOnxVqhvVKqMvJe",
              id: "2Ek1q2haOnxVqhvVKqMvJe",
              images: [
                {
                  height: 640,
                  url:
                    "https://i.scdn.co/image/05cf2f8b56e595bcbf50fccb894f5fb6c2427750",
                  width: 640
                },
                {
                  height: 300,
                  url:
                    "https://i.scdn.co/image/e67c37be368b0b47319f5c7a57ab5f4e3c262f3c",
                  width: 300
                },
                {
                  height: 64,
                  url:
                    "https://i.scdn.co/image/662874fdaaf3c42f98e9163c23525d36aabc8ecf",
                  width: 64
                }
              ],
              name: "ye",
              release_date: "2018-06-01",
              release_date_precision: "day",
              total_tracks: 7,
              type: "album",
              uri: "spotify:album:2Ek1q2haOnxVqhvVKqMvJe"
            },
            artists: [
              {
                external_urls: {
                  spotify:
                    "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x"
                },
                href:
                  "https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x",
                id: "5K4W6rqBFWDnAN6FQUkS6x",
                name: "カニエ・ウェスト",
                type: "artist",
                uri: "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
              }
            ],
            available_markets: [
              "AD",
              "AE",
              "AR",
              "AT",
              "AU",
              "BE",
              "BG",
              "BH",
              "BO",
              "BR",
              "CA",
              "CH",
              "CL",
              "CO",
              "CR",
              "CY",
              "CZ",
              "DE",
              "DK",
              "DO",
              "DZ",
              "EC",
              "EE",
              "EG",
              "ES",
              "FI",
              "FR",
              "GB",
              "GR",
              "GT",
              "HK",
              "HN",
              "HU",
              "ID",
              "IE",
              "IL",
              "IS",
              "IT",
              "JO",
              "JP",
              "KW",
              "LB",
              "LI",
              "LT",
              "LU",
              "LV",
              "MA",
              "MC",
              "MT",
              "MX",
              "MY",
              "NI",
              "NL",
              "NO",
              "NZ",
              "OM",
              "PA",
              "PE",
              "PH",
              "PL",
              "PS",
              "PT",
              "PY",
              "QA",
              "RO",
              "SA",
              "SE",
              "SG",
              "SK",
              "SV",
              "TH",
              "TN",
              "TR",
              "TW",
              "US",
              "UY",
              "VN",
              "ZA"
            ],
            disc_number: 1,
            duration_ms: 145506,
            explicit: true,
            external_ids: { isrc: "USUM71807681" },
            external_urls: {
              spotify: "https://open.spotify.com/track/3U21A07gAloCc4P7J8rxcn"
            },
            href: "https://api.spotify.com/v1/tracks/3U21A07gAloCc4P7J8rxcn",
            id: "3U21A07gAloCc4P7J8rxcn",
            is_local: false,
            name: "All Mine",
            popularity: 74,
            preview_url: null,
            track_number: 3,
            type: "track",
            uri: "spotify:track:3U21A07gAloCc4P7J8rxcn"
          }
        }
      ]);

      const res = await request(
        `http://127.0.0.1:${httpServer.address().port}`
      ).get("/api/songs");
      expect(await res.status).toBe(200);
      expect(await res.body.length).toBe(2);
      expect(
        await res.body.some(item => item.song.id === "3QHPHLAkYV5cQBUYs6rowx")
      ).toBeTruthy();
      expect(
        await res.body.some(item => item.song.id === "3U21A07gAloCc4P7J8rxcn")
      ).toBeTruthy();
    }, 30000);

    describe("POST /", () => {
      it("should post a new song", async () => {
        const res = await request(
          `http://127.0.0.1:${httpServer.address().port}`
        ).post("/api/songs");
      });
    });
  });
});
