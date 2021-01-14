const UniswapV2ERC20 = artifacts.require('UniswapV2ERC20')
const UniswapV2Pair = artifacts.require('UniswapV2Pair')
const HandleFactory = artifacts.require('HandleFactory')

module.exports = async (deployer, network) => {
  //console.log(HandleFactory)

  //await deployer.deploy(UniswapV2ERC20)
  //await deployer.deploy(UniswapV2Pair)
  await deployer.deploy(HandleFactory)

  if (network === "kovan") {
    const factory = await HandleFactory.deployed();

    console.log("Factory address")
    console.log(factory.address)

    //AUD
    //const aud_jpy_pair = await factory.createPair('0xabaf0c048Cb12d8D8f253e861ACe9d3303044F88', '0x2457D44852CD8A271a26682CA3C3eC1159c9189E');
    const aud_jpy_pair = await factory.getPair('0xabaf0c048Cb12d8D8f253e861ACe9d3303044F88', '0x2457D44852CD8A271a26682CA3C3eC1159c9189E')
    console.log("Pair address")
    console.log(aud_jpy_pair)

    const new_aud_jpy_pair = await factory.createPair('0xabaf0c048Cb12d8D8f253e861ACe9d3303044F88', '0x2457D44852CD8A271a26682CA3C3eC1159c9189E')
    console.log(new_aud_jpy_pair)
  }
}
