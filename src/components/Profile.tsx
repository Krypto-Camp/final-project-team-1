import { useEffect, useState } from "react";
import { useProvider, useContractRead, useContractWrite } from "wagmi";
import { useAccount } from "wagmi";
import { CreateModal } from "./CreateModal";
import { RentModal } from "./RentModal";
import { OPENSEADOMAIN } from "../constants";
import { market_contract } from "../config/contract";
import { useNavigate, useLocation } from "react-router-dom";
import Image from 'react-image-webp';
import waiting from '../assets/imgs/waiting.webp'
import waitingDefault from '../assets/imgs/wait-default.png'
import { ethers } from 'ethers'

export const Profile = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const provider = useProvider();
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  const [nftList, setNftList] = useState([]);
  const [curretSelect, setCurretSelect] = useState<NFTObject>();
  const [type, setType] = useState("all");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsWait, setIsWait] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const [{ }, getMarketItem] = useContractWrite(
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
  // const [{ data: myMarketItem }, fetchMyMarketItems] = useContractRead(
  //   {
  //     addressOrName: market_contract.address,
  //     contractInterface: market_contract.abi,
  //     signerOrProvider: provider,
  //   },
  //   "fetchMyMarketItems"
  // ) as any;


  //取得所有個人頁：租賃中商品
  // const [{ data: myRentingItem }, fetchMyRentingItems] = useContractRead(
  //   {
  //     addressOrName: market_contract.address,
  //     contractInterface: market_contract.abi,
  //     signerOrProvider: provider,
  //   },
  //   "fetchMyRentingItems"
  // ) as any;

  //取得所有NFT
  const [{ data: marketItem }, fetchMarketItems] = useContractRead(
    {
      addressOrName: market_contract.address,
      contractInterface: market_contract.abi,
      signerOrProvider: provider,
    },
    "fetchMarketItems"
  ) as any;

  const [marketItemCount, setMarketItemCount] = useState(0)
  if (marketItem?.length > 0 && marketItemCount == 0) {
    setMarketItemCount(marketItem?.length || 0)
    console.log(marketItemCount, 'marketItemCount')
  }

  // useEffect(() => {
  //   setNftList(marketItem);
  //   getRefinedData(marketItem);
  // }, [marketItem]);

  //opensea api 為了拿NFT圖片URL
  //但同時打opensea api會報429錯誤，所以要setTimeout
  const getRefinedData = async (parseList: any) => {
    console.log(parseList, 'parseList')
    if (!parseList) {
      parseList = []
    }
    const doSomethingAsync = async (el: any) => {
      const tokenID = el.tokenId?.toString();
      const nftData = await fetch(
        `${OPENSEADOMAIN.TEST}/asset/${el.nftContract}/${tokenID}`
      ).then((x) => x.json());
      // console.log("el", el);
      console.log("nftData", nftData);
      return {
        image_url: nftData?.image_preview_url,
        name: nftData?.asset_contract?.name,
        token_id: el?.token_id?.toString(),
        collection: nftData?.collection?.name,
        price: el?.price,
        deposit: el?.deposit,
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
    for (let job of parseList?.map((x: any) => () => f(x))) {
      const item = await job();
      myData.push(item);
    }
    setNftList(myData);
    console.log('done!!!!!!!')
    setLoading(false);
  };

  useEffect(() => {
    // if (accountData?.address)
    setLoading(true)
    const query = new URLSearchParams(search);
    const paramField = query.get('type');
    setType(paramField || 'all')
    if (!accountData?.address) {
      return
    }

    console.log(marketItem, 'marketItem')

    switch (type) {
      case "myitems":
        fetchMyNFT();
        break;
      case "myMarketItems":
        fetchMarketItems();
        //TODO:接myMarketItem, 先前端filter
        const myMarketItems = marketItem?.filter(
          (x: any) => x.lender == accountData?.address
        );
        getRefinedData(myMarketItems);
        break;
      case "myRentingItems":
        fetchMarketItems();
        //TODO:接myRentingItem, 先前端filter
        const myRentingItems = marketItem?.filter(
          (x: any) => x.renter == accountData?.address
        );
        console.log(myRentingItems)
        getRefinedData(myRentingItems);
        break;
      case "all":
        fetchMarketItems();
        // handleSetNftList(marketItem);
        getRefinedData(marketItem);
        break;
    }
  }, [accountData?.address, type, marketItemCount]);

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

  if (loading) return <div className="confirm-loading flex-c">
    <div>
      <Image
        src={waitingDefault}
        webp={waiting}
      />
      wait loading data...
    </div>
  </div>

  return (
    <div className="container-profile">
      {/* 等待交易完成 */}
      {
        modalIsWait && <div className="confirm-loading flex-c">
          <div>
            <Image
              src={waitingDefault}
              webp={waiting}
            />
            wait transaction confirm...
          </div>
        </div>
      }
      {/* 出租彈窗 */}
      {modalIsOpen && (
        <Modal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          setIsWait={setIsWait}
          closeModal={closeModal}
          curretSelect={curretSelect}
          sender={accountData?.address}
        />
      )}
      {/* 切換tabs */}
      <div className="type-tap-container">
        <h4
          onClick={() => switchTab("all")}
          className={type == "all" ? "focus" : ""}
        >
          平台NFT
        </h4>
        <div className="border"></div>
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
        {/* <h4
          onClick={() => switchTab("myRentingItems")}
          className={type == "myRentingItems" ? "focus" : ""}
        >
          租賃中
        </h4> */}
      </div>
      {/* NFT列表 */}
      <div className="card-wrapper">
        {nftList?.length > 0 ? (
          nftList.map((x: any) => {
            console.log(x, 'xxxxxx')
            return (
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
                  {
                    !x?.price?.toString() ? '' : <div>
                      <i className="fa-brands fa-ethereum"></i>
                      <h5 className="grey-text">租金(ETH)</h5>
                      <h5 className="grey-text">{ethers.utils.formatEther(x?.price?.toString() || 0)}</h5>
                    </div>
                  }
                  {
                    (type == 'all' || type == 'myMarketItems') && (
                      !x?.deposit?.toString() ? '' : <div>
                      <i className="fa-brands fa-ethereum"></i>
                      <h5 className="grey-text">押金(ETH)</h5>
                      <h5 className="grey-text">{ethers.utils.formatEther(x?.deposit?.toString() || 0)}</h5>
                    </div>
                    )
                  }

                </div>
              </div>
            )
          })
        ) : (
          <div className="empty-hint">暫無資料</div>
        )}
      </div>
    </div>
  );
};
