import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import close from '../assets/close.svg';
 
//formData
const FormData = require("form-data");
 

const UploadPainting = ({
    paint,provider, account, escrow,togglePop1,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [file, setFile] = useState(null);   //store image
  const [painting, setPainting] = useState({
    paintingId : "",
    paintingName: "",
    paintingDescription: "",
    paintingImage: "",
    paintingPrice: "",
  });
   

  //unpin files (Pinata query)
    const delcheck = async (e) => {
      e.preventDefault();
      var config = {
        method: "delete",
        url: "https://api.pinata.cloud/pinning/unpin/Qmbqh5EFhaG2J27CWBehwAFFZCY4WemZDeCgu31vma14Xn",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDA5NDJmNS1kMzM3LTRiZTktYWZkMy1mZDViYjg5NjJkNjgiLCJlbWFpbCI6InZvZGFtZTk1NzNAd2lyb3V0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMTU0NjdmMzQ0ZmZiNzkwNzNiMWYiLCJzY29wZWRLZXlTZWNyZXQiOiIwMDMyNzg5Njk4Mzg1MjgxNGNiMDk3MDQ0ZDg5MjZmYWNiOTlhZGE4ZDcwZDdkMGNlYTczYjhhNjA2ZGE5OTg3IiwiaWF0IjoxNjc3MzIwMDMwfQ.hmwEHGKGzYiT4T6pHnMjnGn_tcr5Nx_6C-YkUa8Lm9Y",
        },
      };

      const res = await axios(config);

      console.log(res.data);
    };
   
  const retrieveFiles = async (e) => {
    e.preventDefault();
    var config = {
      method: "get",
      url: "https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100",
      headers: {
        Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDA5NDJmNS1kMzM3LTRiZTktYWZkMy1mZDViYjg5NjJkNjgiLCJlbWFpbCI6InZvZGFtZTk1NzNAd2lyb3V0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjg4YjZmNTZmMzVhZjA0ZDkyZWUiLCJzY29wZWRLZXlTZWNyZXQiOiJhMTNlNjdlNDhjZmU3MjdkNjNkYzI5NThhNjVhNzI3OWNjMWM4OWUwMjgwZmQ0NTUwZDRmMmI0OGM4OWY4YWZjIiwiaWF0IjoxNjc3MzM3NDc4fQ.imlAWE5qWCO5S79hQCDa9wYjM7F_MyyIS7K3jifyNC4",
    },
    };

    const res = await axios(config);

    console.log(res.data);
  };

  //Function to send meta data to Pinata (IPFS)
  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = JSON.stringify(painting);
    if (painting) {
    //   console.log(formData);
      try {

        //format mentioned in pinata documentation
        var config = {
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          headers: {
            "Content-Type": "application/json",
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDA5NDJmNS1kMzM3LTRiZTktYWZkMy1mZDViYjg5NjJkNjgiLCJlbWFpbCI6InZvZGFtZTk1NzNAd2lyb3V0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjg4YjZmNTZmMzVhZjA0ZDkyZWUiLCJzY29wZWRLZXlTZWNyZXQiOiJhMTNlNjdlNDhjZmU3MjdkNjNkYzI5NThhNjVhNzI3OWNjMWM4OWUwMjgwZmQ0NTUwZDRmMmI0OGM4OWY4YWZjIiwiaWF0IjoxNjc3MzM3NDc4fQ.imlAWE5qWCO5S79hQCDa9wYjM7F_MyyIS7K3jifyNC4",
        },
          data: formData,
        };

        const res = await axios(config);

        // console.log(res.data);
        const CID = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
        console.log(CID);

         
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Painting Uploaded");
  };

  //Function to first upload the image to IPFS 
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        console.log(file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDA5NDJmNS1kMzM3LTRiZTktYWZkMy1mZDViYjg5NjJkNjgiLCJlbWFpbCI6InZvZGFtZTk1NzNAd2lyb3V0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjg4YjZmNTZmMzVhZjA0ZDkyZWUiLCJzY29wZWRLZXlTZWNyZXQiOiJhMTNlNjdlNDhjZmU3MjdkNjNkYzI5NThhNjVhNzI3OWNjMWM4OWUwMjgwZmQ0NTUwZDRmMmI0OGM4OWY4YWZjIiwiaWF0IjoxNjc3MzM3NDc4fQ.imlAWE5qWCO5S79hQCDa9wYjM7F_MyyIS7K3jifyNC4",
        },
        });
        // console.log(resFile.data)
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
        //setting imageUrl in painting object after uploading on IPFS
        setPainting({ ...painting, paintingImage: ImgHash });
        // console.log(ImgHash)
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
  };

  // console.log(painting.paintingImage)
  const handleChange = async (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    // setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="painting">
      <div className="painting__details">
        {/* <div className="paintingContainer">
          <div className="paintingWrapper"> */}
            <form className="paintingRight">
              <div >
                <h1>Upload Painting</h1>

                <div>
                  <label for="">
                    <b>Image : </b>
                  </label>
                  <input
                    type="file"
                    required
                    className="paintingInput1"
                    name="paintingImage"
                    // value={painting.paintingName}
                    onChange={
                      (e) => handleChange(e)
                      // setPainting({...painting , paintingImage : e.target.files[0]})
                      // console.log(e.target.value)
                    }
                  /> <button
                  type="submit"
                  className="paintingButton1"
                  onClick={handleSubmit1}
                >
                  {" "}
                  Upload Image
                </button>

                </div>

                
                <div className="divinput">
                  <input
                    type="text"
                    required
                    className="paintingInput"
                    name="paintingName"
                    value={painting.paintingId}
                    onChange={
                      (e) =>
                        setPainting({
                          ...painting,
                          paintingId: e.target.value,
                        })
                      // console.log(e.target.value)
                    }
                  />
                  <label for="">ID</label>
                </div>
                <div className="divinput">
                  <input
                    type="text"
                    required
                    className="paintingInput"
                    name="paintingName"
                    value={painting.paintingName}
                    onChange={
                      (e) =>
                        setPainting({
                          ...painting,
                          paintingName: e.target.value,
                        })
                      // console.log(e.target.value)
                    }
                  />
                  <label for="">Title</label>
                </div>

                <div className="divinput">
                  <input
                    type="text"
                    required
                    className="paintingInput"
                    name="paintingDescription"
                    value={painting.paintingDescription}
                    onChange={
                      (e) =>
                        setPainting({
                          ...painting,
                          paintingDescription: e.target.value,
                        })
                      // console.log(e.target.value)
                    }
                  />
                  <label for="">Description</label>
                </div>

                <div className="divinput">
                  <input
                    type="text"
                    required
                    className="paintingInput"
                    name="paintingPrice"
                    value={painting.paintingPrice}
                    onChange={
                      (e) =>
                        setPainting({
                          ...painting,
                          paintingPrice: e.target.value,
                        })
                      // console.log(e.target.value)
                    }
                  />
                  <label for="">Price</label>
                </div>

                <button
                  type="submit"
                  className="paintingButton"
                  onClick={handleSubmit}
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <CircularProgress color="inherit" size="20px" />
                  ) : (
                    "Add Painting"
                  )}
                </button>
              </div>
            </form>
          {/* </div>
        </div> */}
        <button onClick={togglePop1} className="painting__close">
                    <img src={close} alt="Close" />
                </button>
      </div>
    </div>
  );
};

export default UploadPainting;
