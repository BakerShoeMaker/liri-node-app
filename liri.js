const fs = require('fs');
const twitterKeys = require('./keys.js');
var Twitter = require('twitter');
var request = require("request");



const consumer_key = twitterKeys.consumer_key;
const consumer_secret = twitterKeys.consumer_secret ;
const access_token_key = twitterKeys.access_token_key;
const access_token_secret = twitterKeys.access_token_secret;

const myTweets = 'my-tweets';
const spotifyThisSong = 'spotify-this-song';
const movieThis = 'movie-this';
const doWhatItSays = 'do-what-it-says';

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

    console.log("You entered my tweets!");

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
            console.log(tweets);
        }
    });
}
//--------------------- displays spotify songs
else if(process.argv[2]== spotifyThisSong)
{

    console.log("You entered Spotify!");
}
//--------------------- displays movies
else if(process.argv[2]== movieThis )
{
    console.log("You entered movie this!");
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
else if(process.argv[2]== doWhatItSays)
{

    console.log("You entered do what it says!!");
}
