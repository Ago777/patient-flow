import React, {Component, Fragment} from "react";
import {
    Row, Card, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Button, Modal, ModalHeader,
    ModalBody, Label, Input, CustomInput, ModalFooter, Nav
} from "reactstrap";
import {NavLink} from "react-router-dom";
import {Colxx} from "Components/CustomBootstrap";
import {ContextMenuTrigger} from "react-contextmenu";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getListings, sortBy, logoutUser} from "Redux/actions";

class Patients extends Component {
    state = {
        selectedOrderOption: {column: "title", label: "All"},
        orderOptions: [
            {column: "name", label: "Name"},
            {column: "email", label: "Email"},
            {column: "all", label: "All"},
        ],
        modalOpen: false,
    };

    componentWillMount() {
        this.props.getListings()
    };

    changeSortBy = (column) => {
        this.setState(
          {
              selectedOrderOption: this.state.orderOptions.find(
                x => x.column === column
              )
          },
        );
        // this.props.sortBy(column);

    };


    render() {
        const {
            props: {
                error,
                isLoading,
                listings,
            },
        } = this;
        if (isLoading) return <div className="loading"/>;
        if (error) return (
          <div>
              <h1>Can't Find Patients, Please Sign In Again</h1>
              <NavLink onClick={() => this.props.logoutUser(this.props.history)} to='/login' className='link-sign-in'>
                  Sign In
              </NavLink>
          </div>
        );

        return (
          <Fragment>
              <div className="disable-text-selection patients">
                  <Row>
                      <Colxx xxs="12">
                          <div className="mb-5">
                              <span className='page-header'>Patients</span>
                              <div className="float-md-right d-flex align-items-center response">
                                  <Button
                                    color="primary"
                                    size="lg"
                                    className="top-right-button add-btn"
                                    onClick={() => this.setState({modalOpen: !this.state.modalOpen})}
                                  >
                                      Add New
                                  </Button>
                                  <Modal
                                    isOpen={this.state.modalOpen}
                                    toggle={() => this.setState({modalOpen: !this.state.modalOpen})}
                                    wrapClassName="modal-right"
                                    backdrop="static"
                                  >
                                      <ModalHeader toggle={this.toggleModal}>
                                          Add New Patient
                                      </ModalHeader>
                                      <ModalBody>
                                          <Label>
                                              Name
                                          </Label>
                                          <Input/>
                                          <Label className="mt-4">
                                              Email
                                          </Label>
                                          <Input/>
                                          <Label className="mt-4">
                                              Status
                                          </Label>
                                          <CustomInput
                                            type="radio"
                                            id="exCustomRadio"
                                            name="customRadio"
                                            label="ON HOLD"
                                          />
                                          <CustomInput
                                            type="radio"
                                            id="exCustomRadio2"
                                            name="customRadio"
                                            label="PROCESSED"
                                          />
                                      </ModalBody>
                                      <ModalFooter>
                                          <Button
                                            className='btn-cancel'
                                            color="secondary"
                                            outline
                                            onClick={() => this.setState({modalOpen: !this.state.modalOpen})}
                                          >
                                              Cancel
                                          </Button>
                                          <Button
                                            color="primary"
                                            className='btn-submit'
                                            onClick={() => this.setState({modalOpen: !this.state.modalOpen})}>
                                              Submit
                                          </Button>{" "}
                                      </ModalFooter>
                                  </Modal>
                                  <UncontrolledDropdown className="mr-1 float-md-left mb-1">
                                      <DropdownToggle caret className='sort-btn' size="xs">
                                          <span className='sort'>Sort By: </span>
                                          <span className='keyword'>{this.state.selectedOrderOption.label}</span>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                          {this.state.orderOptions.map((order, index) => {
                                              return (
                                                <DropdownItem
                                                  key={index}
                                                  onClick={() => this.changeSortBy(order.column)}
                                                >
                                                    {order.label}
                                                </DropdownItem>
                                              );
                                          })}
                                      </DropdownMenu>
                                  </UncontrolledDropdown>
                              </div>
                          </div>
                      </Colxx>
                  </Row>
                  <Row>
                      {
                          [1,2,3,4,5,6,7,8,9,10].map((listing, i) => {
                              return (
                                <Colxx xxs="12" key={`${listing} ${i}`} className="mb-3 patients">
                                    <ContextMenuTrigger id="menu_id">
                                        <Card className="d-flex flex-row">
                                            <div
                                              className="d-flex"
                                            >
                                                <img
                                                  alt='img'
                                                  src='/assets/img/profile-pic-l-8.jpg'
                                                  className="list-thumbnail responsive border-0"
                                                />
                                            </div>
                                            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                                <div
                                                  className="card-body align-self-center d-flex flex-column flex-lg-row min-width-zero align-items-lg-center">
                                                    <div className="w-20 w-sm-100">
                                                        <p className="list-item-heading mb-1 truncate">
                                                            John Smith
                                                        </p>
                                                    </div>
                                                    <p
                                                      className="mb-1 text-muted truncate w-30 w-sm-100 small-txt-xxs email">
                                                        John_smith@gmail.com
                                                    </p>
                                                    <p
                                                      className="mb-1 text-muted truncate w-20 w-sm-100 small-txt-xxs">
                                                        555.555.4568
                                                    </p>
                                                </div>
                                                <div className="pl-1 align-self-center pr-4">
                                                    <NavLink
                                                      to='/app/patient/details'
                                                      className="review"
                                                    >
                                                        <p className="review-btn mb-0 text-muted text-small res-hide">
                                                            <span>Details</span>
                                                        </p>
                                                        <i className="material-icons details-icon">contacts</i>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </Card>
                                    </ContextMenuTrigger>
                                </Colxx>
                              );
                          })
                      }
                  </Row>
              </div>
          </Fragment>
        );
    }
}

const mapStateToProps = ({listingsPage, authUser}) => {
    const {
        error,
        isLoading,
        count,
        listings
    } = listingsPage;

    const {first_name} = authUser['user'];

    return {
        error,
        isLoading,
        count,
        listings,
        first_name
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
          getListings,
          sortBy,
          logoutUser
      },
      dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
