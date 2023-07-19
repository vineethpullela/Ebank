import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {userId: '', userPin: '', showSubmitError: false, errorMsg: ''}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangeUserPin = event => {
    this.setState({userPin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({showSubmitError: false})
    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitToLogin = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state
    const userDetails = {user_id: userId, pin: userPin}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data.jwt_token)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  render() {
    const {userId, userPin, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <div className="login-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-page-logo"
            />
          </div>
          <form className="form-container" onSubmit={this.submitToLogin}>
            <h1 className="form-heading">Welcome Back!</h1>
            <div className="input-container">
              <label htmlFor="userId" className="label">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="input"
                value={userId}
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-container">
              <label htmlFor="userPin" className="label">
                PIN
              </label>
              <input
                type="password"
                id="userPin"
                className="input"
                value={userPin}
                placeholder="Enter PIN"
                onChange={this.onChangeUserPin}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
