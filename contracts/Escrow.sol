//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
}

//Paintings is the third party contract that holds the our NFT(assets) 
contract Escrow {
    address public NFTAddress; //storing smart contract address for NFT
    address payable public seller; //one how owns the paintings

    //Modifier for Buyer
    modifier onlyBuyer(uint256 _nftID) {
        require(msg.sender == buyer[_nftID], "Only buyer can call this method");
        _;
    }
    
    //Modifier for Sell
    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this method");
        _;
    }


    mapping(uint256 => bool) public isListed;   //To keep track of listed paintingNFT
    mapping(uint256 => uint256) public purchasePrice;   //store purchase price of painting NFT
    mapping(uint256 => uint256) public escrowAmount;    //store amount sent by buyer
    mapping(uint256 => address) public buyer;       // store address of buyer with respect to NFT ID
    mapping(uint256 => mapping(address => bool)) public approval;

    constructor(address _nftAddress,address payable _seller) {
        NFTAddress = _nftAddress;       //contructor called store nft and seller address coming for PaintingMarketPlace
        seller = _seller;
    }

    //Function to list the painting NFT which is called by seller only 
    function listPaintingNFT (
        uint256 _nftID,         // stores painting NFT ID
        address _buyer,         //stores address of buyer 
        uint256 _purchasePrice, //Purchase price of painting
        uint256 _escrowAmount   //Amount which will be paid by buyer to purchase the Painting
    ) public payable onlySeller {
        // Transfer NFT from seller to this contract (a neutral platform)
        IERC721(NFTAddress).transferFrom(msg.sender, address(this), _nftID);

         //marking the nft as listed and 
         // storing NFT ID and  purchase price , escrowAmount (amount sent by buyer)  
         // and buyer address in key : value pair
        isListed[_nftID] = true;   
        purchasePrice[_nftID] = _purchasePrice;         
        escrowAmount[_nftID] = _escrowAmount;
        buyer[_nftID] = _buyer;
    }

    // Amount paid by buyer (only buyer - payable escrow)
    function depositEarnest(uint256 _nftID) public payable onlyBuyer(_nftID) {
        require(msg.value >= escrowAmount[_nftID]);
    }
    
    // Approve Sale (Transaction happens only if both party approve the transaction)
    function approveSale(uint256 _nftID) public {
        approval[_nftID][msg.sender] = true;
    }

    // Finalize Sale
    // -> Require buyer approval
    // -> Require saler approval
    // -> Require funds to be correct amount
    // -> Transfer NFT to buyer
    // -> Transfer Funds to Seller
    function SellPaintingNFT(uint256 _nftID) public {
        require(approval[_nftID][buyer[_nftID]]);
        require(approval[_nftID][seller]);
        require(address(this).balance >= purchasePrice[_nftID]);

        isListed[_nftID] = false;   //Now NFT is no longer listed

        (bool success, ) = payable(seller).call{value: address(this).balance}(""); //transfer ether to seller
        require(success);

        IERC721(NFTAddress).transferFrom(address(this), buyer[_nftID], _nftID); //transer NFT ownership to buyer
    }

    receive() external payable {}

    //Function to check the account balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
