import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import TopNav from 'Containers/TopNav'
import Sidebar from 'Containers/Sidebar';
import dashboard from './dashboard';
import appointments from './appointments';
import reminders from './reminders';
import calendar from './calendar';
import patients from './patients';
import phoneLeads from './phone-leads';
import reviews from './reviews';
import seo from './seo';
import listings from './listings';
import search from './search';
import patientDetails from './patients/patient-details';
import appointmentDetails from './appointments/appointment-details';
import { connect } from 'react-redux';

class MainApp extends Component {
	render() {
		const { match, containerClassnames} = this.props;
		return (
			<div id="app-container" className={containerClassnames}>
				<TopNav history={this.props.history} />
				<Sidebar/>
				<main>
					<div className="container-fluid">
						<Switch>
							<Route path={`${match.url}/dashboard`} component={dashboard} />
							<Route path={`${match.url}/appointments`} component={appointments} />
							<Route path={`${match.url}/reminders`} component={reminders} />
							<Route path={`${match.url}/calendar`} component={calendar} />
							<Route path={`${match.url}/patients`} component={patients} />
							<Route path={`${match.url}/phones`} component={phoneLeads} />
							<Route path={`${match.url}/reviews`} component={reviews} />
							<Route path={`${match.url}/seo`} component={seo} />
							<Route path={`${match.url}/listings`} component={listings} />
							<Route path={`${match.url}/search`} component={search} />
							<Route path={`${match.url}/patient/details`} component={patientDetails} />
							<Route path={`${match.url}/appointment/details`} component={appointmentDetails} />


							{/*<Route path={`${match.url}/applications`} component={applications} />*/}
							{/*<Route path={`${match.url}/dashboards`} component={dashboards} />*/}
							{/*<Route path={`${match.url}/layouts`} component={layouts} />*/}
							{/*<Route path={`${match.url}/ui`} component={ui} />*/}
							<Redirect to="/error" />
						</Switch>
					</div>
				</main>
			</div>
		);
	}
}
const mapStateToProps = ({ menu }) => {
	const { containerClassnames} = menu;
	return { containerClassnames };
  }
  
export default withRouter(connect(mapStateToProps, {})(MainApp));