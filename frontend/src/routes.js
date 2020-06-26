import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from "react-router-dom";

import LandingPage from './pages/LandingPage'
import Roadmap from './components/Roadmap'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyRoadmap from './pages/MyRoadmap'
import CreateRoadmap from './pages/CreateRoadmap';
import Dashboard from './pages/Dashboard';
import SearchResult from './pages/SearchResult';

class BaseRouter extends Component {
    constructor(props) {
        super(props)
    }

    render() {        
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route 
                        exact 
                        path="/login/"
                        render= { () => this.props.isAuthenticated ? (<Redirect to="/dashboard/"/>) : (<Login />) }
                    />
                    <Route 
                        exact 
                        path="/signup/"
                        render= { () => this.props.isAuthenticated ? (<Redirect to="/dashboard/"/>) : (<Signup />) }
                    />
                    <Route exact path="/search/" component={SearchResult} />
                    <Route exact path="/roadmaps/" component={MyRoadmap} />
                    <Route exact path="/roadmaps/create/" component={CreateRoadmap} />
                    <Route exact path="/roadmaps/:roadmapId" component={Roadmap} />
                    <Route exact path="/dashboard/" component={Dashboard} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(BaseRouter);