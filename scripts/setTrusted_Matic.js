const hre = require("hardhat");
const OMNIABI = require("../constants/Omni.json");
// const { ethers } = require("ethers");
async function main() {
  let localContract = "OmniCounter";
  // get local contract
  const localContractInstance = await hre.ethers.getContractAt(
    OMNIABI.abi,
    "0x958B0C0E247104Ba2774c7950C505DA401692821"
  );

  // get deployed remote contract address BSC
  const remoteAddress = "0x338380f40fB18b48663f0FE53C86269E92Be6a2A";

  // get remote chain id
  const remoteChainId = "10102";

  // concat remote and local address
  let remoteAndLocal = hre.ethers.solidityPacked(
    ["address", "address"],
    [remoteAddress, localContractInstance.target]
  );
  console.log("AA");

  // check if pathway is already set
  const isTrustedRemoteSet = await localContractInstance.isTrustedRemote(
    remoteChainId,
    remoteAndLocal
  );
  console.log("HERE");

  if (!isTrustedRemoteSet) {
    try {
      let tx = await (
        await localContractInstance.setTrustedRemote(
          remoteChainId,
          remoteAndLocal
        )
      ).wait();
      console.log(
        `✅ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`
      );
      console.log(` tx: ${tx.transactionHash}`);
    } catch (e) {
      if (
        e.error.message.includes("The chainId + address is already trusted")
      ) {
        console.log("*source already set*");
      } else {
        console.log(
          `❌ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`
        );
      }
    }
  } else {
    console.log("*source already set*");
  }
}
// 0xc77b1fB1e7f101A135b2EDF4e82d5fA749dD1753
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
