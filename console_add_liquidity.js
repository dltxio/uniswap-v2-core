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
const contract_address = '0x1C583d76C45165C25c5aeea7a51415012122adB5'

const meta_mask_mac_account_1 = '0x9943d42D7a59a0abaE451130CcfC77d758da9cA0'
const meta_mask_mac_account_2 = '0x87227F5771eF47845118ecdb276D75f911aAaBD7'

//Should have AUD and YEN
const meta_mask_linux_account_2 = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66' //Firefox

const TWENTY_THIRTY = 1893456000

let rawdata = fs.readFileSync('./build/HandleRouter.json')
let HandleRouter = JSON.parse(rawdata)


const web3 = new Web3(
  new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/f22ec9acdf944e1eb2dc04ed2bea08e5')
)

const contract = new web3.eth.Contract(HandleRouter.abi, contract_address)
const AUD_JPY_PAIR = '0x1C583d76C45165C25c5aeea7a51415012122adB5'

const _data = contract.methods
  .addLiqudity(tokenA, tokenB, 5, 5, 1, 1, AUD_JPY_PAIR, TWENTY_THIRTY)
  .encodeABI()


const tx = {
  // nonce: 43,
  // gasPrice: "4000000000",
  gas: 5000000,
  to: contract_address,
  value: '0x00',
  data: _data,
  chainId: 3
}


web3.eth.getTransactionCount(meta_mask_linux_account_2, 'pending').then(nonce => {
  console.log(nonce)
})

// linux meta mask private key
const PRIVATE_KEY = '0x2cccc34c1f3028d05b2a617d05ce60711258a0dd344a12f33dab6cc87aef6135'

web3.eth.accounts
  .signTransaction(tx, PRIVATE_KEY)
  .then(signed => {
    console.log(signed.rawTransaction)
    web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
  })
