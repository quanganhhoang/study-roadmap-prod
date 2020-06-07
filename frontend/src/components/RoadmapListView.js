import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';

import { Button, Row } from 'antd';

import RoadmapList from "./RoadmapList";


class RoadmapListView extends Component {
	state = {
        roadmaps: [],  
    };

    fetchAuthorId = async (username) => {
        return axios.get(`api/users/username/${username}/`)
    }

	fetchCreatedRoadmapsByUser = (username) => {
        this.fetchAuthorId(username)
            .then(res => {
                axios.get(`api/users/${res.data.id}/roadmaps/`).then(res => {
                    this.setState({
                        roadmaps: res.data.results
                    });
                });
            })
    }

    fetchFollowedRoadmapsByUser = (username) => {
        
    }

	componentDidMount() {
        // console.log('store token:', this.props.token)
        // console.log('store username:', this.props.username)
        // console.log('store username:', localStorage.getItem('username'))
        this.fetchCreatedRoadmapsByUser(localStorage.getItem('username'))
	}

	render() {
		return (
			<div>
                <div>
                    <div>
                        <h2 style={{display: "inline-block", marginRight: "45px"}}>My Roadmaps</h2>
                        <Button
                            className="nav-btn" 
                            href="/roadmaps/create" 
                            type="primary"
                            style={{display: "inline-block", verticalAlign: "top"}}
                        >
                            Following
                        </Button>
                        <Button 
                            className="nav-btn" 
                            href="/roadmaps/create" 
                            type="primary"
                            style={{display: "inline-block", verticalAlign: "top"}}
                        >
                            Created
                        </Button>
                        <Button 
                            className="nav-btn" 
                            href="/roadmaps/create" 
                            type="primary"
                            style={{display: "inline-block", verticalAlign: "top"}}
                        >
                            Create a Roadmap
                        </Button>
                    </div>
   
                    <RoadmapList data={this.state.roadmaps} />    
                </div>
				
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