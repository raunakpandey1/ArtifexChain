# ArtifexChain

ArtifexChain is a decentralized application built on Ethereum blockchain that offers a unique NFT marketplace for paintings.The technology stack includes React.js for the frontend framework, Hardhat for development, Ethers.js for blockchain interaction, Solidity for writing smart contracts and tests, and Javascript for React and testing. The integration with Pinata ensures secure and decentralized storage and distribution of media files.

Users can list their paintings for sale by uploading metadata to Pinata, (a media storage and distribution platform on IPFS), and then mint an NFT for the asset. Buyers can then purchase the artwork and make payment through a third-party smart contract called escrow. With approval of both buyer and seller and payment completion , ownership of the NFT is transferred to the buyer.

In conclusion, ArtifexChain offers a unique platform for artists to sell their paintings as NFTs and for buyers to own unique and valuable digital assets.


## Technology Stack & Tools
- [React.js](https://reactjs.org/) (Frontend Framework)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)
- [Pinata](https://www.pinata.cloud/) (Media storage and distribution on IPFS)


## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ npm install`

### 3. Start Hardhat node
`$ npx hardhat node`

### 4. Run deployment script
In a separate terminal execute:
`$ npx hardhat run ./scripts/deploy.js --network localhost`

### 5. Create Pinata Account 
add your own API key under Authorization -> JWT

### 6. Start frontend
`$ npm start`