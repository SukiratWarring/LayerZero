const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json");

const hre = require("hardhat");

async function main() {
  const lock = await hre.ethers.deployContract("OmniCounter", [
    "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
  ]);

  await lock.waitForDeployment();

  console.log(`Contract deployed to ${lock.target}`);
}
// 0x8072D087bB099E1E196A2deF7b3F9825f1BEBDB3
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
