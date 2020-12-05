// calls handlefactor create pair

const Web3 = require('web3')
const fs = require('fs')

const Eth = require('ethjs')
const Abi = require('ethjs-abi')
const { TokenClass } = require('typescript')

// const Sign = require("ethjs-signer").sign;
// const HdKey = require("ethereumjs-wallet/hdkey");

const tokenA = '0xbe0384bcCDCA2172585D0760d386D4e9DdeAB5C2' //AUD
const tokenB = '0x535A548A5b736791c3ff7177AC33948e43518EA9' //YEN


const contract_address = '0xEA4EEA1fF38b08794564F97349C66531f02d333C'
const meta_mask_linux_account_2 = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66' //Firefox

let rawdata = fs.readFileSync('./build/HandleFactory.json')
let HandelFactory = JSON.parse(rawdata)

const web3 = new Web3(
  new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/f22ec9acdf944e1eb2dc04ed2bea08e5')
)

const contract = new web3.eth.Contract(HandelFactory.abi, contract_address)

web3.eth.getTransactionCount(meta_mask_linux_account_2, 'pending').then(nonce => {
  console.log(nonce)
})


const allPairsLength = async () => {
  console.log('Pairs created')
  const result = await contract.methods.allPairsLength().call()
  console.log(result)
}


const getPair = async () => {
  const result = await contract.methods.getPair(tokenA, tokenB).call()
  console.log('Pairs')
  console.log(result)
}


allPairsLength()
getPair()