let Twit = require('twit');
let TwitterBot = require('node-twitterbot').TwitterBot;
let Bot = new TwitterBot({
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});
let phraseArray = [
  "hey twitter",
  "im tweeting",
  "tweet tweet",
  "tweetstorm time... 1/22",
  "plz RT v important",
  "delete ur account",
  "it me",
  "same"
];
function chooseRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
let phrase = chooseRandom(phraseArray) + ", " + chooseRandom(phraseArray);
Bot.tweet(phrase);