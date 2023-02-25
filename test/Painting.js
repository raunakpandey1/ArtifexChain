const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {
    let paintingMarketplace
    it('save the address' , async()=>{
        const PaintingMarketplace = await ethers.getContractFactory('PaintingMarketplace')
        paintingMarketplace = await PaintingMarketplace.deploy()
        console.log(paintingMarketplace.address)
    })
 })
