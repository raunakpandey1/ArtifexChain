//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// provides a simple way to manage and update numerical counters in Solidity smart contracts
import "@openzeppelin/contracts/utils/Counters.sol";
// used to create new NFT contracts or add NFT functionality to existing contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; 
// allows developers to easily store and retrieve metadata associated with their NFTs on the Ethereum blockchain
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PaintingMarketplace is ERC721URIStorage{
    //using A for B 
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //initializes the name and symbol of the NFT contract being created.
    constructor() ERC721("PaintingMarketplace", "PNFT") {}

    //Function to mint the NFT
    function mint(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();    //current token Id
        _mint(msg.sender, newItemId);       //create and assign ownership of a new NFT to the specified address
        _setTokenURI(newItemId, tokenURI);  //to set the URI for a given token ID

        return newItemId;
    }

    //Keep track of total NFT minted
    function totalNFTCount() public view returns (uint256) {
        return _tokenIds.current();
    }
}
