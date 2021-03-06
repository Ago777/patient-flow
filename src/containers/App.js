import React, {Component, Fragment} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {IntlProvider} from 'react-intl';

import {NotificationContainer} from "Components/ReactNotifications";

import {defaultStartPath} from 'Constants/defaultValues'

import {connect} from "react-redux";

import AppLocale from '../lang';
import MainRoute from 'Routes';
import login from './Login';
import register from 'Routes/layouts/register'
import error from 'Routes/layouts/error'
import forgotPassword from 'Routes/layouts/forgot-password'
import 'Assets/css/vendor/bootstrap.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import "Assets/css/sass/themes/gogo.light.purple.scss";

const InitialPath = ({component: Component, ...rest, authUser}) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}
                />}
    />;

class App extends Component {
    render() {
        const {location, match, user, locale} = this.props;
        const currentAppLocale = AppLocale[locale];
        if (location.pathname === '/' || location.pathname === '/app' || location.pathname === '/app/') {
            return (<Redirect to={defaultStartPath}/>);
        }
        return (
            <Fragment>
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}
                >

                    <Fragment>
                        <NotificationContainer/>
                        <Switch>
                            <InitialPath
                                path={`${match.url}app`}
                                authUser={user}
                                component={MainRoute}
                            />
                            <Route path={`/login`} component={login}/>
                            <Route path={`/register`} component={register}/>
                            <Route path={`/forgot-password`} component={forgotPassword}/>
                            <Route path={`/error`} component={error}/>
                            <Redirect to="/error"/>
                        </Switch>
                    </Fragment>
                </IntlProvider>
            </Fragment>
        );
    }
}

const mapStateToProps = ({authUser, settings}) => {
    const {user} = authUser;
    const {locale} = settings;
    return {
        user,
        locale
    };
};

export default connect(mapStateToProps, {})(App);

