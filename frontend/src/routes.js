import React from 'react'
import { Route, Switch } from "react-router-dom";

import LandingPage from './components/LandingPage'
import Roadmap from './components/Roadmap'
import Login from './components/Login'
import Signup from './components/Signup'
import RoadmapListView from './components/RoadmapListView'
import CreateRoadmap from './components/CreateRoadmap';
import Dashboard from './components/Dashboard';

const BaseRouter = () => (
	<div>
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/roadmaps/" component={RoadmapListView} />
            <Route exact path="/roadmaps/create/" exact component={CreateRoadmap} />
            <Route exact path="/roadmaps/:roadmapId" component={Roadmap} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/signup/" component={Signup} />
            <Route exact path="/dashboard/" component={Dashboard} />
        </Switch>
    </div>
);

export default BaseRouter;