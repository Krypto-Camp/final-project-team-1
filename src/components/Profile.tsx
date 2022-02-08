import { useEffect, useState } from "react";
import { useProvider, useContractRead, useContractWrite } from "wagmi";
import { useAccount } from "wagmi";
import { RentModal } from "../components/Modal";
import { OPENSEADOMAIN } from "../constants";
import { market_contract } from "../config/contract";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  const provider = useProvider();
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  const [nftList, setNftList] = useState([]);
  const [curretSelect, setCurretSelect] = useState<NFTObject>();
  const [type, setType] = useState("0");
  const [modalIsOpen, setIsOpen] = useState(false);

  //取的用戶在opensea的所有NFT
  const fetchMyNFT = () => {
    fetch(`${OPENSEADOMAIN.TEST}/assets?owner=${accountData?.address}&limit=50`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setNftList(myJson.assets);
        console.log(myJson.assets);
      });
  };

  //取得所有NFT
  const [{ data: item, error: errormarket }, fetchMarketItems] =
    useContractRead(
      {
        addressOrName: market_contract.address,
        contractInterface: market_contract.abi,
        signerOrProvider: provider,
      },
      "fetchMarketItems"
    );

  console.log("item", item);

  //取得所有個人頁：租賃中商品
  const [{ data: myRentingItem }, fetchMyRentingItems] = useContractRead(
    {
      addressOrName: market_contract.address,
      contractInterface: market_contract.abi,
      signerOrProvider: provider,
    },
    "fetchMyRentingItems"
  );

  useEffect(() => {
    if (accountData?.address)
      switch (type) {
        case "0":
          fetchMyNFT();
          break;
        case "1":
          fetchMarketItems();
          //TODO:接item
          setNftList([]);
          break;
        case "2":
          fetchMyRentingItems();
          //TODO:接myRentingItem
          setNftList([]);
          break;
      }
  }, [accountData?.address, type]);

  const switchTab = (e: string) => {
    setType(e);
    navigate(`/profile?type=${e}`);
  };

  const OnSelectNFT = (x: NFTObject) => {
    setCurretSelect(x);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="container-profile">
      {/* 出租彈窗 */}
      <RentModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      {/* 切換tabs */}
      <div className="type-tap-container">
        <h4
          onClick={() => switchTab("0")}
          className={type == "0" ? "focus" : ""}
        >
          擁有的
        </h4>
        <h4
          onClick={() => switchTab("1")}
          className={type == "1" ? "focus" : ""}
        >
          出租中
        </h4>
        <h4
          onClick={() => switchTab("2")}
          className={type == "2" ? "focus" : ""}
        >
          租賃中
        </h4>
      </div>
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
