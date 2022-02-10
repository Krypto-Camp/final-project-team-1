import { useEffect, useState } from "react";
import { useProvider, useContractRead, useContractWrite } from "wagmi";
import { useAccount } from "wagmi";
import { CreateModal } from "./CreateModal";
import { RentModal } from "./RentModal";
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
  const [type, setType] = useState("all");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //取的用戶在opensea的所有NFT
  const fetchMyNFT = () => {
    fetch(`${OPENSEADOMAIN.TEST}/assets?owner=${accountData?.address}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setNftList(myJson.assets);
        setLoading(false);
        console.log(myJson.assets);
      });
  };

  const [{}, getMarketItem] = useContractWrite(
    {
      addressOrName: market_contract.address,
      contractInterface: market_contract.abi,
      signerOrProvider: provider,
    },
    "getMarketItem"
  ) as any;

  const test = async () => {
    const result = await getMarketItem({
      args: [1],
    });
    console.log("getMarketItem", result);
  };

  //取得所有個人頁：租賃中商品
  const [{ data: myMarketItem }, fetchMyMarketItems] = useContractRead(
    {
      addressOrName: market_contract.address,
      contractInterface: market_contract.abi,
      signerOrProvider: provider,
    },
    "fetchMyMarketItems"
  ) as any;

  //取得所有個人頁：租賃中商品
  const [{ data: myRentingItem }, fetchMyRentingItems] = useContractRead(
    {
      addressOrName: market_contract.address,
      contractInterface: market_contract.abi,
      signerOrProvider: provider,
    },
    "fetchMyRentingItems"
  ) as any;

  //取得所有NFT
  const [{ data: marketItem }, fetchMarketItems] = useContractRead(
    {
      addressOrName: market_contract.address,
      contractInterface: market_contract.abi,
      signerOrProvider: provider,
    },
    "fetchMarketItems"
  ) as any;

  useEffect(() => {
    setNftList(marketItem);
    getRefinedData(marketItem);
  }, [marketItem]);

  //opensea api 為了拿NFT圖片URL
  //但同時打opensea api會報429錯誤，所以要setTimeout
  const getRefinedData = async (parseList: any) => {
    const doSomethingAsync = async (el: any) => {
      const tokenID = el.tokenId?.toString();
      const nftData = await fetch(
        `${OPENSEADOMAIN.TEST}/asset/${el.nftContract}/${tokenID}`
      ).then((x) => x.json());
      console.log("el", el);
      console.log("nftData", nftData);
      return {
        image_url: nftData?.image_preview_url,
        name: nftData?.asset_contract?.name,
        token_id: el?.token_id?.toString(),
        collection: nftData?.collection?.name,
        price: el?.price?.toString(),
        itemId: el?.itemId?.toString(),
        nftContract: el?.nftContract,
        rentStart: el?.rentStart?.toString(),
        rentEnd: el?.rentEnd?.toString(),
        validTime: el?.validTime?.toString(),
      };
    };
    const f = (x: any) =>
      new Promise((resolve) =>
        setTimeout(() => resolve(doSomethingAsync(x)), 1500)
      );
    let myData = [];
    for (let job of parseList.map((x: any) => () => f(x))) {
      const item = await job();
      myData.push(item);
    }
    setNftList(myData);
    setLoading(false);
  };

  useEffect(() => {
    // if (accountData?.address)
    switch (type) {
      case "myitems":
        fetchMyNFT();
        break;
      case "myMarketItems":
        // fetchMyMarketItems();
        //TODO:接myMarketItem, 先前端filter
        const myMarketItems = marketItem?.filter(
          (x: any) => x.lender == accountData?.address
        );
        getRefinedData(myMarketItems);
        break;
      case "myRentingItems":
        // fetchMyRentingItems();
        //TODO:接myRentingItem, 先前端filter
        const myRentingItems = marketItem?.filter(
          (x: any) => x.renter == accountData?.address
        );
        getRefinedData(myRentingItems);
        break;
      case "all":
        fetchMarketItems();
        // handleSetNftList(marketItem);
        getRefinedData(marketItem);
        break;
    }
  }, [accountData?.address, type]);

  const switchTab = (e: string) => {
    setLoading(true);
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

  const modal: any = {
    ["myitems"]: CreateModal,
    ["all"]: RentModal,
  };

  const Modal = modal[type];

  if (loading) return <div className="container-profile">Loading...</div>;

  return (
    <div className="container-profile">
      {/* 出租彈窗 */}
      {modalIsOpen && (
        <Modal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          curretSelect={curretSelect}
        />
      )}
      {/* 切換tabs */}
      <div className="type-tap-container">
        <h4
          onClick={() => switchTab("myitems")}
          className={type == "myitems" ? "focus" : ""}
        >
          擁有的
        </h4>
        <h4
          onClick={() => switchTab("myMarketItems")}
          className={type == "myMarketItems" ? "focus" : ""}
        >
          出租中
        </h4>
        <h4
          onClick={() => switchTab("myRentingItems")}
          className={type == "myRentingItems" ? "focus" : ""}
        >
          租賃中
        </h4>
        <h4
          onClick={() => switchTab("all")}
          className={type == "all" ? "focus" : ""}
        >
          平台NFT
        </h4>
      </div>
      {/* NFT列表 */}
      <div className="card-wrapper">
        {nftList ? (
          nftList.map((x: any) => (
            <div
              key={x?.id ? x?.id : x?.itemId}
              className="card-item"
              onClick={() => OnSelectNFT(x)}
            >
              <img key={x?.nftContract} src={x?.image_url} />
              <div className="card-desc">
                <div className="left-content">
                  <h5 className="grey-text">{x?.name}</h5>
                  <h5>
                    {x?.collection?.name
                      ? x?.collection?.name
                      : x?.collectionName}
                    #{x?.token_id}
                  </h5>
                </div>
                <div>
                  <i className="fa-brands fa-ethereum"></i>
                  <h5 className="grey-text">Price</h5>
                  {/* <h5 className="grey-text">{x?.price}</h5> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-hint">暫無資料</div>
        )}
      </div>
    </div>
  );
};
