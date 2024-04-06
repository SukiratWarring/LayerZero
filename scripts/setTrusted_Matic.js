const hre = require("hardhat");
const OMNIABI = require("../constants/Omni.json");
// const { ethers } = require("ethers");
async function main() {
  let localContract = "OmniCounter";
  // get local contract
  const localContractInstance = await hre.ethers.getContractAt(
    OMNIABI.abi,
    "0x8072D087bB099E1E196A2deF7b3F9825f1BEBDB3"
  );

  // get deployed remote contract address BSC
  const remoteAddress = "0x25Ef6A5D323F4Bb2e17BFB69A408f60d47F1E45d";

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
