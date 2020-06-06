import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Row, Col, Button, Card, Avatar, Divider } from "antd";
// import CustomForm from "./Form";
const { Meta } = Card;

const BASE_URL = 'https://studyroadmap.herokuapp.com/'

class Roadmap extends Component {
    state = {
        roadmap: {},
        milestones: [],
    };

    componentDidMount() {
        console.log(`Roadmap props: ${JSON.stringify(this.props)}`)
        const roadmapId = this.props.match.params.roadmapId;
        axios.get(`${BASE_URL}api/roadmaps/${roadmapId}/`).then(res => {
            this.setState({
                roadmap: res.data
            });
        });

        axios.get(`${BASE_URL}api/roadmaps/${roadmapId}/milestones/`)
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
        axios.delete(`${BASE_URL}api/roadmaps/${roadmapId}/delete/`)
        .then(res => {
            if (res.status === 204) {
            this.props.history.push(`/`);
            }
        })
    };

    fetchAuthor = (user_id) => {
        axios.get(`${BASE_URL}api/users/${user_id}/`).then(res => {
                return res.data.firstname
            });
    }

  render() {
    const roadmap = this.state.roadmap;
    const milestoneDiv = [];

    this.state.milestones.forEach(item => {
        milestoneDiv.push(
            <li>
                <p>{item.title}</p>
                <p>{item.content}</p>
            </li>
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
                    <ol>
                        {milestoneDiv}
                    </ol>
                    
                    
	
                    <div class="timeline-item">
                        <h4>Hello, 'Im a single div responsive timeline without mediaQueries!</h4>
                        <p>
                            I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web by far... While that's mock-ups and this is politics, are they really so different? I think the only card she has is the Lorem card.
                        </p>
                    </div>

                    <div class="timeline-item">
                        <h3>Oeehhh, that's awesome.. Me too!</h3>
                        <p>
                            I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web by far... While that's mock-ups and this is politics, are they really so different? I think the only card she has is the Lorem card.
                        </p>
                    </div>

                    <div class="timeline-item">
                        <h3>I'm ::last-child so my border fades ^__^</h3>
                        <p>
                            I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web by far... While that's mock-ups and this is politics, are they really so different? I think the only card she has is the Lorem card.
                        </p>
                    </div>
                    <div class="timeline-item">
                        <h3>I'm ::last-child so my border fades ^__^</h3>
                        <p>
                            I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web by far... While that's mock-ups and this is politics, are they really so different? I think the only card she has is the Lorem card.
                        </p>
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
