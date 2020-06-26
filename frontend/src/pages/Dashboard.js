import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
    fetchAllRoadmaps,
    fetchRoadmapByUser,
    fetchMostPopularRoadmaps,
    fetchHighestRatedRoadmaps
} from '../redux/roadmap/roadmap.action'

import { fetchAllDisciplines } from '../redux/discipline/discipline.action'

import { Row, Col } from 'antd';

import DisciplineCard from '../components/DisciplineCard';
import DashboardRoadmapList from '../components/DashboardRoadmapList';


class Dashboard extends Component {

	componentDidMount() {    
        this.props.fetchAllRoadmaps()
        this.props.fetchRoadmapByUser()
        this.props.fetchExistingDisciplines();
        this.props.fetchHighestRatedRoadmaps();
        this.props.fetchMostPopularRoadmaps();
    }
    
    render() {
        const { 
            roadmapsByUser,
            mostPopularRoadmaps,
            highestRatedRoadmaps,
            existingDisciplines } = this.props;
     
        const disciplines = [];
        if (existingDisciplines.length != 0) {
            existingDisciplines.data.forEach(elem => {
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
                    <h3>Welcome back, let&apos;s continue our studies?</h3>
                </div>
                <div>
                    <DashboardRoadmapList
                        data={roadmapsByUser}
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
                        data={highestRatedRoadmaps}
                    />
                </div>
            
                <div>
                    <h3>Most Popular</h3>
                </div>
                <div>
                    <DashboardRoadmapList
                        data={mostPopularRoadmaps}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    roadmapsByUser: state.roadmap.roadmapsByUser,
    mostPopularRoadmaps: state.roadmap.mostPopularRoadmaps,
    highestRatedRoadmaps: state.roadmap.highestRatedRoadmaps,
    existingDisciplines: state.discipline.disciplines
});

// (dispatch, ownProps)
const mapDispatchToProps = (dispatch) => {
    return ({
        fetchAllRoadmaps: () => {
            dispatch(fetchAllRoadmaps())
        },
        fetchRoadmapByUser: () => {
            dispatch(fetchRoadmapByUser())
        },
        fetchMostPopularRoadmaps: () => {
            dispatch(fetchMostPopularRoadmaps())
        },
        fetchHighestRatedRoadmaps: () => {
            dispatch(fetchHighestRatedRoadmaps())
        },
        fetchExistingDisciplines: () => {
            dispatch(fetchAllDisciplines())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
