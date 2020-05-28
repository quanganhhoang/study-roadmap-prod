import React, { Component } from 'react'
import { Card, Row, Col } from 'antd';

class RoadmapCard extends Component {
    render() {
        return (
            <div className="container">
                <Card style={{ width: 300 }}>
                    <Row type="flex">
                        <Col span={18}>
                            <p clasName="roadmap-card-title">Roadmap Title</p>
                            <p className="roadmap-card-author">Author</p>
                            <p>Card content</p>    
                        </Col>
                        <Col span={6}>
                            <div className="roadmap-card-thumbnail">
                                display thumbnail here
                            </div>
                        </Col>
                    </Row>
                    
                </Card>
            </div>
        )
    }
}

export default RoadmapCard
