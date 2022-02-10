// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat")
require("@nomiclabs/hardhat-ethers");
// const fs = require('fs');
const Fs = require('@supercharge/filesystem')


const deployContract = async (name, params = []) => {
  const contractFactory = await ethers.getContractFactory(name)
  const contract = await contractFactory.deploy(...params)
  await contract.deployed()
  console.log(`${name} address:`, contract.address)
  // genderate file
  try {
    await Fs.ensureFile(`./address/${name}.json`)
    await Fs.writeFile(`./address/${name}.json`, JSON.stringify({ address: contract.address }, null, 2));
    console.log(`update contract address to ../address/${name}.json`);
  } catch (e) {
    console.log(e)
  }
  return contract
}

async function main() {
  const deployers = await ethers.getSigners();
  const deployer = deployers[0].address
  // We get the contract to deploy
  const initSupply = 5000 * 10 ** 4;
  // const AtomicTokenContract = await deployContract('AtomicToken', [initSupply])
  const RentRentToken = await deployContract('RentRentToken', [initSupply])
  // const KryContract = await deployContract('KycContract', [])
  // await deployContract('DuctionAuctionCrowdSale', [100, deployer, AtomicTokenContract.address, KryContract.address])
  // await deployContract('Market', [])
  console.log('done!')
  // const AtomicToken = await hre.ethers.getContractFactory("AtomicToken")
  // const dAtomicToken = await AtomicToken.deploy(initSupply)
  // await dAtomicToken.deployed()

  // const KycContract = await hre.ethers.getContractFactory("KycContract")
  // const dKycContract = await KycContract.deploy()
  // await dKycContract.deployed()

  // const DuctionAuctionCrowdSale = await hre.ethers.getContractFactory("DuctionAuctionCrowdSale")
  // const dDuctionAuctionCrowdSale = await DuctionAuctionCrowdSale.deploy(100, deployer, AtomicTokenContract.address, dKycContract.address)
  // await dDuctionAuctionCrowdSale.deployed()

  // console.log('AtomicToken address: ', dAtomicToken.address)
  // console.log('KycContract address: ', dKycContract.address)
  // console.log('DuctionAuctionCrowdSale address: ', dDuctionAuctionCrowdSale.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
