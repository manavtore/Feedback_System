const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const Feedback_system = await ethers.getContractFactory('feedback_system');
  const feedback_system = await Feedback_system.deploy('manav');

  console.log('feedback_system address:', feedback_system.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
