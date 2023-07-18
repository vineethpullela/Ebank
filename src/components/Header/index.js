import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-header">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <button className="logout-button" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
