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
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/k1nf0oOfrryTLAt7fKP2NUENWS98YNH0`, 
      accounts: ['5babb7f0a76a04e1afc6ca84c40de75095d294bc81219ed6886324e25e3da852']
    }
  },
}; 
  