const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json");

const hre = require("hardhat");

async function main() {
  const lock = await hre.ethers.deployContract("OmniCounter", [
    "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8",
  ]);

  await lock.waitForDeployment();

  console.log(`Contract deployed to ${lock.target}`);
}
// 0x958B0C0E247104Ba2774c7950C505DA401692821
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
