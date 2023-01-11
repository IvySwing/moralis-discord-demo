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

// const bodyTest = {
//   confirmed: false,
//   chainId: "0x89",
//   abi: [
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "account",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "bool",
//           name: "approved",
//           type: "bool",
//         },
//       ],
//       name: "ApprovalForAll",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "uint256",
//           name: "_tokenID",
//           type: "uint256",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "_account",
//           type: "address",
//         },
//       ],
//       name: "Claimed",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: false,
//           internalType: "uint16",
//           name: "_srcChainId",
//           type: "uint16",
//         },
//         {
//           indexed: false,
//           internalType: "bytes",
//           name: "_srcAddress",
//           type: "bytes",
//         },
//         {
//           indexed: false,
//           internalType: "uint64",
//           name: "_nonce",
//           type: "uint64",
//         },
//         {
//           indexed: false,
//           internalType: "bytes",
//           name: "_payload",
//           type: "bytes",
//         },
//       ],
//       name: "MessageFailed",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "fee",
//           type: "uint256",
//         },
//       ],
//       name: "MessageFee",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "previousOwner",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "newOwner",
//           type: "address",
//         },
//       ],
//       name: "OwnershipTransferred",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: false,
//           internalType: "uint16",
//           name: "_srcChainId",
//           type: "uint16",
//         },
//         {
//           indexed: false,
//           internalType: "bytes",
//           name: "_from",
//           type: "bytes",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "_tokenId",
//           type: "uint256",
//         },
//         {
//           indexed: false,
//           internalType: "address",
//           name: "_to",
//           type: "address",
//         },
//       ],
//       name: "ReceiveNFT",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256[]",
//           name: "ids",
//           type: "uint256[]",
//         },
//         {
//           indexed: false,
//           internalType: "uint256[]",
//           name: "values",
//           type: "uint256[]",
//         },
//       ],
//       name: "TransferBatch",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "operator",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "to",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "TransferSingle",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: false,
//           internalType: "string",
//           name: "value",
//           type: "string",
//         },
//         {
//           indexed: true,
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//       ],
//       name: "URI",
//       type: "event",
//     },
//   ],
//   streamId: "f2d02b4f-41d2-4823-8488-cf59d46b5af7",
//   tag: "IKNFT",
//   retries: 0,
//   block: {
//     number: "37911154",
//     hash: "0xcde87208d7a58933f50ba41a209d8158fba39f74212b534bd6240831ba19fd88",
//     timestamp: "1673373201",
//   },
//   logs: [
//     {
//       logIndex: "438",
//       transactionHash:
//         "0x5c9d1dcefe824fd94b06539e82f1b5bfd5983887740623c327774217db5537ab",
//       address: "0x7e8e97a66a935061b2f5a8576226175c4fde0ff9",
//       data: "0x",
//       topic0:
//         "0x6aa3eac93d079e5e100b1029be716caa33586c96aa4baac390669fb5c2a21212",
//       topic1:
//         "0x0000000000000000000000000000000000000000000000000000000000000022",
//       topic2:
//         "0x000000000000000000000000e008a5cd8a80bb1e0dacc2d587e00743e943afde",
//       topic3: null,
//     },
//   ],
//   txs: [
//     {
//       hash: "0x5c9d1dcefe824fd94b06539e82f1b5bfd5983887740623c327774217db5537ab",
//       gas: "94265",
//       gasPrice: "48920154072",
//       nonce: "22",
//       input:
//         "0x38926b6d000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000041cc7c179147d74450f3d92c7066b9349fa991f4b8d1e454f50c3414d4c07f3813647165e0402a1552b7325d8f27dfee8aeb98575450a64f0806569e91c03a5b371b00000000000000000000000000000000000000000000000000000000000000",
//       transactionIndex: "161",
//       fromAddress: "0xe008a5cd8a80bb1e0dacc2d587e00743e943afde",
//       toAddress: "0x7e8e97a66a935061b2f5a8576226175c4fde0ff9",
//       value: "0",
//       type: "2",
//       v: "0",
//       r: "68977135960867142891528612159128804402875018690259128824277833615622367722713",
//       s: "47778737368529997912610728656468399293995018830743676205574584165571073267604",
//       receiptCumulativeGasUsed: "20498597",
//       receiptGasUsed: "94265",
//       receiptContractAddress: null,
//       receiptRoot: null,
//       receiptStatus: "1",
//     },
//   ],
//   txsInternal: [],
//   erc20Transfers: [],
//   erc20Approvals: [],
//   nftTokenApprovals: [],
//   nftApprovals: {
//     ERC721: [],
//     ERC1155: [],
//   },
//   nftTransfers: [],
//   nativeBalances: [],
// };

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
