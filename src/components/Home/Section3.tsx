import { useAccount } from 'wagmi'
import tokenomic from '../../assets/imgs/tokenomic.png'
import tz from '../../assets/imgs/avatar/tz.png'
import grace from '../../assets/imgs/avatar/grace.png'
import jill from '../../assets/imgs/avatar/jill.png'
import linda from '../../assets/imgs/avatar/linda.png'
import tim from '../../assets/imgs/avatar/tim.png'
import vincent from '../../assets/imgs/avatar/vincent.png'

const members = [
  {
    name: 'TZ 👱🏼‍♂️｜#C0011101',
    job: 'Team Leader<br />Project Manager<br />Lead Developer',
    avatar: tz,
  },
  {
    name: 'Grace 👱🏻‍♀️｜#C0011x01',
    job: 'Lead Smart Contract Developer',
    avatar: grace,
  },
  {
    name: 'Jill 👩🏻‍🦰｜#C0011102',
    job: 'Smart Contract Developer',
    avatar: jill,
  },
  {
    name: 'Linda 🙋🏻‍♀️｜#C0011103',
    job: 'Front-End Developer',
    avatar: linda,
  },
  {
    name: 'Vincent 🤦🏻‍♂️｜#C0011104',
    job: 'Smart Contract Developer<br />Whitepaper Writer',
    avatar: vincent,
  },
  {
    name: 'Tim 💆‍♂️｜#C0011105',
    job: 'Smart Contract Developer',
    avatar: tim,
  },
]
export const Section3 = () => {
  const [{ data: accountData }] = useAccount();
  return (
    <div className="section3 flex-ac flex-jb wrap">
      <div className="content">
        <div className="section-title">
          <div className="label">
            TEAM
          </div>
          <span>團隊成員</span>
        </div>
        <div className="flex-as flex-jb wrap">
          {
            members.map(member => (
              <div className="card flex-ac">
                <div className="card-avatar">
                  <img src={member.avatar} alt="" />
                </div>
                <div>
                  <div className="card-name">
                    {member.name}
                  </div>
                  <div className="card-content"
                    dangerouslySetInnerHTML={{ __html: member.job }}></div>
                </div>
              </div>
            ))
          }

        </div>
      </div>

    </div>
  )
}