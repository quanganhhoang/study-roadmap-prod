import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { authCheckState } from './store/actions/authActions'

import CustomLayout from './components/CustomLayout'
import BaseRouter from './routes'

import 'antd/dist/antd.css';

import './App.less';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<CustomLayout {...this.props}>
						<BaseRouter />
					</CustomLayout>
				</BrowserRouter>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);