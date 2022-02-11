import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import nft1 from "../../assets/imgs/nft1.jpeg";
import nft2 from "../../assets/imgs/nft2.jpeg";
import nft3 from "../../assets/imgs/nft3.jpeg";

export const Section1 = () => {
  const [{ data: accountData }] = useAccount();
  const navigate = useNavigate();
  return (
    <div className="section1 flex-c wrap">
      <div className="section1-title">
        <span>Rent Rent</span> - The Best NFT Renting Platform
        <div className="rocket">🚀</div>
      </div>
      <div className="section1-subtitle">
        安全、便捷，去中心化，為 NFT 資產創造更多價值的自由租賃平台。
        <br />
        KryptoCamp Team1 Demo
      </div>
      <img src={nft1} alt="" className="nft-img1" />
      <img src={nft2} alt="" className="nft-img2" />
      <img src={nft3} alt="" className="nft-img3" />
      {accountData?.address ? (
        <div className="section1-btns flex-ac flex-ja">
          <div
            className="btn-primary"
            onClick={() => navigate(`/profile?type=myitems`)}
          >
            Loan To Earn
          </div>
          <div
            className="btn-default"
            onClick={() => navigate(`/profile?type=all`)}
          >
            Borrow NFT
          </div>
        </div>
      ) : (
        <div className="section1-btns flex-ac flex-ja">
          <div className="connect-hint">請先連結錢包</div>
        </div>
      )}
    </div>
  );
};
