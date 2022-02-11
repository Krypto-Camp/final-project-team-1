import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useProvider, useContractWrite, useContract, useSigner } from "wagmi";
import { market_contract, ERC721_contract, rentrent_token } from "../config/contract";
import { ethers } from 'ethers'
import Swal from 'sweetalert2'

import 'sweetalert2/src/sweetalert2.scss';
import '@sweetalert2/theme-dark/dark.css';





export const CreateModal = (props: any) => {
  const seconds = {
    ADAY: "86400",
    AWEEK: "604800",
    AMONTH: "2419200",
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "transparent",
      border: "none",
    },
  };

  const provider = useProvider();
  const [{ data: signer }] = useSigner();
  const curretSelect = props.curretSelect;
  const [validTime, setValidTime] = useState(seconds.ADAY);
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");

  const [{}, createMarketItem] = useContractWrite(
    {
      addressOrName: market_contract.address,
      contractInterface: market_contract.abi,
      signerOrProvider: provider,
    },
    "createMarketItem"
  );

  const nftContract = useContract({
    addressOrName: curretSelect?.asset_contract?.address,
    contractInterface: ERC721_contract.abi,
    signerOrProvider: signer,
  });

  const create = async () => {
    props.setIsWait(true)
    let approveTransaction = await nftContract.approve(
      market_contract.address,
      Number(curretSelect?.token_id)
    );
    await approveTransaction.wait();

    let ethprice = ethers.utils.parseEther(price)
    let ethdeposit = ethers.utils.parseEther(deposit)
    console.log(ethprice, ethdeposit, 'ethttertee')
    // return 

    const result = await createMarketItem({
      args: [
        curretSelect?.asset_contract?.address, //nftContract
        curretSelect?.token_id, //tokenId
        ethprice, //租金
        ethdeposit, //押金
        validTime, //秒, validTime
      ],
      overrides: {
        gasLimit: 2030000,
        gasPrice: 60000000000,
      },
    });

    console.log("createresult", result);
    console.log(
      `input price:${price},deposit:${deposit},validTime:${validTime}`
    );
    props.setIsWait(false);
    props.setIsOpen(false);
    Swal.fire(
      '恭喜!',
      '獲得 100 RentRent Token 獎勵',
      'success'
    )
  };

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="modal-container" style={{ width: "300px" }}>
        <img src={curretSelect?.image_url} />
        <div className="modal-desc">
          <div>
            <h5 className="grey-text">{curretSelect?.name}</h5>
            <h5>
              {curretSelect?.collection?.name} #{curretSelect?.token_id}
            </h5>
            <h5
              className="grey-text"
              title={curretSelect?.asset_contract?.address}
            >
              {curretSelect?.asset_contract?.address}
            </h5>
          </div>
        </div>

        <div className="input-wrapper">
          <h5>租金(eth)：</h5>
          <input type="number" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="input-wrapper">
          <h5>押金(eth)：</h5>
          <input type="number" onChange={(e) => setDeposit(e.target.value)} />
        </div>

        <div className="button-wrapper">
          <button
            className="time-btn btn"
            onClick={() => setValidTime(seconds.ADAY)}
            style={
              validTime === seconds.ADAY ? { border: "1px solid orange" } : {}
            }
          >
            1 day
          </button>
          <button
            className="time-btn btn"
            onClick={() => setValidTime(seconds.AWEEK)}
            style={
              validTime === seconds.AWEEK ? { border: "1px solid orange" } : {}
            }
          >
            1 week
          </button>
          <button
            className="time-btn btn"
            onClick={() => setValidTime(seconds.AMONTH)}
            style={
              validTime === seconds.AMONTH ? { border: "1px solid orange" } : {}
            }
          >
            1 month
          </button>
        </div>
        <div className="button-wrapper">
          <button
            onClick={() => props.setIsOpen(false)}
            className="cancel-btn btn"
          >
            Cancel
          </button>
          <button onClick={create} className="comfirm-btn btn">
            Comfirm
          </button>
        </div>
      </div>
    </Modal>
  );
};
