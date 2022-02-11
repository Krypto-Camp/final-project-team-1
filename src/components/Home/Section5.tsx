import { useAccount } from 'wagmi'
import discord from '../../assets/imgs/discord.png'

export const Section5 = () => {
  const [{ data: accountData }] = useAccount();
  return (
    <div className="section5 flex-ac flex-jb wrap">
      <div className="content">
        <div className="section-title">
          <div className="label">
            限時活動
          </div>
          <span><a href="https://discord.gg/JyqF59MF" target="_blank" className="discord-link">
            進 Discord 私密群組<img src={discord} alt="" />
          </a></span>
        </div>
        <div className="enter-desc">
          租借 Rent Rent 平台上的NFT，然後進入 Discord 群 Verify<br />
          可以進到我們的私密群組🙈
        </div>

        <div className="enter-container">
          <iframe src="https://www.youtube.com/embed/_41tFu5SeTk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>

    </div>
  )
}