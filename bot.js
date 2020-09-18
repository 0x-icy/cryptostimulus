let Twit = require('twit');
let TwitterBot = require('node-twitterbot').TwitterBot;
let CoinGecko = require('coingecko-api');
let _ = require('lodash');
var numeral = require("numeral");
require("dotenv").config();

const sendTweet = async () => {
  try {
    console.log("Running bot..");
    let Bot = new TwitterBot({
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_KEY,
      access_token: process.env.TWITTER_ACCESS_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_SECRET,
    });

    let cgClient = new CoinGecko();

    const res = await cgClient.coins
      .fetch("uniswap", {
        market_data: true,
        tickers: false,
        community_data: false,
        developer_data: false,
        localization: false,
        sparkline: false,
      });
      const dollarValue =
        _.toNumber(res.data.market_data.current_price) * 400;
      const valueString = numeral(dollarValue).format("$0,0");

      await Bot.tweet(`${valueString} \n #UNISWAP $UNI`);
  } catch (err) {
    console.log("ERROR");
    console.log(err);
  }
}

sendTweet();