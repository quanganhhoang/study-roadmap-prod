import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';

import RoadmapList from "./RoadmapList";

class RoadmapListView extends Component {
	state = {
		roadmaps: []
	};

	fetchRoadmapList = () => {
		axios.get("http://localhost:8000/api/roadmaps/").then(res => {
			this.setState({
			    roadmaps: res.data.results
            });
		});
	}

	componentDidMount() {
		this.fetchRoadmapList();
	}

	componentWillReceiveProps(newProps) {
        console.log('RoadmapListView NewProps', newProps)
		if (newProps.token) {
			this.fetchRoadmapList();      
		}
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

export default connect(mapStateToProps)(RoadmapListView);