const hre = require("hardhat");
const OMNIABI = require("../constants/Omni.json");
// const { ethers } = require("ethers");
async function main() {
  let localContract = "OmniCounter";
  // get local contract
  const localContractInstance = await hre.ethers.getContractAt(
    OMNIABI.abi,
    "0x338380f40fB18b48663f0FE53C86269E92Be6a2A"
  );

  // get deployed remote contract address,MUMBAI CHAIN
  const remoteAddress = "0x958B0C0E247104Ba2774c7950C505DA401692821";

  // get remote chain id MUMBAI CHAIN
  const remoteChainId = "10109";
  console.log("localContractInstance.target", localContractInstance);

  // concat remote and local address
  let remoteAndLocal = hre.ethers.solidityPacked(
    ["address", "address"],
    [remoteAddress, localContractInstance.target]
  );

  // check if pathway is already set
  const isTrustedRemoteSet = await localContractInstance.isTrustedRemote(
    remoteChainId,
    remoteAndLocal
  );

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
// 0x25Ef6A5D323F4Bb2e17BFB69A408f60d47F1E45d
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
