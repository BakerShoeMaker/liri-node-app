const fs = require('fs');
const twitterKeys = require('./keys.js');
var Twitter = require('twitter');
var request = require("request");
var Spotify = require('node-spotify-api');

const consumer_key = twitterKeys.consumer_key;
const consumer_secret = twitterKeys.consumer_secret ;
const access_token_key = twitterKeys.access_token_key;
const access_token_secret = twitterKeys.access_token_secret;

const myTweets = 'my-tweets';
const spotifyThisSong = 'spotify-this-song';
const movieThis = 'movie-this';
const doWhatItSays = 'do-what-it-says';

const spotifyClientID = "35ff7fa7ee764a34a0c49474e421b449";
const spotifyClientSecret = "945b74c577ff416880714257c443e41e";

var nameOfInput = process.argv[3];

fs.readFile('keys.js',"utf8", function (err, data)
    {
        //Logs the error in the file.
        if (err) {
            return console.log(err);
        }
    }
);

//--------------------- displays tweets
if(process.argv[2] == myTweets){

    var client = new Twitter({
        consumer_key: consumer_key,
        consumer_secret: consumer_secret,
        access_token_key: access_token_key,
        access_token_secret: access_token_secret

        // consumer_key: process.env.TWITTER_CONSUMER_KEY,
        // consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    var params = {screen_name: 'bakershoemaker'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            //console.log(tweets); //what do I use to display the tweets?
            fs.writeFileSync('log.txt', JSON.stringify(tweets));
            for(var i = 1; i < tweets.length; i++){
                if (tweets[i].text) {
                    console.log(tweets[i].text);
                }
            }
            // console.log(tweets[1].text);
            // console.log(tweets[2].text);
            // console.log(tweets[3].text);
        }
    });
}
//--------------------- displays spotify songs
else if(process.argv[2]== spotifyThisSong)
{
    var spotify = new Spotify({
            id: spotifyClientID,
        secret: spotifyClientSecret
    });

    if(!process.argv[3]){
        spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data);
        });

    }
    else{

        spotify.search({ type: 'track', query: nameOfInput, limit: 3 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            //console.log(JSON.stringify(data));
            //fs.writeFileSync('spotify.txt', JSON.stringify(data));
            fs.appendFile('spotify.txt', JSON.stringify(data));
            console.log("Artist: ", data.tracks.items[0].album.artists[0].name);
            console.log("Song: ", data.tracks.items[0].name);
            console.log("Preview link: ", data.tracks.items[0].external_urls.spotify);

        });

  }

}
//--------------------- displays movies
else if(process.argv[2]== movieThis )
{
    console.log("You entered: " , nameOfInput);
    request("http://www.omdbapi.com/?t="+nameOfInput +"&apikey=40e9cece", function(error, response, body) {
    //
        if (!error && response.statusCode === 200) {
            console.log('Title: ' , JSON.parse(body).Title);
            console.log('Year: ' , JSON.parse(body).Year);
            console.log('IMDB rating: ' , JSON.parse(body).imdbRating);
            console.log('Rotten Tomatoes rating: ' , JSON.parse(body).Ratings[1].Value);
            console.log('Country: ' , JSON.parse(body).Country);
            console.log('Plot: ' , JSON.parse(body).Plot);
            console.log('Actors: ' , JSON.parse(body).Actors);
        }
        else if(error)
        {
            console.log('Something is wrong. There is an error and you probably broke it!');
        }
    });

}
//-------------------- displays text inside of random.txt
else if(process.argv[2]== doWhatItSays) {
    console.log("You entered do what it says!!");
    fs.readFile('random.txt', "utf8", function (err, data) {
            //Logs the error in the file.
            if (err) {
                return console.log(err);
            }
            console.log(data);
        }
    );
}
//Remaining issues:
// 1- What to do with do-what-it-says
// 2 - How to display data for spotify? Where are the other search parameters.
// 3 - What data to display for Twitter?

//
//my-tweets --
//spotify-this-song--
//movie-this--
//do-what-it-says