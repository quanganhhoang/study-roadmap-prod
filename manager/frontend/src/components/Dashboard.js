import React, { Component } from 'react'
import { Row, Col, Card, Avatar } from 'antd';

import RoadmapCard from './RoadmapCard';

class Dashboard extends Component {
    render() {
        return (
            <div className="container-fluid">
                <p>Welcome back, let's continue our studies?</p>
                <Row type="flex">
                    <Col span={12}>
                        <RoadmapCard />
                    </Col>
                    <Col span={12}>
                        <RoadmapCard />
                    </Col>
                </Row>
            </div>
        )
  }
}

export default Dashboard
