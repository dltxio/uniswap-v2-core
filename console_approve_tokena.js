// allow the router to transfer from linux account

const Web3 = require('web3')
const fs = require('fs')

// You can get the contract pair from "console_create_pair.js" and "console_get_pair_data.js"
const router_address = '0xE08bdfD3169EDbeeE7d8c8ccaA2ec3710f3ba85C'

const tokenA = '0xbe0384bcCDCA2172585D0760d386D4e9DdeAB5C2' //AUD


//Should have AUD and YEN
const meta_mask_linux_account_2 = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66' //Firefox

let rawdata = fs.readFileSync('./build/ERC20.json')
const ERC20 = JSON.parse(rawdata)


const web3 = new Web3(
  new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/f22ec9acdf944e1eb2dc04ed2bea08e5')
)

const contract = new web3.eth.Contract(ERC20.abi, tokenA)

// approve the router to transfer from linux user
const _data = contract.methods
  .approve(router_address, 10)
  .encodeABI()


const tx = {
  // nonce: 43,
  // gasPrice: "4000000000",
  gas: 5000000,
  to: tokenA,
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

