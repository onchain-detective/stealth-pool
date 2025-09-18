import { ethers } from "hardhat";

async function main() {
  console.log("Deploying StealthPool contract...");

  // Get the contract factory
  const StealthPool = await ethers.getContractFactory("StealthPool");

  // Deploy the contract with a verifier address (you can change this to your verifier address)
  const verifierAddress = "0x742d35Cc6634C0532925a3b8D0C0E4C8e4b8b8b8"; // Replace with actual verifier address
  
  const stealthPool = await StealthPool.deploy(verifierAddress);

  await stealthPool.waitForDeployment();

  const contractAddress = await stealthPool.getAddress();
  
  console.log("StealthPool deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Verify the contract on Etherscan
  console.log("Waiting for block confirmations...");
  await stealthPool.deploymentTransaction()?.wait(6);
  
  console.log("Contract deployed successfully!");
  console.log("Contract address:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
