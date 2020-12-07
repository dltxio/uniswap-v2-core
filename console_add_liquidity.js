// add liquditiy to a pair via the router

const Web3 = require('web3')
const fs = require('fs')

const Eth = require('ethjs')
const Abi = require('ethjs-abi')

// const Sign = require("ethjs-signer").sign;
// const HdKey = require("ethereumjs-wallet/hdkey");

const tokenA = '0xbe0384bcCDCA2172585D0760d386D4e9DdeAB5C2' //AUD
const tokenB = '0x535A548A5b736791c3ff7177AC33948e43518EA9' //YEN
const to = '0x87227F5771eF47845118ecdb276D75f911aAaBD7'

// You can get the contract pair from "console_create_pair.js" and "console_get_pair_data.js"
//const contract_address = '0x1C583d76C45165C25c5aeea7a51415012122adB5'
//const contract_address = '0x2Ec22d2A7a7399f60A553a71BB0A22BA8B61f48D' //MONDAY 7/12 NO WETH
//const contract_address = '0x4C297C43fF3A4466e5a493db55952B4Af5572010' //MONDAY 7/12 REMOVE CREATE_2
const contract_address = '0x17cd8F63481b27Afefd12985d1b802a866364B27' //MONDAY 7/12 CHANGE CREATE_2


const meta_mask_mac_account_1 = '0x9943d42D7a59a0abaE451130CcfC77d758da9cA0'
const meta_mask_mac_account_2 = '0x87227F5771eF47845118ecdb276D75f911aAaBD7'

//Should have AUD and YEN
const meta_mask_linux_account_2 = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66' //Firefox

const TWENTY_THIRTY = 18934560000000

let rawdata = fs.readFileSync('./build/HandleRouter.json')
const HandleRouter = JSON.parse(rawdata)


const web3 = new Web3(
  new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/f22ec9acdf944e1eb2dc04ed2bea08e5')
)

const contract = new web3.eth.Contract(HandleRouter.abi, contract_address)
//const AUD_JPY_PAIR = '0x1C583d76C45165C25c5aeea7a51415012122adB5'

const getFactory = async () => {
  const result = await contract.methods.factory().call()
  console.log(result)
}

const getWETH = async () => {
  const result = await contract.methods.WETH().call()
  console.log(result)
}

const createPair = async () => {
  const result = await contract.methods.createPair(tokenA, tokenB).call()
  console.log(result)
}

const _data = contract.methods
  .addLiquidity(tokenA, tokenB, 5, 5, 1, 1, to, TWENTY_THIRTY)
  .encodeABI()


const tx = {
  gas: 5000000,
  to: contract_address,
  value: '0x00',
  data: _data,
  chainId: 3
}


web3.eth.getTransactionCount(meta_mask_linux_account_2, 'pending').then(nonce => {
  console.log(nonce)
})

// // linux meta mask private key
const PRIVATE_KEY = '0x2cccc34c1f3028d05b2a617d05ce60711258a0dd344a12f33dab6cc87aef6135'

web3.eth.accounts
  .signTransaction(tx, PRIVATE_KEY)
  .then(signed => {
    console.log(signed.rawTransaction)
    web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
})

//createPair()
//console.log('should be 0xEA4EEA1fF38b08794564F97349C66531f02d333C')
// getWETH()