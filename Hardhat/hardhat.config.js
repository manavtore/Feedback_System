require('dotenv').config();
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');


const URL = process.env.ALCHEMY_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  networks: {
    sepolia: {
      url:"https://sepolia.infura.io/v3/e55fb61ea02e4d9ab1fac4f8d6bff78a",
      accounts: [`0x${PRIVATE_KEY}`],
      
    }
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
