// calls handlefactor create pair
require("dotenv").config();

const Web3 = require('web3')
const fs = require('fs')

const tokenA = process.env.TokenA 
const tokenB = process.env.TokenB 

const factory_address =  process.env.FACTORY_ADDRESS 
const meta_mask_linux_account_2 = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66' //Firefox

const rawdata = fs.readFileSync('./build/contracts/HandleFactory.json')
const HandelFactory = JSON.parse(rawdata)

const web3 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:8545')
)

const contract = new web3.eth.Contract(HandelFactory.abi, factory_address)
// console.log(contract)

const allPairsLength = async () => {
  //console.log('Pairs created')
  const result = await contract.methods.allPairsLength().call()
  console.log(result)
}

const getFeeTo = async () => {
  //console.log('Fee to')
  const result = await contract.methods.feeTo().call()
  console.log(result)
}

const getPair = async () => {
  const result = await contract.methods.getPair(tokenA, tokenB).call()
  const inverseResult = await contract.methods.getPair(tokenB, tokenA).call()
  console.log('Pairs (should be identical)')
  console.log(result)
  console.log(inverseResult)
}

getFeeTo()
getPair()
