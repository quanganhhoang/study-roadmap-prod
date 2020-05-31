import React, { Component } from "react";
import axios from "axios";

import RoadmapList from "./RoadmapList";

class RoadmapListView extends Component {
	state = {
		roadmaps: []
	};

	fetchRoadmapList = () => {
		axios.get("http://localhost:8000/api/roadmaps/").then(res => {
            console.log(`roadmaps fetch result: ${res.data.results}`)
			this.setState({
			    roadmaps: res.data.results
            });
		});
	}

	componentDidMount() {
		this.fetchRoadmapList();
	}

	componentWillReceiveProps(newProps) {
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

export default RoadmapListView;