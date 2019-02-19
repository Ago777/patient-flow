import React, {Component, Fragment} from "react";
import IntlMessages from "Util/IntlMessages";
import {Row, Card, CardTitle, Form, Label, Input, Button} from "reactstrap";
import {bindActionCreators} from 'redux';
import {NavLink} from "react-router-dom";
import {Colxx} from "Components/CustomBootstrap";
import {connect} from "react-redux";
import {loginUser, resetError} from "Redux/actions";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    };

    onUserLogin = () => {
        if (this.state.email.trim() !== "" && this.state.password.trim() !== "") {
            this.props.loginUser(this.state, this.props.history);
        }
    };

    handleKeyPress = (e) => {
        if (e.key === "Enter") this.onUserLogin()
    };

    handleChangeInput = (e, type) => {
        const value = e.target.value;
        const state = this.state;
        state[type] = value;
        this.setState(state);
        this.props.loginError && this.props.resetError();
    };

    componentDidMount() {
        document.body.classList.add("background");
    };

    componentWillUnmount() {
        document.body.classList.remove("background");
    };

    render() {
        const {loginError} = this.props
        return (
          <Fragment>
              <div className="fixed-background"/>
              <main>
                  <div className="container" onKeyPress={this.handleKeyPress}>
                      <Row className="h-100">
                          <Colxx xxs="12" md="10" className="mx-auto my-auto">
                              <Card className="auth-card">
                                  <div className="position-relative image-side ">
                                      <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                                      <p className="white mb-0">
                                          Please use your credentials to login.
                                          <br/>
                                          If you are not a member, please{" "}
                                          <NavLink to={`/register`} className="white">
                                              register
                                          </NavLink>
                                          .
                                      </p>
                                  </div>
                                  <div className="form-side">
                                      <NavLink to={`/`} className="white navbar-logo">
                                          <span className='logo'/>
                                          <div className='logo-text'>
                                              <span className='logo-txt'>PATIENT</span>
                                              <span className='logo-txt txt'>FLOW</span>
                                          </div>
                                      </NavLink>
                                      <CardTitle className="mb-4">
                                          <IntlMessages id="user.login-title"/>
                                      </CardTitle>
                                      <Form>
                                          <Label className="form-group has-float-label mb-4">
                                              <Input type="email" onChange={(e) => this.handleChangeInput(e, 'email')}/>
                                              <IntlMessages id="user.email"/>
                                          </Label>
                                          <Label className="form-group has-float-label mb-4">
                                              <Input type="password"
                                                     onChange={(e) => this.handleChangeInput(e, 'password')}/>
                                              <span style={{position: 'absolute', color: 'red'}}>{loginError}</span>
                                              <IntlMessages id="user.password"/>
                                          </Label>
                                          <div className="d-flex justify-content-between align-items-center">
                                              <NavLink to={`/forgot-password`}>
                                                  <IntlMessages id="user.forgot-password-question"/>
                                              </NavLink>
                                              <Button
                                                color="primary"
                                                className="btn-shadow"
                                                size="lg"
                                                onClick={() => this.onUserLogin()}
                                              >
                                                  <IntlMessages id="user.login-button"/>
                                              </Button>
                                          </div>
                                      </Form>
                                  </div>
                              </Card>
                          </Colxx>
                      </Row>
                  </div>
              </main>
          </Fragment>
        );
    }
}

const mapStateToProps = ({authUser}) => {
    const {
        loading,
        loginError
    } = authUser;

    return {
        loading,
        loginError
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
          loginUser,
          resetError
      },
      dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
