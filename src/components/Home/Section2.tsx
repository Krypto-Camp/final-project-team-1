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
          <a href="https://www.notion.so/Rent-Rent-b5460a595b804921b48189dedba940e7" className="white-paper-link" target="_blank">白皮書連結</a>
        </div>
        <img src={tokenomic} alt="" className="tokenomic" />

        <div className="flex-as flex-jb">
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

        </div>
      </div>

    </div>
  )
}