require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-vyper");

module.exports = {
  solidity: "0.8.20",
  vyper: {
    version: "0.3.7"
  },
  paths: {
    sources: './contracts',
    artifacts: './swapui/src/artifacts/'
  }, 
  networks: {
    ganache: {
      url: "http://localhost:7545",
      chainId: 1337, 
    }, 
  },
};
