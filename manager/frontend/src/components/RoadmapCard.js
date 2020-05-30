import React from 'react'
import { Card, Row, Col } from 'antd';

const styles = {
    width: 'auto',
    margin: '5px 20px',
}

const RoadmapCard = props => {

    return (
        <Card style={ styles }>
            <Row type="flex">
                <Col span={18}>
                    <p clasName="roadmap-card-title">{props.title}</p>
                    <p className="roadmap-card-author">{props.author}</p>
                    <p>{props.content}</p>    
                </Col>
                <Col span={6}>
                    <div className="roadmap-card-thumbnail">
                        {props.thumbnail}
                    </div>
                </Col>
            </Row>
        </Card>
    )
    
}

export default RoadmapCard
