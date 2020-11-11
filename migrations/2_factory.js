const HandleFactory = artifacts.require('HandleFactory')

module.exports = async (deployer, _, accounts) => {
  const user = accounts[0]
  await deployer.deploy(HandleFactory, user)
}
