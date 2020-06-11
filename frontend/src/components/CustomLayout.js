import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Layout, Menu, Button, Input } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import { FacebookOutlined, GoogleOutlined, TwitterOutlined } from '@ant-design/icons';

import * as actions from '../store/actions/authActions';

const { Header, Footer, Content } = Layout;
const { Search } = Input;


class CustomLayout extends Component {
    render() {
        return (
            <div>
                <Layout className="layout">
                    <Header className="navbar">
                        <Row justify="space-between" type="flex">
                            <Col span={6} className="navbar-brand">
                                <Link to={this.props.isAuthenticated ? "/dashboard" : "/"}>
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
                                        <Button 
                                            className="nav-btn" 
                                            href="/roadmaps"
                                        >
                                                My Roadmaps
                                        </Button>
                                        <Button 
                                            className="nav-btn" 
                                            href="/"
                                            onClick={this.props.logout} 
                                            type="primary"
                                        >
                                                Logout
                                        </Button>
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
                    <Content className="site" style={{ overflow: 'initial', padding: '0 50px' }}>
                        <div className="site-content" style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer>
                        <div className="container-fluid">
                            <Row>
                                <Col span={9}>
                                    <img id="footer-logo" src={"/static/frontend/logo-footer.svg"} alt="logo"></img>
                                    <p>A social platform for you to start a new hobby.</p>
                                    <div>
                                        <GoogleOutlined className="footer-social-media-btn"/>
                                        <FacebookOutlined className="footer-social-media-btn"/>
                                        <TwitterOutlined className="footer-social-media-btn"/>
                                    </div>
                                </Col>
                                <Col span={5}>
                                    <h5 className="title mb-3">Home</h5>
                                    <ul>
                                        <li><a href="#!">Link 1</a></li>
                                        <li><a href="#!">Link 2</a></li>
                                        <li><a href="#!">Link 3</a></li>
                                        <li><a href="#!">Link 4</a></li>
                                    </ul>
                                </Col>
                                <Col span={5}>
                                    <h5 className="title mb-3">About</h5>
                                    <ul>
                                        <li><a href="#!">Link 1</a></li>
                                        <li><a href="#!">Link 2</a></li>
                                        <li><a href="#!">Link 3</a></li>
                                        <li><a href="#!">Link 4</a></li>
                                    </ul>
                                </Col>
                                <Col span={5}>
                                    <h5 className="title mb-3">About Us</h5>
                                    <ul>
                                        <li><a href="#!">Link 1</a></li>
                                        <li><a href="#!">Link 2</a></li>
                                        <li><a href="#!">Link 3</a></li>
                                        <li><a href="#!">Link 4</a></li>
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                            
                        <div className="footer-copyright">
                            © 2020 Copyright: <a href="#"> Polaris.com </a>
                        </div>
                            
                    </Footer>
                </Layout>	
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));