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

require('dotenv').config()
const Web3 = require('web3')
const fs = require('fs')

const tokenA = process.env.TokenA
const tokenB = process.env.TokenB
const to = '0x87227F5771eF47845118ecdb276D75f911aAaBD7'

const factory_address = process.env.FACTORY_ADDRESS

const meta_mask_linux_account_2 = '0xC29082511fEBc2185986d341ee8be3c9B2c66b66' //Firefox

const rawdata = fs.readFileSync('./build/contracts/HandleFactory.json')
const HandelFactory = JSON.parse(rawdata)

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const contract = new web3.eth.Contract(HandelFactory.abi, factory_address)

const _data = contract.methods.createPair(tokenA, tokenB).encodeABI()

const tx = {
  gas: 5000000,
  to: factory_address,
  value: '0x00',
  data: _data,
  chainId: 3
}

// HD account 0
const PRIVATE_KEY = '0x01ece2ecc7a68dd7640be9983ec9d5e161c042e7431f0efc7cf6d125bba275ab'

web3.eth.accounts.signTransaction(tx, PRIVATE_KEY).then(signed => {
  console.log(signed.rawTransaction)
  web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
})

// completed 0x55af992ed54749df5e629b4d88f814e9437556ae7590243616c7bbd737c976af
// https://ropsten.etherscan.io/tx/0x55af992ed54749df5e629b4d88f814e9437556ae7590243616c7bbd737c976af
