import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import close from '../assets/close.svg';

const Home = ({ painting, provider, account, escrow, togglePop }) => {
    const [hasBought, setHasBought] = useState(false)   //to handle the various conditional statements
    const [hasSold, setHasSold] = useState(false)

    const [buyer, setBuyer] = useState(null)
    const [seller, setSeller] = useState(null)

    const [owner, setOwner] = useState(null)

    const fetchDetails = async () => {
        // -- Buyer
        console.log(painting.id)
        const buyer = await escrow.buyer(painting.paintingId)   //fetch buyer address
        setBuyer(buyer)

        const hasBought = await escrow.approval(painting.paintingId, buyer)     //check if buyer has bought or not
        setHasBought(hasBought)

        // -- Seller

        const seller = await escrow.seller()    //seller address
        setSeller(seller)

        const hasSold = await escrow.approval(painting.paintingId, seller)  //check if seller has sold or not
        setHasSold(hasSold)

       
    }

    //Function to fetch the owner 
    const fetchOwner = async () => {
        if (await escrow.isListed(painting.paintingId)) return

        const owner = await escrow.buyer(painting.paintingId)
        setOwner(owner)
    }

    //Function - buyer deposits its money (e.g escrowAmount)
    const buyHandler = async () => {
        const escrowAmount = await escrow.escrowAmount(painting.paintingId)
        const signer = await provider.getSigner()

        // Buyer deposit earnest
        let transaction1 = await escrow.connect(signer).depositEarnest(painting.paintingId, { value: escrowAmount })
        await transaction1.wait()

        // Buyer approves...
        let transaction2 = await escrow.connect(signer).approveSale(painting.paintingId)
        await transaction2.wait()

        setHasBought(true)
    }
 
    // console.log(hasBought)
    //Final sell of NFT
    const sellHandler = async () => {
        const signer = await provider.getSigner()

        // Seller approves...
        let transaction = await escrow.connect(signer).approveSale(painting.paintingId)
        await transaction.wait()

        // Seller finalize...
        transaction = await escrow.connect(signer).SellPaintingNFT(painting.paintingId)
        await transaction.wait()

        setHasSold(true)
    }

    useEffect(() => {
        // console.log(painting)
        fetchDetails()
        fetchOwner()
    }, [hasSold])

    return (
        <div className="painting">
            <div className='painting__details'>
                <div className="painting__image">
                    <img src={painting.paintingImage} alt="painting" />
                </div>
                <div className="painting__overview">
                    <h1>{painting.paintingName}</h1>
                    
                    <p>{painting.paintingDescription}</p>

                    <h2>{painting.paintingPrice} ETH</h2>

                    {owner ? (
                        <div className='painting__owned'>
                            Owned by {owner.slice(0, 6) + '...' + owner.slice(38, 42)}
                        </div>
                    ) : (
                        <div>
                            {(account === seller) ? (
                                <button className='painting__buy' onClick={sellHandler} disabled={hasSold}>
                                    Approve & Sell
                                </button>
                            ) : (
                                <button className='painting__buy' onClick={buyHandler} disabled={hasBought}>
                                    Buy
                                </button>
                            )}
 
                        </div>
                    )}
 
                </div>


                <button onClick={togglePop} className="painting__close">
                    <img src={close} alt="Close" />
                </button>
            </div>
        </div >
    );
}

export default Home;