// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// import axios from "axios";
// import React from 'react'

const hre  = require("hardhat");
const {ethers}= require("hardhat");
 
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}



async function main() {
    // Setup accounts
    
   
    
    const [buyer, seller] = await ethers.getSigners()

    // Deploy PaintingMarketplace
    const PaintingMarketplace = await ethers.getContractFactory('PaintingMarketplace')
    const paintingMarketplace = await PaintingMarketplace.deploy()
    await paintingMarketplace.deployed()
  
    console.log(`Deployed PaintingMarketplace Contract at: ${paintingMarketplace.address}`)
    console.log(`Minting 3 properties...\n`)
  
    // for (let i = 0; i < 3; i++) {
    //   const transaction = await paintingMarketplace.connect(seller).mint(`https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${i + 1}.json`)
    //   await transaction.wait()
    // }
  
    const transaction11 = await paintingMarketplace.connect(seller).mint('https://gateway.pinata.cloud/ipfs/QmS4mfxQQdPkMCHhJq9gfbUVRbdtYLZwSvdMLfbnorAydC')
    await transaction11.wait()
    
    const transaction12 = await paintingMarketplace.connect(seller).mint('https://gateway.pinata.cloud/ipfs/QmUG7Q5hxYJUKg9LotyWreFf1rvQzcci37hPwg324EEbG7')
    await transaction12.wait()

    const transaction13 = await paintingMarketplace.connect(seller).mint('https://gateway.pinata.cloud/ipfs/Qma4cLsFDEgFJMtwGTn538KUj5c4Ri1Cn53PqU1C7uajYV')
    await transaction13.wait()

    // Deploy Escrow
    const Escrow = await ethers.getContractFactory('Escrow')
    const escrow = await Escrow.deploy(
      paintingMarketplace.address,
      seller.address,
     )
    await escrow.deployed()
  
    console.log(`Deployed Escrow Contract at: ${escrow.address}`)
    console.log(`Listing 3 properties...\n`)
  
    for (let i = 0; i < 3; i++) {
      // Approve properties...
      let transaction = await paintingMarketplace.connect(seller).approve(escrow.address, i + 1)
      await transaction.wait()
    }
  
    // Listing properties...
    let transaction1 = await escrow.connect(seller).listPaintingNFT(1, buyer.address, tokens(5), tokens(5))
    await transaction1.wait()
  
    let transaction2 = await escrow.connect(seller).listPaintingNFT(2, buyer.address, tokens(10), tokens(10))
    await transaction2.wait()
  
    let transaction3 = await escrow.connect(seller).listPaintingNFT(3, buyer.address, tokens(15) , tokens(15))
    await transaction3.wait()
  
    console.log(`Finished.`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
