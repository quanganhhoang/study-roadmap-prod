import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';

import { Row, Col } from 'antd';

import DisciplineCard from './DisciplineCard';
import DashboardRoadmapList from './DashboardRoadmapList';

const NUM_DISCIPLINES_TO_SHOW = 4;


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: null,
            userExistingRoadmaps: [],
            existingDisciplines: [],
            highestRatedRoadmaps: [],
            mostPopularRoadmaps: [],
        };
    }


    fetchAuthorId = async (username) => {
        return axios.get(`api/users/username/${username}/`)
    }

	fetchCreatedRoadmapsByUser = (username) => {
        this.fetchAuthorId(username)
            .then(res => {
                axios.get(`api/users/${res.data.id}/roadmaps/`).then(res => {
                    this.setState({
                        userExistingRoadmaps: res.data.results
                    });
                });
            })
    }

    fetchExistingDisciplines = () => {
        const url = `api/roadmaps/disciplines/`
        axios.get(url).then(res => {
            console.log(res)
			this.setState({
			    existingDisciplines: res.data
            });
		});
    }

    // TODO(qahoang)
    fetchHighestRatedRoadmaps = () => {
        const url = 'api/roadmaps/highest-rated/'
        axios.get(url).then(res => {
			this.setState({
			    highestRatedRoadmaps: res.data
            });
		});
    }

    // TODO(qahoang)
    fetchMostPopularRoadmaps = () => {
        const url = 'api/roadmaps/most-popular/'
        axios.get(url).then(res => {
                this.setState({
                    mostPopularRoadmaps: res.data
                });
		});
    }

    configureAxios = () => {
        const token = localStorage.getItem('token')
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        };
    }

    componentWillMount() {
        console.log('dashboard componentWillMount', this.props.username)
        this.configureAxios()
    }

	componentDidMount() {    
        console.log('dashboard componentDidMount', this.props.username)    
        this.fetchCreatedRoadmapsByUser(localStorage.getItem('username'));
        this.fetchExistingDisciplines();
        this.fetchHighestRatedRoadmaps();
        this.fetchMostPopularRoadmaps();
    }
    
    componentDidUpdate() {
        console.log('dashboard componentDidUpdate', this.props.username)
    }
    
    render() {
        const disciplines = [];
        if (this.state.existingDisciplines.length != 0) {
            this.state.existingDisciplines.data.forEach(elem => {
                let discipline = elem[0]
                disciplines.push(
                    <Col key={discipline} className="gutter-row" span={6}>
                        <DisciplineCard 
                            discipline={discipline}
                        />
                    </Col>
                )
            })
        }

        return (
            <div className="container-fluid">
                <div>
                    <h3>Welcome back, let's continue our studies?</h3>
                </div>
                <div>
                    <DashboardRoadmapList
                        data={this.state.userExistingRoadmaps}
                    />
                </div>
                
                <div>
                    <h3>Disciplines</h3>
                </div>
                <Row className="dashboard-disciplines" gutter={16}>
                    {disciplines}
                </Row>
                
                <div>
                    <h3>Highest Rated</h3>
                </div>
                <div>
                    <DashboardRoadmapList
                        data={this.state.highestRatedRoadmaps}
                    />
                </div>
            
                <div>
                    <h3>Most Popular</h3>
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
        token: state.auth.token,
        username: state.auth.username,
    };
};

export default connect(mapStateToProps)(Dashboard)
