const express = require("express");
const Moralis = require("moralis").default;
const discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const Web3 = require("web3");
const web3 = new Web3();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
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

    // console.log(JSON.stringify(body, null, 2));

    if (body.txs.length === 0 || !body.confirmed) {
      return res.status(200).json();
    }

    let from = body.txs[0].fromAddress;
    let tokenId = web3.utils.hexToNumber(body.logs[0].topic1);
    let chainId = web3.utils.hexToNumber(body.chainId);
    let chain = chainIdLookup[chainId];

    const response = await fetch(
      `https://www.infinitykeys.io/api/metadata/achievement?tokenid=${tokenId}`
    );
    const nftMetadata = await response.json();
    let image = nftMetadata.image;

    console.log(nftMetadata);

    const claimedNFT = new EmbedBuilder()
      .setColor("101d42")
      .setTitle("Infinity Keys")
      .setURL("https://infinitykeys.io")
      .setAuthor({
        name: "Infinity Keys",
        iconURL:
          "https://res.cloudinary.com/infinity-keys/image/upload/v1671162913/ik-alpha-trophies/Ikey-Antique-Logo_dithbc.png",
        url: "https://infinitykeys.io",
      })
      .setDescription("New Mint!!")
      .addFields(
        { name: "Token", value: `${tokenId}`, inline: true },
        { name: "Mint Address", value: `${from}`, inline: true },
        { name: "Chain", value: `${chain}`, inline: true }
      )
      .setImage(`${image}`)
      .setTimestamp()
      .setFooter({
        text: "Claimed",
        iconURL:
          "https://res.cloudinary.com/infinity-keys/image/upload/v1671162913/ik-alpha-trophies/Ikey-Antique-Logo_dithbc.png",
      });

    const channel = await client.channels.fetch(process.env.CHANNEL);
    channel.send({ embeds: [claimedNFT] });

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
