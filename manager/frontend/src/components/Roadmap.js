import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Card } from "antd";
// import CustomForm from "./Form";


class Roadmap extends Component {
    state = {
        roadmap: {},
        milestones: [],
    };

    componentDidMount() {
        console.log(`Roadmap props: ${JSON.stringify(this.props)}`)
        const roadmapId = this.props.match.params.roadmapId;
        axios.get(`http://localhost:8000/api/roadmaps/${roadmapId}/`).then(res => {
            this.setState({
                roadmap: res.data
            });
        });

        axios.get(`http://localhost:8000/api/roadmaps/${roadmapId}/milestones/`)
            .then(res => {
                console.log(res)
                this.setState({
                    milestones: res.data
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
        axios.delete(`http://127.0.0.1:8000/api/roadmaps/${roadmapId}/delete/`)
        .then(res => {
            if (res.status === 204) {
            this.props.history.push(`/`);
            }
        })
    };

    fetchAuthor = (user_id) => {
        axios.get(`http://localhost:8000/api/users/${user_id}/`).then(res => {
                return res.data.firstname
            });
    }

  render() {
    const roadmap = this.state.roadmap;
    return (
        <div>
            <Card title={roadmap.title}>
                <p> {roadmap.author} </p>
                <p> {roadmap.description} </p>
            </Card>
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
