const OMNIABI = require("../constants/Omni.json");

const hre = require("hardhat");

async function main() {
  const remoteChainId = "10109";
  const localContractInstance = await hre.ethers.getContractAt(
    OMNIABI.abi,
    "0x25Ef6A5D323F4Bb2e17BFB69A408f60d47F1E45d"
  );

  // quote fee with default adapterParams
  const adapterParams = ethers.solidityPacked(
    ["uint16", "uint256"],
    [1, 200000]
  ); // default adapterParams example

  const payload = await localContractInstance.PAYLOAD();
  const endpoint = await ethers.getContractAt(
    "ILayerZeroEndpoint",
    "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1" //BSC
  );
  const fees = await endpoint.estimateFees(
    remoteChainId,
    localContractInstance.target,
    payload,
    false,
    adapterParams
  );
  console.log("fees[0]", fees[0]);
  let tx = await (
    await localContractInstance.incrementCounter(remoteChainId, {
      value: fees[0],
    })
  ).wait();
  console.log(
    `✅ Message Sent [${hre.network.name}] incrementCounter on destination OmniCounter @ [${remoteChainId}]`
  );
  console.log(`tx: ${tx.transactionHash}`);

  console.log(``);
  console.log(
    `Note: to poll/wait for the message to arrive on the destination use the command:`
  );
  console.log(`       (it may take a minute to arrive, be patient!)`);
  console.log("");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
