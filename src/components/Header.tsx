import * as React from 'react'
import { useAccount } from 'wagmi'
import { Link } from "react-router-dom";
import { Connect } from '../components'
import logo from '../assets/imgs/logo_w.png'

export const Header = () => {
  const [{ data: accountData }, disconnect] = useAccount();
  return (
    <div className="header">
      <Link className="logo" to="/">
        <img src={logo} alt="" />
      </Link>
      <div className="right">
        {
          !accountData?.address ?
            <Connect /> : <div className="flex-ac">
              <Link className="user-page-link" to="/profile?type=myitems">
                <i className="fas fa-user-circle icon-font"></i>
                個人中心 Hello，{accountData?.address}
              </Link>
              <div className="connect-btn" onClick={() => disconnect()}>
                登出
              </div>
            </div>
        }

      </div>
    </div>
  )
}