const express = require("express");
const Moralis = require("moralis").default;
const discord = require("discord.js");
const Web3 = require("web3");
const web3 = new Web3();
require("dotenv").config();
const app = express();
const port = 3000;

const client = new discord.Client({
  intents: [],
});

client.login(process.env.PASS);

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const { body, headers } = req;

  try {
    // const streams = await Moralis.Streams.getAll({
    //   limit: 100, // limit the number of streams to return
    // });

    //console.log(streams);

    const AVAX_CHAIN_ID = 43114;
    const POLYGON_CHAIN_ID = 137;
    const OPTIMISM_CHAIN_ID = 10;
    const ETH_CHAIN_ID = 1;

    const chainIdLookup = {
      [ETH_CHAIN_ID]: "Ethereum",
      [POLYGON_CHAIN_ID]: "Polygon",
      [AVAX_CHAIN_ID]: "Avalanche",
      [OPTIMISM_CHAIN_ID]: "Optimism",
    };

    Moralis.Streams.verifySignature({
      body,
      signature: headers["x-signature"],
    });

    // console.log(headers);
    // console.log(body);

    //let from = body.erc20Transfers[0].from;
    // console.log(from);
    // let amount = Number(body.erc20Transfers[0].valueWithDecimals);
    // console.log(amount);

    let from = body.txs[0].fromAddress;
    console.log(from);
    let tokenId = web3.utils.hexToNumber(body.logs[0].topic1);
    console.log(tokenId);
    let chainId = web3.utils.hexToNumber(body.chainId);
    console.log(chainId);
    let chain = chainIdLookup[chainId];

    // const channel = await client.channels.fetch(process.env.CHANNEL);
    // channel.send(`Transfer submitted by ${from}, for ${amount.toFixed(2)}`);

    const channel = await client.channels.fetch(process.env.CHANNEL);
    channel.send(`Token ID ${tokenId} claimed by ${from} from ${chain}`);

    return res.status(200).json();
  } catch (e) {
    console.log(e);
    console.log("Not Moralis");
    return res.status(400).json();
  }
});

Moralis.start({
  apiKey: process.env.APIKEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening to my stream`);
  });
});
