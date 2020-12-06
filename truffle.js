require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  plugins: ["truffle-security", "solidity-coverage"],
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 6721975,
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC
          },
          providerOrUrl: process.env.INFURA_URL
        })
      },
      network_id: "3",
      gas: 4500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    main: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic: {
            phrase:  process.env.MNEMONIC,
          },
          providerOrUrl: process.env.INFURA_URL,
          addressIndex: 1
        })
      },
      network_id: "1",
      //gas: 10000000,
      gas: 4600000,
      gasPrice: 20000000000,
      confirmations: 2,
      timeoutBlocks: 100,
      skipDryRun: false,
    },
  },
  compilers: {
    solc: {
      version: "0.6.6",
    },
  },
  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "AUD",
    },
  }
};
