import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Row, Col, Button, Card, Avatar, Divider } from "antd";
// import CustomForm from "./Form";
const { Meta } = Card;

axios.defaults.baseURL = "https://studyroadmap.herokuapp.com/"
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem('token')}`,
};

class Roadmap extends Component {
    state = {
        roadmap: {},
        milestones: [],
    };

    componentDidMount() {
        const roadmapId = this.props.match.params.roadmapId;
        
        console.log(localStorage.getItem('token'))
        axios.get(`api/roadmaps/${roadmapId}/`).then(res => {
            console.log(res)
            this.setState({
                roadmap: res.data
            });
        });

        axios.get(`api/roadmaps/${roadmapId}/milestones/`)
            .then(res => {
                console.log(res)
                this.setState({
                    milestones: res.data.results
                })
            })
    }

    handleDelete = event => {
        event.preventDefault();
        const roadmapId = this.props.match.params.roadmapId;
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };
        axios.delete(`api/roadmaps/${roadmapId}/delete/`)
        .then(res => {
            if (res.status === 204) {
            this.props.history.push(`/`);
            }
        })
    };

    fetchAuthor = (user_id) => {
        axios.get(`api/users/${user_id}/`).then(res => {
                return res.data.firstname
            });
    }

  render() {
    const roadmap = this.state.roadmap;
    const milestoneDiv = [];

    this.state.milestones.forEach(item => {
        milestoneDiv.push(
            <div className="timeline-item" key={item.order_num}>
                <h4>{item.title}</h4>
                <p>
                    {item.content}
                </p>
            </div>
        )
    })

    return (
        <div>
            <Row type="flex">
                <Col span={16}>
                    <h1>{roadmap.title}</h1>
                    <p>{roadmap.author}</p>
                    <p>{roadmap.description}</p>
                    <Button>
                        Share
                    </Button>
                    <Button>
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
                            title="Author"
                            description="Author Credential"
                        />
                    </Card>
                </Col>
            </Row>
            <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
                
            </Divider>
            <Row gutter={32}>
                <Col span={16}>
                    <h2>Milestones</h2>
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
        token: state.token
    };
};

export default connect(mapStateToProps)(Roadmap);
