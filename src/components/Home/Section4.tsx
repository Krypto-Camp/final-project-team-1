import { useAccount } from 'wagmi'
import tokenomic from '../../assets/imgs/tokenomic.png'

export const Section4 = () => {
  const [{ data: accountData }] = useAccount();
  return (
    <div className="section4 flex-ac flex-jb wrap">
      <div className="content">
        <div className="section-title">
          <div className="label">
            ROADMAP
          </div>
          <span>路線圖</span>
        </div>
        <div className="roadmap flex-ac flex-jb">
          <div className="roadmap-item">
            <div className="item-bar"></div>
            <div className="item-date">
              Jun.  2022
            </div>
            <div className="item-content">
              → 專案啟動<br />
              → 使用流程規劃<br />
              → 經濟模型規劃
            </div>
          </div>
          <div className="roadmap-item">
            <div className="item-bar"></div>
            <div className="item-date">
              Feb.  2022
            </div>
            <div className="item-content">
              → 前端介面開發<br />
              → 智能合約開發<br />
              → 專案部署至 Rikenby 測試
            </div>
          </div>
          <div className="roadmap-item">
            <div className="item-bar"></div>
            <div className="item-date">
              11  Feb.  2022
            </div>
            <div className="item-content">
              → 專案發表
            </div>
          </div>
          <div className="roadmap-item">
            <div className="item-bar"></div>
            <div className="item-date">
              Q2  2022
            </div>
            <div className="item-content">
              → Coming Soon ...
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}