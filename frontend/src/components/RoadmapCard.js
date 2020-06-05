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
                    <p className="roadmap-card-title">{props.title}</p>
                    <p className="roadmap-card-author">{props.author}</p>
                    <p>{props.content}</p>    
                </Col>
                <Col span={6}>
                    <div className="roadmap-card-thumbnail">
                        <img src={props.thumbnail} width='40' height='40'></img>
                    </div>
                </Col>
            </Row>
        </Card>
    )
    
}

export default RoadmapCard
