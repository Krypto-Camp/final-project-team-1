import { useAccount } from 'wagmi'
import tokenomic from '../../assets/imgs/tokenomic.png'

export const Section2 = () => {
  const [{ data: accountData }] = useAccount();
  return (
    <div className="section2 flex-c wrap">
      <div className="content">
        <div className="section-title flex-ac">
          <div className="label">
            TOKENOMICS
          </div>
          <span>貨幣經濟</span>
          <a href="https://crystal-atlasaurus-78f.notion.site/Rent-Rent-b5460a595b804921b48189dedba940e7" className="white-paper-link" target="_blank">白皮書連結</a>
        </div>
        <img src={tokenomic} alt="" className="tokenomic" />

        <div className="flex-as flex-jb wrap">
          <div style={{ width: '50%' }}>
            <div className="content-title">
              收益來源：
            </div>
            <div className="content-desc">
              1. NFT 質押手續費<br />
              2. 交易手續費（租賃過程）
            </div>
          </div>
          <div style={{ width: '50%' }}>
            <div className="content-title">
              運用方式：
            </div>
            <div className="content-desc">
              50% 收益進入國庫、50% 收益進入項目基金會
            </div>
            <div className="content-desc">
              <strong>國庫</strong>：70% 資金儲備、30% 為鎖倉的緊急資金<br />
              <strong>項目基金會</strong>：40% 資金儲備、30% 提供項目方運用、30% 為鎖倉的緊急資金
            </div>
          </div>
          <div style={{ width: '100%',marginTop: '2rem' }}>
            <div className="content-title">
              資金運用：
            </div>
            <div className="content-desc">
            <strong>資金儲備</strong>：以 $ETH 作為支持平台代幣 $RENT 發行的資金儲備 ，確保平台代幣 $RENT 的價值，<br />
            <strong>緊急資金</strong>：當平台出現重大危機時，項目方經過多數而決議動用的資金。<br />
            <strong>項目方運用</strong>：由項目方自由運用的資金，其用途將會載明於財務報告中，透過適當管道公開發佈。
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}