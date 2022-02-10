import { useState } from "react";
import Modal from "react-modal";
import { useProvider, useContractWrite, useContractRead } from "wagmi";
import { market_contract } from "../config/contract";

export const RentModal = (props: any) => {
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

  const curretSelect = props.curretSelect;

  //取得所有NFT
  const [{ data }, getMarketItem] = useContractRead(
    {
      addressOrName: market_contract.address,
      contractInterface: market_contract.abi,
      signerOrProvider: provider,
    },
    "getMarketItem"
  );

  const [{}, rentMarketItem] = useContractWrite(
    {
      addressOrName: market_contract.address,
      contractInterface: market_contract.abi,
      signerOrProvider: provider,
    },
    "rentMarketItem"
  );

  const rent = async () => {
    const result = await rentMarketItem({
      args: [
        curretSelect?.nftContract, //nftContract
        curretSelect?.itemId, //itemId
      ],
      overrides: {
        gasLimit: 2030000,
        gasPrice: 60000000000,
        value: 1000,
      },
    });
    console.log("rentMarketItem", result);
    props.setIsOpen(false);
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
              {curretSelect?.collection} #{curretSelect?.token_id}
            </h5>
            <h5 className="grey-text" title={curretSelect?.nftContract}>
              {curretSelect?.nftContract}
            </h5>
          </div>
        </div>
        <div>
          <h5>from:{curretSelect.rentStart}</h5>
          <h5>to:{curretSelect.rentEnd}</h5>
        </div>

        <div className="button-wrapper">
          <button
            onClick={() => props.setIsOpen(false)}
            className="cancel-btn btn"
          >
            Cancel
          </button>
          <button onClick={rent} className="comfirm-btn btn">
            Comfirm
          </button>
        </div>
      </div>
    </Modal>
  );
};
