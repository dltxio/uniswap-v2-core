const Web3 = require('web3')
const fs = require('fs')

const Eth = require('ethjs')
const Abi = require('ethjs-abi')
// const Sign = require("ethjs-signer").sign;
// const HdKey = require("ethereumjs-wallet/hdkey");

const tokenA = '0xbe0384bcCDCA2172585D0760d386D4e9DdeAB5C2' //AUD
const tokenB = '0x535A548A5b736791c3ff7177AC33948e43518EA9' //YEN
const to = '0x87227F5771eF47845118ecdb276D75f911aAaBD7'

const meta_mask_mac_account_1 = '0x9943d42D7a59a0abaE451130CcfC77d758da9cA0'
const meta_mask_mac_account_2 = '0x87227F5771eF47845118ecdb276D75f911aAaBD7'

const meta_mask_linux_account_2 = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66' //Firefox

let rawdata = fs.readFileSync('./build/contracts/HandleRouter.json')
let HandleRouter = JSON.parse(rawdata)

const add_liqudity_abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenA',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'tokenB',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amountADesired',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amountBDesired',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amountAMin',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amountBMin',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256'
      }
    ],
    name: 'addLiquidity',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountA',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amountB',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'liquidity',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

const web3 = new Web3(
  new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/f22ec9acdf944e1eb2dc04ed2bea08e5')
)

// const contractInstance = contract.at("0xE7de09e38e9e1D32869F103DF85A6ed78bBB6abf");
const contract = new web3.eth.Contract(HandleRouter.abi, '0xE7de09e38e9e1D32869F103DF85A6ed78bBB6abf')

const getAmountOut = async () => {
  const result = await contract.methods.getAmountOut(1, 1, 1).call()
  console.log(result)
}

const addLiquidity = async () => {
  const AUD = tokenA //"0xbe0384bcCDCA2172585D0760d386D4e9DdeAB5C2";
  const JPY = tokenB //"0x535A548A5b736791c3ff7177AC33948e43518EA9";

  const result = await contract.methods.addLiquidity(AUD, JPY, 10, 10, 1, 1, meta_mask_linux_account_2).call()
  console.log(result)
}

const getFactory = async () => {
  const result = await contract.methods.factory().call()
  console.log(result)
}

//getAmountOut();
//getFactory();

// function addLiquidity(
//     address tokenA,
//     address tokenB,
//     uint amountADesired,
//     uint amountBDesired,
//     uint amountAMin,
//     uint amountBMin,
//     address to,
//     uint deadline
// ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
//     (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
//     address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
//     TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
//     TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
//     liquidity = IUniswapV2Pair(pair).mint(to);
// }

const TWENTY_THIRTY = 1893456000
const _data = contract.methods
  .addLiquidity(tokenA, tokenB, 10, 10, 1, 1, meta_mask_mac_account_1, TWENTY_THIRTY)
  .encodeABI()
const tx = {
  // nonce: 43,
  // gasPrice: "4000000000",
  gas: 5000000,
  to: '0xE7de09e38e9e1D32869F103DF85A6ed78bBB6abf',
  value: '0x00',
  data: _data,
  chainId: 3
}

web3.eth.getTransactionCount(meta_mask_linux_account_2, 'pending').then(nonce => {
  console.log(nonce)
})

web3.eth.accounts
  .signTransaction(tx, '0x2cccc34c1f3028d05b2a617d05ce60711258a0dd344a12f33dab6cc87aef6135')
  .then(signed => {
    console.log(signed.rawTransaction)
    web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
  })
