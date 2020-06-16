import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Layout, Menu, Button, Input, Dropdown, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import { FacebookOutlined, GoogleOutlined, TwitterOutlined, UserOutlined } from '@ant-design/icons';

import * as authActions from '../store/actions/authActions';
import { searchRoadmaps } from '../store/actions/roadmapActions'

const { Header, Footer, Content } = Layout;
const { Search } = Input;


class CustomLayout extends Component {
    constructor(props) {
        super(props)
    }

    handleButtonClick = (e) => {
        message.info('Click on left button.');
        console.log('click left button', e);
    }
      
    handleMenuClick = (e) => {

        switch (e.key) {
            case 'MyRoadmap':
                this.props.history.push('/roadmaps');
                break;
            case 'AccountSettings':
                this.props.history.push("/profile");
                break;
            case 'CreateNewRoadmap':
                this.props.history.push('/roadmaps/create');
                break;
            case 'Help':
                this.props.history.push('/help');
                break;
            case 'Logout':
                this.props.logout();
                this.props.history.push('/')
                break;
            default:
        }
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="MyRoadmap" icon={<UserOutlined />}>
                    My Roadmaps
                </Menu.Item>
                <Menu.Item key="AccountSettings" icon={<UserOutlined />}>
                    Account Settings
                </Menu.Item>
                <Menu.Item key="CreateNewRoadmap" icon={<UserOutlined />}>
                    Create new roadmap
                </Menu.Item>
                <Menu.Item key="Help" icon={<UserOutlined />}>
                    Help
                </Menu.Item>
                <Menu.Item key="Logout" icon={<UserOutlined />}>
                    Logout
                </Menu.Item>
            </Menu>
        );

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
                                    onSearch={
                                        value => {
                                            this.props.searchRoadmaps(value)
                                            this.props.history.push('/search')
                                        }                                        
                                    }
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
                                        <Dropdown overlay={menu} placement='bottomCenter'>
                                            <Button
                                                className="nav-btn"
                                                type="primary"
                                            >
                                                Profile <UserOutlined />
                                            </Button>
                                        </Dropdown>
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
                                <Col span={8}>
                                    <img id="footer-logo" src={"/static/frontend/logo-footer.svg"} alt="logo"></img>
                                    <p>A social platform for you to start a new hobby.</p>
                                    <div>
                                        <GoogleOutlined className="footer-social-media-btn"/>
                                        <FacebookOutlined className="footer-social-media-btn"/>
                                        <TwitterOutlined className="footer-social-media-btn"/>
                                    </div>
                                </Col>
                                <Col span={4}>
                                    <h5 className="title mb-3">LEARN</h5>
                                    <ul className="footer-list">
                                        <li><a href="#!">Disciplines</a></li>
                                        <li><a href="#!">Blog</a></li>
                                        <li><a href="#!">For Teams</a></li>
                                        <li><a href="#!">Subscriptions</a></li>
                                    </ul>
                                </Col>
                                <Col span={4}>
                                    <h5 className="title mb-3">CONTRIBUTE</h5>
                                    <ul className="footer-list">
                                        <li><a href="#!">Become an Author</a></li>
                                        <li><a href="#!">Published Authors</a></li>
                                        <li><a href="#!">Become a Tutor</a></li>
                                        <li><a href="#!">Accredited Tutors</a></li>
                                    </ul>
                                </Col>
                                <Col span={4}>
                                    <h5 className="title mb-3">LEGAL</h5>
                                    <ul className="footer-list">
                                        <li><a href="#!">Privacy Policy</a></li>
                                        <li><a href="#!">Terms of Service</a></li>
                                    </ul>
                                </Col>
                                <Col span={4}>
                                    <h5 className="title mb-3">MORE</h5>
                                    <ul className="footer-list">
                                        <li><a href="#!">Team</a></li>
                                        <li><a href="#!">Careers</a></li>
                                        <li><a href="#!">FAQ</a></li>
                                        <li><a href="#!">Contact Us</a></li>
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
        logout: () => dispatch(authActions.logout()),
        searchRoadmaps: (value) => dispatch(searchRoadmaps(value)),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));