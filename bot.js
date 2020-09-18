let Twit = require('twit');
let TwitterBot = require('node-twitterbot').TwitterBot;
let CoinGecko = require('coingecko-api');
let _ = require('lodash');
var numeral = require("numeral");
require("dotenv").config();

const sendTweet = async () => {
  try {
    console.log("Running bot..");
    var T = new Twit({
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_KEY,
      access_token: process.env.TWITTER_ACCESS_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_SECRET,
      // timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      // strictSSL: true, // optional - requires SSL certificates to be valid.
    });

    console.log("Bot");

    let cgClient = new CoinGecko();

    console.log("cgClient");
    const { data } = await cgClient.coins
      .fetch("uniswap", {
        market_data: true,
        tickers: false,
        community_data: false,
        developer_data: false,
        localization: false,
        sparkline: false,
      });
      const dollarValue =
        _.toNumber(data.market_data.current_price.usd) * 400;
      const valueString = numeral(dollarValue).format("$0,0");

      console.log("valueString: ", valueString);
      T.post(
        "statuses/update",
        { status: `${valueString} \n #UNISWAP $UNI` },
        function (err, data, response) {
          console.log(data);
        }
      );
  } catch (err) {
    console.log("ERROR");
    console.log(err);
  }
}

sendTweet();