import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from './store/actions/auth'

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
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);