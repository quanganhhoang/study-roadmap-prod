import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';

import { Row, Col } from 'antd';

import DisciplineCard from './DisciplineCard';
import DashboardRoadmapList from './DashboardRoadmapList';

const NUM_DISCIPLINES_TO_SHOW = 4;

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
        axios.get("http://localhost:8000/api/disciplines/").then(res => {
            console.log(res)
			this.setState({
			    existingDisciplines: res.data.results
            });
		});
    }

    // TODO(qahoang)
    fetchHighestRatedRoadmaps = () => {
        const url = "http://localhost:8000/api/roadmaps/highest-rated/"
        axios.get(url).then(res => {
			this.setState({
			    highestRatedRoadmaps: res.data
            });
		});
    }

    // TODO(qahoang)
    fetchMostPopularRoadmaps = () => {
        const url = "http://localhost:8000/api/roadmaps/most-popular/"
        console.log(url)
        axios.get(url).then(res => {
            console.log(res)
			this.setState({
			    mostPopularRoadmaps: res.data
            });
            
            console.log(this.state.mostPopularRoadmaps)
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
        const disciplines = [];
        
        this.state.existingDisciplines.forEach(elem => {
            disciplines.push(
                <Col className="gutter-row" span={6}>
                    <DisciplineCard 
                        discipline={elem.discipline}
                        thumbnail={elem.thumbnail}
                    />
                </Col>
            )
        })

        return (
            <div className="container-fluid">
                <div>
                    <p>Welcome back, let's continue our studies?</p>
                </div>
                <div>
                    <DashboardRoadmapList
                        data={this.state.userExistingRoadmaps}
                    />
                </div>
                
                <div>
                    <p>Disciplines</p>
                </div>
                <Row gutter={16}>
                    {disciplines}
                </Row>
                
                <div>
                    <p>Highest Rated Roadmaps</p>
                </div>
                <div>
                    <DashboardRoadmapList
                        data={this.state.highestRatedRoadmaps}
                    />
                </div>
            
                <div>
                    <p>Popular Roadmaps</p>
                </div>
                <div>
                    <DashboardRoadmapList
                        data={this.state.mostPopularRoadmaps}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    };
  };

export default connect(mapStateToProps)(Dashboard)
