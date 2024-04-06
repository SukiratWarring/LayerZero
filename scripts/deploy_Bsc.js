const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json");

const hre = require("hardhat");

async function main() {
  const lock = await hre.ethers.deployContract("OmniCounter", [
    "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
  ]);

  await lock.waitForDeployment();

  console.log(`Contract deployed to ${lock.target}`);
}
// 0x25Ef6A5D323F4Bb2e17BFB69A408f60d47F1E45d
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
