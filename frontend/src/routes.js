import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from "react-router-dom";

import LandingPage from './components/LandingPage'
import Roadmap from './components/Roadmap'
import Login from './components/Login'
import Signup from './components/Signup'
import RoadmapListView from './components/RoadmapListView'
import CreateRoadmap from './components/CreateRoadmap';
import Dashboard from './components/Dashboard';

class BaseRouter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('base router props', this.props)
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route 
                        exact 
                        path="/login/"
                        render= { () => this.props.isAuthenticated ? (<Redirect to="/dashboard/"/>) : (<Login />) }
                    />
                    <Route exact path="/signup/" component={Signup} />
                    <Route exact path="/roadmaps/" component={RoadmapListView} />
                    <Route exact path="/roadmaps/create/" exact component={CreateRoadmap} />
                    <Route exact path="/roadmaps/:roadmapId" component={Roadmap} />
                    <Route exact path="/dashboard/" component={Dashboard} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('routes state', state)
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(BaseRouter);