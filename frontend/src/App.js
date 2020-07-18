import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import CustomLayout from './components/CustomLayout'
import BaseRouter from './routes'

import 'antd/dist/antd.css';

import './App.less';

class App extends Component {
	componentDidMount() {
		// this.props.onTryAutoSignup();
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


export default connect(mapStateToProps, null)(App);