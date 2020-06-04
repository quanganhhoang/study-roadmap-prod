import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';

import RoadmapList from "./RoadmapList";

class RoadmapListView extends Component {
	state = {
        roadmaps: [],  
    };

    fetchAuthorId = async (username) => {
        return axios.get(`http://localhost:8000/api/users/username/${username}/`)
    }

	fetchRoadmapList = (username) => {
        this.fetchAuthorId(username)
            .then(res => {
                axios.get(`http://localhost:8000/api/users/${res.data.id}/roadmaps/`).then(res => {
                    this.setState({
                        roadmaps: res.data.results
                    });
                });
            })
	}

	componentDidMount() {
        // console.log('store token:', this.props.token)
        // console.log('store username:', this.props.username)
        // console.log('store username:', localStorage.getItem('username'))
        this.fetchRoadmapList(localStorage.getItem('username'))
	}

	render() {
		return (
			<div>
				<RoadmapList data={this.state.roadmaps} /> <br />
				{/* <h2> Create an article </h2> */}
				{/* <CustomForm requestType="post" roadmapId={null} btnText="Create" /> */}
			</div>
		);
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        username: state.username,
    };
  };

export default connect(mapStateToProps, null)(RoadmapListView);