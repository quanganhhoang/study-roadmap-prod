import React, { Component } from "react";
import { connect } from 'react-redux';

import { Button } from 'antd';

import RoadmapList from "../components/RoadmapList";


class MyRoadmap extends Component {
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
   
                    <RoadmapList data={this.props.userCreatedRoadmaps} />    
                </div>
				
				{/* <h2> Create an article </h2> */}
				{/* <CustomForm requestType="post" roadmapId={null} btnText="Create" /> */}
			</div>
		);
    }
}

const mapStateToProps = state => {
    return {
        userCreatedRoadmaps: state.roadmap.roadmapsByUser
    };
};


export default connect(mapStateToProps)(MyRoadmap);