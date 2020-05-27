import React, { Component } from 'react'
import { Row, Col, Card, Avatar } from 'antd';

const { Meta } = Card;

class LandingPage extends Component {
  render() {
    return (
        <div className="container">
            <Row>
                <Col span={12}>
                    <Row>
                        <p id="slogan-1">This is a slogan. This is a slogan. This is a slogan</p>
                    </Row>
                    <Row>
                        <p id="slogan1-description">Lorem ipsum dolor sit amet, hincvix. Purto dissentiesse tempor tincidunt. Cum utinam virtute qualisque ad. Duo maiorum antiopam voluptatum id.</p>
                    </Row>
                </Col>
                <Col span={12}>
                    <img id="landing-pic-1" src={"/static/frontend/landing-page-1.svg"} alt="todo"></img>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <img id="landing-pic-2" src={"/static/frontend/landing-page-2.svg"} alt="todo"></img>
                </Col>
                <Col span={12}>
                    <Row>
                        <p id="slogan-2">This is a slogan. This is a slogan</p>
                    </Row>
                    <Row>
                        <p id="slogan2-description">Lorem ipsum dolor sit amet, hincvix. Purto dissentiesse tempor tincidunt. Cum utinam virtute qualisque ad. Duo maiorum antiopam voluptatum id.</p>
                    </Row>
                </Col>
            </Row>
            <Row align="middle">
                <p id="slogan-3">This is a slogan. This is a slogan</p>
            </Row>
            <Row align="middle">
                <p id="slogan3-description">Lorem ipsum dolor sit amet, hincvix. Cum utinam virtute qualisque ad.</p>
            </Row>
            <Row>
                <Col span={12}>
                    <Row>
                        <p id="slogan-2">This is a slogan. This is a slogan</p>
                    </Row>
                    <Row>
                        <p id="slogan2-description">Lorem ipsum dolor sit amet, hincvix. Purto dissentiesse tempor tincidunt. Cum utinam virtute qualisque ad. Duo maiorum antiopam voluptatum id.</p>
                    </Row>
                </Col>
                <Col span={12}>
                    <img id="landing-pic-2" src={"/static/frontend/landing-page-2.svg"} alt="todo"></img>
                </Col>
            </Row>
            <Row>
                <p id="user-experience-landing-page">Trai Nghiem Tu Cac Ban Tre</p>
            </Row>
            <Row>
                <Col span={8}>
                    <Card
                        style={{ width: 300 }}
                        cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                        }
                    >
                        <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        style={{ width: 300 }}
                        cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                        }
                    >
                        <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        style={{ width: 300 }}
                        cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                        }
                    >
                        <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
  }
}

export default LandingPage
