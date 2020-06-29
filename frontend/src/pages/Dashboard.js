import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
    fetchRoadmapRequested
} from '../redux/roadmap/roadmap.action'

import {
    selectRoadmapByUser, 
    selectMostPopularRoadmaps, 
    selectAllRoadmaps, 
    selectHighestRatedRoadmaps
} from '../redux/roadmap/roadmap.selector'

import { fetchAllDisciplineStart } from '../redux/discipline/discipline.action'
import { selectAllDisciplines } from '../redux/discipline/discipline.selector'

import { Row, Col } from 'antd';
import DisciplineCard from '../components/DisciplineCard';
import DashboardRoadmapList from '../components/DashboardRoadmapList';

import { selectUser } from '../redux/auth/auth.selector';


class Dashboard extends Component {

	componentDidMount() {    
        this.props.fetchRoadmapRequested();
        this.props.fetchAllDiscipline();
    }
    
    render() {
        const { 
            roadmapsByUser,
            allRoadmaps,
            mostPopularRoadmaps,
            highestRatedRoadmaps,
            existingDisciplines,
            isAuthenticated
        } = this.props;
     
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

        const message = isAuthenticated ? "Welcome back! Pick up where you left off" : "Let's get started!"
        
        return (
            <div className="container-fluid">
                <div>
                    <h3>{message}</h3>
                </div>
                <div>
                    <DashboardRoadmapList
                        data={isAuthenticated ? roadmapsByUser : allRoadmaps}
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
    allRoadmaps: selectAllRoadmaps(state),
    mostPopularRoadmaps: selectMostPopularRoadmaps(state),
    highestRatedRoadmaps: selectHighestRatedRoadmaps(state),
    existingDisciplines: selectAllDisciplines(state),

    user: selectUser(state),
    roadmapsByUser: selectRoadmapByUser(state)
});

// (dispatch, ownProps)
const mapDispatchToProps = (dispatch) => {
    return ({
        fetchRoadmapRequested: () => {
            dispatch(fetchRoadmapRequested())
        },
        fetchAllDiscipline: () => {
            dispatch(fetchAllDisciplineStart())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
