import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'antd';


class LandingPage extends Component {
  render() {
    return (
        <div className="container-fluid">
            <Row>
                <Col span={12}>
                    <Row type="flex">
                        <p id="slogan-1">Study plans for in-demand skills</p>
                    </Row>
                    <Row type="flex">
                        <p id="slogan1-description">Polaris is a platform that aims to give you a clear and personalized path to learning new skills.</p>
                    </Row>
                </Col>
                <Col span={12}>
                    <img id="landing-pic-1" src={"/static/frontend/landing-page-1.svg"} alt="todo"></img>
                </Col>
            </Row>

            <Row align="middle">
                <Col span={12} offset={6} align="middle">
                    <Button
                        id="view-roadmaps-btn"
                        href="/roadmaps"
                    >
                        View all roadmaps
                    </Button>
                    <p id="slogan-3">Join 1,000+ learners, working at companies such as:</p>
                    <div>
                        INSERT COMPANY LOGOS HERE
                    </div>
                </Col>
            </Row>

            <div id="landingpage-values">
                <Row>
                    <Col span={12}>
                        <Row type="flex">
                            <p id="value-proposition">Personalized</p>
                        </Row>
                        <Row type="flex">
                            <p id="value-description">Polaris is a platform that aims to give you a clear and personalized path to learning new skills.</p>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <img id="landing-pic-1" src={"/static/frontend/landing-page-1.svg"} alt="todo"></img>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <img id="landing-pic-1" src={"/static/frontend/landing-page-1.svg"} alt="todo"></img>
                    </Col>
                    <Col span={12}>
                        <Row type="flex">
                            <p id="value-proposition">Simple</p>
                        </Row>
                        <Row type="flex">
                            <p id="value-description">Polaris is a platform that aims to give you a clear and personalized path to learning new skills.</p>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Row type="flex">
                            <p id="value-proposition">Effective</p>
                        </Row>
                        <Row type="flex">
                            <p id="value-description">Polaris is a platform that aims to give you a clear and personalized path to learning new skills.</p>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <img id="landing-pic-1" src={"/static/frontend/landing-page-1.svg"} alt="todo"></img>
                    </Col>
                </Row>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }    
}

export default connect(mapStateToProps)(LandingPage)
