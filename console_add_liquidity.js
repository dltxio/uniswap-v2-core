// add liquditiy to a pair via the router

const Web3 = require('web3')
const fs = require('fs')

// const Eth = require('ethjs')
// const Abi = require('ethjs-abi')


// You can get the contract pair from "console_create_pair.js" and "console_get_pair_data.js"
const router_address = '0x77cC2004C2da2FAD7Df19E421803460C7dF9d403'

const tokenA = '0xAb2493C5950c1FC1034ccDF5A98c9A0f80E926a4' //AUD
const tokenB = '0x97053Ec1caa6518e107C3dA4E8c37f0c61A0D22b' //YEN
const to = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66'



//Should have AUD and YEN
const meta_mask_linux_account_2 = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66' //Firefox

const TWENTY_THIRTY = 18934560000000

const rawdata = fs.readFileSync('./build/contracts/HandleRouterSimple.json')
const HandleRouter = JSON.parse(rawdata)

const web3 = new Web3(
  //new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/f22ec9acdf944e1eb2dc04ed2bea08e5')
  new Web3.providers.HttpProvider('http://localhost:8545')
)

//web3.eth.handleRevert = true

const contract = new web3.eth.Contract(HandleRouter.abi, router_address)

const pairFor = async () => {
  const result = await contract.methods.pairFor(tokenA, tokenB).call()
  console.log(result)
}

const _data = contract.methods.addLiquidity(tokenA, tokenB, 5, 5, 1, 1, to, TWENTY_THIRTY).encodeABI()

const tx = {
  gas: 5000000,
  to: router_address,
  value: '0x00',
  data: _data,
  chainId: 3
}

web3.eth.getTransactionCount(meta_mask_linux_account_2, 'pending').then(nonce => {
  console.log(nonce)
})

// // linux meta mask private key
const PRIVATE_KEY = '0x2cccc34c1f3028d05b2a617d05ce60711258a0dd344a12f33dab6cc87aef6135'

const doTx = async () => {
  const signed = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  console.log(signed.rawTransaction)

  //var result = await web3.eth.sendSignedTransaction(signed.rawTransaction)
  //console.log(result)

  //web3.eth.handleRevert = true

  // try {
    var result = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    console.log(result)
  // } catch (err) {
  //   console.log('error')
  //   console.log(err.receipt.status)
  //   console.log(err)
  // }
}

//doTx()
pairFor()
