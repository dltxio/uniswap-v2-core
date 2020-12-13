const HandleFactory = artifacts.require('HandleFactory')

module.exports = async (deployer, network, accounts) => {

  if (network === "development") {
    const factory = await HandleFactory.deployed();
    const pair = await factory.createPair('0xbEE597Ad7674a9E92bc284515d35Fd20E2b81371', '0x7FB799BeCD588f2f6395DCc17f54C1fF350D2464');

    console.log(pair);
  }
}
