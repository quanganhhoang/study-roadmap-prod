import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Layout, Menu, Button, Input } from 'antd';
import { Link, withRouter } from 'react-router-dom'

import * as actions from '../store/actions/auth';

const { Header, Footer, Content } = Layout;
const { Search } = Input;


class CustomLayout extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header className="navbar">
                    <Row justify="space-between">
                        <Col span={6} className="navbar-brand">
                            <Link to="/">
                                <img id="nav-logo" src={"/static/frontend/logo.svg"} alt="logo"></img>
                            </Link>
                        </Col>
                        <Col span={12}>
                            <Search
                                id="nav-searchbar"
                                placeholder="Search..."
                                onSearch={value => console.log(value)}
                            />
                        </Col>
                        <Col span={6}>
                            <Menu
                                className="user-auth-nav"
                                theme="light"
                                mode="horizontal"
                                // defaultSelectedKeys={['2']}
                                style={{ lineHeight: '64px' }}
                            >	
                                {    
                                this.props.isAuthenticated ?
                                <React.Fragment>
                                    <Button className="nav-btn">My Roadmaps</Button>
                                    <Button className="nav-btn" onClick={this.props.logout} type="primary">Logout</Button>
                                </React.Fragment>
                    
                                :
                                <React.Fragment>
                                    <Button className="nav-btn" href="/login" type="primary">Login</Button>
                                    <Button className="nav-btn" href="/signup" type="primary">Register</Button>
                                </React.Fragment>
                                }							
                            </Menu>
                        </Col>
                    </Row>   
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ bottom: "0", textAlign: 'center' }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="title mb-3">Footer Content</h5>
                                <p>Here you can use rows and columns here to organize your footer content.</p>
                            </div>
    
                            <div className="col-md-6">
                                <h5 className="title mb-3">Links</h5>
                                <ul>
                                    <li><a href="#!">Link 1</a></li>
                                    <li><a href="#!">Link 2</a></li>
                                    <li><a href="#!">Link 3</a></li>
                                    <li><a href="#!">Link 4</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                        
                    <div className="footer-copyright">
                        <div className="container-fluid">
                            © 2020 Copyright: <a href="#"> Polaris.com </a>
                        </div>
                    </div>
                        
                </Footer>
            </Layout>			
        )
    }
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout())
	}
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));