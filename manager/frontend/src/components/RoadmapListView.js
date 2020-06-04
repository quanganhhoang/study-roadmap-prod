import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';

import RoadmapList from "./RoadmapList";

class RoadmapListView extends Component {
	state = {
        roadmaps: [],
        user_id: null,  
    };

    fetchAuthorId = (username) => {
        axios.get(`http://localhost:8000/api/users/username/${username}/`)
            .then(res => {
                this.setState({
                    user_id: res.data.id
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

	fetchRoadmapList = () => {
		axios.get(`http://localhost:8000/api/users/${this.state.user_id}/roadmaps/`).then(res => {
			this.setState({
			    roadmaps: res.data.results
            });
		});
	}

	componentDidMount() {
		
	}

	componentWillReceiveProps(newProps) {
        console.log('RoadmapListView NewProps', newProps)
        if (newProps.username) {
            const username = newProps.username
            this.setState({
                username: username
            })
            this.fetchAuthorId(username)
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