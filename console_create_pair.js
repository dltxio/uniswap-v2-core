// calls handlefactor create pair

// function createPair(address tokenA, address tokenB) external returns (address pair) {
//     require(tokenA != tokenB, 'Handle: IDENTICAL_ADDRESSES');
//     (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
//     require(token0 != address(0), 'Handle: ZERO_ADDRESS');
//     require(getPair[token0][token1] == address(0), 'Handle: PAIR_EXISTS'); // single check is sufficient
//     bytes memory bytecode = type(UniswapV2Pair).creationCode;
//     bytes32 salt = keccak256(abi.encodePacked(token0, token1));
//     assembly {
//         pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
//     }
//     IUniswapV2Pair(pair).initialize(token0, token1);
//     getPair[token0][token1] = pair;
//     getPair[token1][token0] = pair; // populate mapping in the reverse direction
//     allPairs.push(pair);
//     emit PairCreated(token0, token1, pair, allPairs.length);
// }

const Web3 = require('web3')
const fs = require('fs')

const Eth = require('ethjs')
const Abi = require('ethjs-abi')

// const Sign = require("ethjs-signer").sign;
// const HdKey = require("ethereumjs-wallet/hdkey");

const tokenA = '0xbe0384bcCDCA2172585D0760d386D4e9DdeAB5C2' //AUD
const tokenB = '0x535A548A5b736791c3ff7177AC33948e43518EA9' //YEN
const to = '0x87227F5771eF47845118ecdb276D75f911aAaBD7'

const contract_address = '0xEA4EEA1fF38b08794564F97349C66531f02d333C'

const meta_mask_mac_account_1 = '0x9943d42D7a59a0abaE451130CcfC77d758da9cA0'
const meta_mask_mac_account_2 = '0x87227F5771eF47845118ecdb276D75f911aAaBD7'

const meta_mask_linux_account_2 = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66' //Firefox

let rawdata = fs.readFileSync('./build/HandleFactory.json')
let HandelFactory = JSON.parse(rawdata)

const _data = contract.methods
  .createPair(tokenA, tokenB)
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

const PRIVATE_KEY = '0x2cccc34c1f3028d05b2a617d05ce60711258a0dd344a12f33dab6cc87aef6135'

web3.eth.accounts
  .signTransaction(tx, PRIVATE_KEY)
  .then(signed => {
    console.log(signed.rawTransaction)
    web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
})


// completed 0x55af992ed54749df5e629b4d88f814e9437556ae7590243616c7bbd737c976af
// https://ropsten.etherscan.io/tx/0x55af992ed54749df5e629b4d88f814e9437556ae7590243616c7bbd737c976af