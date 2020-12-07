// add liquditiy to a pair via the router
require("dotenv").config();
const Web3 = require('web3')
const fs = require('fs')

// You can get the contract pair from "console_create_pair.js" and "console_get_pair_data.js"
const router_address = process.env.ROUTER_ADDRESS

const tokenA = process.env.TokenA 
const tokenB = process.env.TokenB 
const to = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66'

//Should have AUD and YEN
//const meta_mask_linux_account_2 = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66' //Firefox
const from_account = '0x2D0b5c2832390dB34Ab776FB1fF509880Cd93FdF'

const TWENTY_THIRTY = 18934560000000

const rawdata = fs.readFileSync('./build/contracts/HandleRouter.json')
const HandleRouter = JSON.parse(rawdata)

const web3 = new Web3(
  //new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/f22ec9acdf944e1eb2dc04ed2bea08e5')
  new Web3.providers.HttpProvider('http://localhost:8545')
)

const contract = new web3.eth.Contract(HandleRouter.abi, router_address)

const getFactory = async () => {
  const result = await contract.methods.factory().call()
  console.log(result)
}

// web3.eth.getTransactionCount(meta_mask_linux_account_2, 'pending').then(nonce => {
//   console.log(nonce)
// })

// // linux meta mask private key
// const PRIVATE_KEY = '0x2cccc34c1f3028d05b2a617d05ce60711258a0dd344a12f33dab6cc87aef6135'

const doTx = async () => {
  const PRIVATE_KEY = '0xf5410aef0da41e8ac7fe4f73d3a274911e1c12a28a3228233f2aa18932795ed8'
  const _data = contract.methods.addLiquidity(tokenA, tokenB, 5, 5, 1, 1, to, TWENTY_THIRTY).encodeABI()

  const tx = {
    gas: 5000000,
    to: router_address,
    value: '0x00',
    data: _data,
    chainId: 3
  }

  const signed = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  console.log(signed.rawTransaction)

  // try {
  const result = await web3.eth.sendSignedTransaction(signed.rawTransaction)
  console.log(result)
  // } catch (err) {
  //   console.log('error')
  //   console.log(err.receipt.status)
  //   console.log(err)
  // }
}

doTx()
//getFactory()
