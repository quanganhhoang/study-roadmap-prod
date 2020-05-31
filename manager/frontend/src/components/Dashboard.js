import React, { Component } from 'react'
import { Row, Col, Card, Avatar } from 'antd';
import axios from 'axios'
import { connect } from 'react-redux';

import RoadmapCard from './RoadmapCard';
import DisciplineCard from './DisciplineCard';

class Dashboard extends Component {
    state = {
        user_id: 1,
        userExistingRoadmaps: [],
        existingDisciplines: [],
        highestRatedRoadmaps: [],
        mostPopularRoadmaps: [],
    };
    
    fetchUserExistingRoadmaps = () => {
        const url = "http://localhost:8000/api/users/" + this.state.user_id + "/roadmaps/"
        axios.get(url).then(res => {
			this.setState({
			    userExistingRoadmaps: res.data.results
            });
		});
    }

    fetchExistingDisciplines = () => {
        axios.get("http://localhost:8000/api/disciplines/" + this.state.user_id).then(res => {
			this.setState({
			    existingDisciplines: res.data.results
            });
		});
    }

    // TODO(qahoang)
    fetchHighestRatedRoadmaps = () => {
        const url = "http://localhost:8000/api/roadmaps/highest-rated/"
        console.log(url)
        axios.get(url).then(res => {
			this.setState({
			    highestRatedRoadmaps: res.data.results
            });
		});
    }

    // TODO(qahoang)
    fetchMostPopularRoadmaps = () => {
        axios.get("http://localhost:8000/api/roadmaps/most-popular/").then(res => {
			this.setState({
			    mostPopularRoadmaps: res.data.results
            });
		});
    }

	componentDidMount() {
        this.fetchUserExistingRoadmaps();
        this.fetchExistingDisciplines();
        this.fetchHighestRatedRoadmaps();
        this.fetchMostPopularRoadmaps();
	}

	// componentWillReceiveProps(newProps) {
	// 	if (newProps.token) {
	// 		this.fetchRoadmapList();      
	// 	}
    // }
    
    render() {
        let userRoadmaps = [];
        let numResults = Math.min(2, this.state.userExistingRoadmaps.length)
        for (let i = 0; i < numResults; i++) {
            let roadmap = this.state.userExistingRoadmaps[i]
            userRoadmaps.push(
                <Col span={12}>
                    <RoadmapCard 
                        title={roadmap.title}
                        author={roadmap.author}
                        content={roadmap.content}
                        thumbnail={roadmap.thumbnail}
                    />
                </Col>
            )
        }    
        
        return (
            <div className="container-fluid">
                <p>Welcome back, let's continue our studies?</p>
                <Row type="flex">
                    {userRoadmaps}
                </Row>
                <Row>
                    <p>Disciplines</p>
                </Row>
                <Row type="flex" gutter={32}>
                    <Col className="gutter-row" span={6}>
                        <DisciplineCard />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <DisciplineCard />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <DisciplineCard />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <DisciplineCard />
                    </Col>
                </Row>
                <Row>
                    <div>Recommended</div>
                    <div>
                        <Col span={12}>
                            <RoadmapCard />
                        </Col>
                        <Col span={12}>
                            <RoadmapCard />
                        </Col>
                    </div>
                </Row>

                <Row>
                    <div>Popular Roadmaps</div>
                    <div>
                        <Col span={12}>
                            <RoadmapCard />
                        </Col>
                        <Col span={12}>
                            <RoadmapCard />
                        </Col>
                    </div>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    };
  };

export default connect(mapStateToProps)(Dashboard)
