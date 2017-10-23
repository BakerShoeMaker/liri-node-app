//This file will read the keys in the keys.js.
const fs = require('fs');
//const request = require('request');
var request = require("request");
const twitter = require('./keys.js');

//const nameOfInput == process.argv[3];

const consumer_key = twitter.consumer_key;
const consumer_secret = twitter.consumer_secret ;
const access_token_key = twitter.access_token_key;
const access_token_secret = twitter.access_token_secret;

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
        //console.log(data);
        console.log("------------------------------------------------------------------------");
        console.log('The consumer twitter key is: ', consumer_key);
        console.log('The consumer secret key is: ', consumer_secret);
        console.log('The access token is: ', access_token_key);
        console.log('The access token secret: ', access_token_secret);
        console.log("------------------------------------------------------------------------");
    }
);
//--------------------- displays tweets
if(process.argv[2] == myTweets){

    console.log("You entered my tweets!");
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
