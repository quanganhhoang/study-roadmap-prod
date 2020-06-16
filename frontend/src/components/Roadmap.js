import React, { Component } from "react";

import { connect } from "react-redux";
import { Row, Col, Button, Card, Avatar, Divider } from "antd";

// import CustomForm from "./Form";
const { Meta } = Card;

import api from '../api'

class Roadmap extends Component {
    state = {
        roadmap: {},
        milestones: [],
        author: {},
        authorProfile: {},
    };

    componentDidMount() {
        const roadmapId = this.props.match.params.roadmapId;
        const token = this.props.token;
        console.log('token', token)
        api.get(`api/roadmaps/${roadmapId}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {    
            this.fetchAuthor(res.data.id)
            this.setState({
                roadmap: res.data
            });
        });

        api.get(`api/roadmaps/${roadmapId}/milestones`,{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {        
            this.setState({
                milestones: res.data.results
            })
        })
    }

    // handleDelete = event => {
    //     event.preventDefault();
    //     const roadmapId = this.props.match.params.roadmapId;
  
    //     api.delete(`api/roadmaps/${roadmapId}/delete/`)
    //     .then(res => {
    //         if (res.status === 204) {
    //         this.props.history.push(`/`);
    //         }
    //     })
    // };

    fetchAuthor = (user_id) => {
        api.get(`api/users/${user_id}`, {
            headers: {
                Authorization: `Token ${this.props.token}`
            }
        })
        .then(res => {
            this.setState({
                author: res.data
            })
        });
    }

  render() {
    const roadmap = this.state.roadmap;
    const milestoneDiv = [];

    this.state.milestones.forEach(item => {
        milestoneDiv.push(
            <div className="timeline-item" key={item.order_num}>
                <h4 className="milestone-title">{item.title}</h4>
                <p className="milestone-content">
                    { item.content }
                </p>
            </div>
        )
    })

    const author = this.state.author.username;
    return (
        <div>
            <Row type="flex">
                <Col span={16}>
                    <h1 className="roadmap-title">{ roadmap.title }</h1>
                    <p className="roadmap-author">{ author }</p>
                    <p className="roadmap-description">
                        { roadmap.description }
                    </p>
                    <Button 
                        style={{marginRight: '10px'}}
                        // icon={<ShareAltOutlined />}
                    >
                        Share
                    </Button>
                    <Button
                        // icon={<SaveOutlined />}
                    >
                        Save
                    </Button>
                </Col>
                <Col span={8}>
                    <Card
                        style={{ width: 200 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={this.state.author.username}
                            description="Credential"
                        />
                    </Card>
                </Col>
            </Row>
            <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
                
            </Divider>
            <Row gutter={32}>
                <Col span={16}>
                    <h2 style={{marginBottom: '40px'}}>Milestones</h2>
                    <div>
                        {milestoneDiv}
                    </div>
                </Col>
                <Col span={8}>
                    <h2>Similar Roadmaps</h2>
                </Col>
            </Row>
     
            {/* <CustomForm
                {...this.props}
                token={this.props.token}
                requestType="put"
                articleID={this.props.match.params.roadmapID}
                btnText="Update"
            /> */}
            {/* <form onSubmit={this.handleDelete}>
                <Button type="danger" htmlType="submit">
                Delete
                </Button>
            </form> */}
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(Roadmap);
