const UniswapV2ERC20 = artifacts.require('UniswapV2ERC20')
//const UniswapV2Pair = artifacts.require("UniswapV2Pair");

module.exports = async deployer => {
  await deployer.deploy(UniswapV2ERC20)
  //await deployer.deploy(UniswapV2Pair);
}
