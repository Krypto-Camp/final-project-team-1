import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Modal from "react-modal";
import { OPENSEADOMAIN } from "../constants";

export const Profile = () => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  const [nftList, setNftList] = useState([]);
  const [curretSelect, setCurretSelect] = useState<NFTObject>();
  const [type, setType] = useState("0");
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (accountData?.address)
      fetch(`${OPENSEADOMAIN.TEST}/assets?owner=${accountData?.address}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setNftList(myJson.assets);
          console.log(myJson.assets);
        });
  }, [accountData?.address]);

  const OnSelectNFT = (x: NFTObject) => {
    setCurretSelect(x);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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

  return (
    <div className="container-profile">
      {/* 出租彈窗 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
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
          <div className="button-wrapper">
            <button className="time-btn btn">1 day</button>
            <button className="time-btn btn">1 week</button>
            <button className="time-btn btn">1 month</button>
          </div>
          <div className="button-wrapper">
            <button onClick={() => setIsOpen(false)} className="cancel-btn btn">
              Cancel
            </button>
            <button className="comfirm-btn btn">Comfirm</button>
          </div>
        </div>
      </Modal>
      {/* 切換tabs */}
      <div className="type-tap-container">
        <h4 onClick={() => setType("0")} className={type == "0" ? "focus" : ""}>
          擁有的
        </h4>
        <h4 onClick={() => setType("1")} className={type == "1" ? "focus" : ""}>
          出租中
        </h4>
        <h4 onClick={() => setType("2")} className={type == "2" ? "focus" : ""}>
          租賃中
        </h4>
      </div>
      <div>My NFT</div>
      {/* NFT列表 */}
      <div className="card-wrapper">
        {nftList.map((x: any) => (
          <div key={x?.id} className="card-item" onClick={() => OnSelectNFT(x)}>
            <img src={x?.image_url} />
            <div className="card-desc">
              <div className="left-content">
                <h5 className="grey-text">{x?.name}</h5>
                <h5>
                  {x?.collection?.name} #{x?.token_id}
                </h5>
              </div>
              <div>
                <h5 className="grey-text">Price</h5>
                <h5>12.89</h5>
                <h5>Last 5.5</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
