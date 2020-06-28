import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Divider } from 'antd';


class LandingPage extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Row>
                    <Col span={12}>
                        <Row type="flex">
                            <p id="slogan">Study plans for in-demand skills</p>
                        </Row>
                        <Row type="flex">
                            <p id="slogan-description">Polaris is a community-based platform that curates roadmaps for any skills/hobbies. Users start their learning journey from a search query and pay it forward by sharing their own.</p>
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
                            href="/dashboard"
                        >
                            View all roadmaps
                        </Button>
                        <p id="call-to-action">Join 1,000+ learners, working at companies such as:</p>
                        <div id="logo-section">
                            <img className="brand-logo" src={"/static/frontend/brand-logos/amazon.png"} alt="brand-logo"></img>
                            <img className="brand-logo" src={"/static/frontend/brand-logos/google.png"} alt="brand-logo"></img>
                            <img className="brand-logo" src={"/static/frontend/brand-logos/microsoft.png"} alt="brand-logo"></img>
                            <img className="brand-logo" src={"/static/frontend/brand-logos/facebook.png"} alt="brand-logo"></img>
                        </div>
                    </Col>
                </Row>
                <Divider></Divider>
                <div id="landingpage-values">
                    <Row>
                        <Col span={12}>
                            <Row type="flex">
                                <p className="value-proposition">Personalized</p>
                            </Row>
                            <Row type="flex">
                                <p className="value-description">Roadmaps are personalized based on user profile. Let us know what you are looking for, your current skillset and goals and we will optimize your search results.</p>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <img id="landing-pic-1" src={"/static/frontend/personalized.png"} alt="personalized"></img>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <img id="landing-pic-1" src={"/static/frontend/simple.png"} alt="simple"></img>
                        </Col>
                        <Col span={12}>
                            <Row type="flex">
                                <p className="value-proposition">Simple</p>
                            </Row>
                            <Row type="flex">
                                <p className="value-description">Start your learning journey from a search. Think of Polaris not as a book but an appendix. Our users contribute to our resource catalogs based on their learning journeys and we help spread the word!</p>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Row type="flex">
                                <p className="value-proposition">Effective</p>
                            </Row>
                            <Row type="flex">
                                <p className="value-description">Upvote a roadmap if you think it is effective. A <b>trusted</b>, <b>concise</b>, <b>simple</b> yet <b>effective</b> roadmap outperforms others. Polaris relies on our community to make the platform better over time.</p>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <img id="landing-pic-1" src={"/static/frontend/effective.png"} alt="effective"></img>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <img id="landing-pic-1" src={"/static/frontend/sharing.jpg"} alt="reinforced-learning"></img>
                        </Col>
                        <Col span={12}>
                            <Row type="flex">
                                <p className="value-proposition">Reinforced Learning</p>
                            </Row>
                            <Row type="flex">
                                <p className="value-description">We believe learning by teaching is the most effective way of mastering your craft. Distill your learning into simple steps and help pay it forward to others like you.</p>
                            </Row>
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
