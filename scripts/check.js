const hre = require("hardhat");
const OMNIABI = require("../constants/Omni.json");
function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

async function main() {
  const localContractInstance = await hre.ethers.getContractAt(
    OMNIABI.abi,
    "0x958B0C0E247104Ba2774c7950C505DA401692821"
  );

  while (true) {
    let counter = await localContractInstance.counter();
    console.log(
      `[${hre.network.name}] ${
        new Date().toISOString().split("T")[1].split(".")[0]
      } counter...    ${counter}`
    );
    await sleep(1000);
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
