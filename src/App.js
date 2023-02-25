import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

// Components
import Home from "./components/Home";
import UploadPainting from "./components/UploadPainting";
import Banner from "./components/Banner";
import Topbar from "./components/Topbar";
 
// ABIs
import PaintingMarketplace from "./abis/PaintingMarketplace.json";
import Escrow from "./abis/Escrow.json";

// Config
import config from "./config.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [escrow, setEscrow] = useState(null);
  const [account, setAccount] = useState(null);     

  const [paintings, setPaintings] = useState([]);   //store all NFT meta data
  const [painting, setPainting] = useState({});     //store single painting NFT
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  
  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum); //creates a new instance of the Web3Provider class from the ethers.js library, which is used to interact with the Ethereum blockchain.
    
    setProvider(provider);
    const network = await provider.getNetwork();  //information about the current Ethereum network
    
    // console.log(config[network.chainId].paintingMarketPlace.address , config[network.chainId].escrow.address)
    
    //Create a JavaScript object that represents an Ethereum smart contract.
    const paintingMarketplace = new ethers.Contract(
      config[network.chainId].paintingMarketPlace.address,
      PaintingMarketplace,
      provider
    );

     
    // setPaintingNFTPlace(paintingMarketplace.connect())
    
    
    //Keep track of total NFT created
    const totalNFTCount = await paintingMarketplace.totalNFTCount();
    const paintings = [];
    // console.log(totalNFTCount)
    for (var i = 1; i <= totalNFTCount; i++) {
      const uri = await paintingMarketplace.tokenURI(i);  //to retrieve the URI for a given token ID
      const response = await fetch(uri);    //fetch the meta data from uri
      const metadata = await response.json();   //storing in json format
      console.log(uri);
      paintings.push(metadata);
    }

    setPaintings(paintings);

    const escrow = new ethers.Contract(
      config[network.chainId].escrow.address,
      Escrow,
      provider
    );
    setEscrow(escrow);


    //listens for changes to the currently selected Ethereum account
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };


  let allCIDS =[]
  const retrieveFiles = async () => {
    // e.preventDefault();
    var config = {
      method: "get",
      url: "https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100",
      headers: {
        Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDA5NDJmNS1kMzM3LTRiZTktYWZkMy1mZDViYjg5NjJkNjgiLCJlbWFpbCI6InZvZGFtZTk1NzNAd2lyb3V0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjg4YjZmNTZmMzVhZjA0ZDkyZWUiLCJzY29wZWRLZXlTZWNyZXQiOiJhMTNlNjdlNDhjZmU3MjdkNjNkYzI5NThhNjVhNzI3OWNjMWM4OWUwMjgwZmQ0NTUwZDRmMmI0OGM4OWY4YWZjIiwiaWF0IjoxNjc3MzM3NDc4fQ.imlAWE5qWCO5S79hQCDa9wYjM7F_MyyIS7K3jifyNC4",
          },
    };

    const res = await axios(config);
    res && res.data.rows.map((it)=>{
      let cid= `https://gateway.pinata.cloud/ipfs/${it.ipfs_pin_hash}`
      allCIDS.push(cid)
      // console.log(cid)
    })
    // console.log(res.data);
  };

  useEffect(() => {
    loadBlockchainData();
    retrieveFiles();
  }, []);

  const togglePop = (painting) => {
    setPainting(painting);
    toggle ? setToggle(false) : setToggle(true);
  };

  const togglePop1 = () => {
    toggle1 ? setToggle1(false) : setToggle1(true);
  };

  return (
    <div>
      <Topbar account={account} setAccount={setAccount} />
      <Banner />

      <div className="cards__section">
        <h3>Paintings For You</h3>
        <button className="painting__buy" onClick={togglePop1}>
          Upload Painting
        </button>
        <hr />

        <div className="cards">
          {paintings.map((painting, index) => (
            <div
              className="card"
              key={index}
              onClick={() => togglePop(painting)}
            >
              <div className="card__image">
                <img src={painting.paintingImage} alt="painting" />
              </div>
              <div className="card__info">
                <h4>{painting.paintingPrice} ETH</h4>
                <p>
                  <strong>{painting.paintingName}</strong>
                  
                </p>
                <p>{painting.paintingDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Component for buy and sell the NFT */}
      {toggle && (
        <Home
          painting={painting}
          provider={provider}
          account={account}
          escrow={escrow}
          togglePop={togglePop}
        />
      )}

    {/* Component for uploading the metadata of painting on Pinata */}
    {toggle1 && (
            <UploadPainting 
            painting={painting}
            provider={provider}
            account={account}
            escrow={escrow}
            togglePop1={togglePop1}/>
          )}

           
    </div>
  );
}

export default App;
