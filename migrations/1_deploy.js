const UniswapV2ERC20 = artifacts.require("UniswapV2ERC20");
const UniswapV2Pair = artifacts.require("UniswapV2Pair");
const HandleFactory = artifacts.require("HandleFactory");


module.exports = async (deployer) => {

  console.log(HandleFactory)

  //await deployer.deploy(UniswapV2ERC20);
  //await deployer.deploy(UniswapV2Pair);
  //await deployer.deploy(HandleFactory("0xa1138fccd5f8E126E8d779CF78a547517307559d"));
  await deployer.deploy(HandleFactory);
};
