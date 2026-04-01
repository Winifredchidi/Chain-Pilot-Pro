const axios = require("axios");

const CHAIN_IDS = {
  base: 8453,
  arbitrum: 42161,
  polygon: 137
};

const USDC = {
  base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  arbitrum: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  polygon: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359"
};

async function getQuote(fromChainName, toChainName) {
  const url = "https://li.quest/v1/quote";

  const params = {
    fromChain: CHAIN_IDS[fromChainName],
    toChain: CHAIN_IDS[toChainName],
    fromToken: USDC[fromChainName],
    toToken: USDC[toChainName],
    fromAmount: "1000000",
    fromAddress: "0x1111111111111111111111111111111111111111",
    toAddress: "0x1111111111111111111111111111111111111111"
  };

  const res = await axios.get(url, { params });
  return res.data;
}

module.exports = { getQuote };