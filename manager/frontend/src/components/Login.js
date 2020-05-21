import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <div class="fadeIn first">
            <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
          </div>

          <form>
            <input type="text" id="login" class="fadeIn second" name="login" placeholder="login"></input>
            <input type="text" id="password" class="fadeIn third" name="login" placeholder="password"></input>
            <input type="submit" class="fadeIn fourth" value="Log In"></input>
          </form>

          <div id="formFooter">
            <a class="underlineHover" href="#">Forgot Password?</a>
          </div>

        </div>
      </div>
    )
  }
}

export default Login
