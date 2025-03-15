require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-vyper");
require("dotenv").config();

const key = process.env["43f_pk"];

module.exports = {
  solidity: "0.8.20",
  vyper: {
    version: "0.3.7",
  },
  paths: {
    sources: "./contracts",
    artifacts: "./swapui/src/artifacts/",
  },
  networks: {
    ganache: {
      url: "http://localhost:7545",
      chainId: 1337,
    },
    base: {
      url: "https://mainnet.base.org",
      chainId: 8453,
      accounts: [key],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/k1nf0oOfrryTLAt7fKP2NUENWS98YNH0`,
      accounts: [key],
    },
  },
};
