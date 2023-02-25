# Painting NFT DApp

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