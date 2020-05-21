import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from './store/actions/auth'

import NavBar from './components/NavBar'
import LandingPage from './components/LandingPage'
import Roadmap from './components/Roadmap'
import Footer from './components/Footer'
import Login from './components/Login'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
      <NavBar {...this.props} />
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/roadmap/:roadmapId/" component={Roadmap} />
          <Route exact path="/login" component={Login} />
        </div>
      </BrowserRouter>
      <Footer />
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);