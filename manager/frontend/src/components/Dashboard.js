import React, { Component } from 'react'
import { Row, Col, Card, Avatar } from 'antd';

import RoadmapCard from './RoadmapCard';

class Dashboard extends Component {
    state = {
        userExistingRoadmaps: [],
        existingDisciplines: [],
        recommendedRoadmaps: [],
        mostPopularRoadmaps: [],
    };
    
    fetchUserExistingRoadmaps = (user_id) => {
        axios.get("http://localhost:8000/api/roadmaps/" + user_id).then(res => {
			this.setState({
			    userExistingRoadmaps: res.data.results
            });
		});
    }

    fetchExistingDisciplines = () => {
        axios.get("http://localhost:8000/api/disciplines/" + user_id).then(res => {
			this.setState({
			    existingDisciplines: res.data.results
            });
		});
    }

    // TODO(qahoang)
    fetchRecommendedRoadmaps = () => {

    }

    // TODO(qahoang)
    fetchMostPopularRoadmaps = () => {

    }

    fetchRoadmapList = () => {
		axios.get("http://localhost:8000/api/roadmaps/").then(res => {
            console.log(`roadmaps fetch result: ${res.data.results}`)
			this.setState({
			    roadmaps: res.data.results
            });
		});
	}

	componentDidMount() {
        this.fetchUserExistingRoadmaps();
        this.fetchExistingDisciplines();
        this.fetchRecommendedRoadmaps();
        this.fetchMostPopularRoadmaps();
	}

	// componentWillReceiveProps(newProps) {
	// 	if (newProps.token) {
	// 		this.fetchRoadmapList();      
	// 	}
    // }
    
    render() {
        return (
            <div className="container-fluid">
                <p>Welcome back, let's continue our studies?</p>
                <Row type="flex">
                    <Col span={12}>
                        <RoadmapCard />
                    </Col>
                    <Col span={12}>
                        <RoadmapCard />
                    </Col>
                </Row>
            </div>
        )
  }
}

export default Dashboard
