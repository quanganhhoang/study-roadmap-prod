import React from 'react'
import { Route } from "react-router-dom";

import LandingPage from './components/LandingPage'
import Roadmap from './components/Roadmap'
import Login from './components/Login'
import Signup from './components/Signup'
import RoadmapListView from './components/RoadmapListView'

const BaseRouter = () => (
	<div>
		<Route exact path="/" component={LandingPage} />
        <Route exact path="/roadmaps/" component={RoadmapListView} />
		<Route exact path="/roadmaps/:roadmapId/" component={Roadmap} />
		<Route exact path="/login/" component={Login} />
		<Route exact path="/signup/" component={Signup} />
	</div>
);

export default BaseRouter;