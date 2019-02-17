import React, {Component, Fragment} from "react";
import {
    Row, Card,UncontrolledDropdown,DropdownToggle, DropdownMenu,
    DropdownItem, Button, Modal, ModalHeader, ModalBody, Label,
    Input, CustomInput, ModalFooter,
} from "reactstrap";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {BreadcrumbItems} from "Components/BreadcrumbContainer";
import {ContextMenuTrigger} from "react-contextmenu";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getReviews, sortBy, logoutUser} from "Redux/actions";
import {NavLink} from "react-router-dom";


class Appointments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            reviewComments: {},
            selectedOrderOption: {column: "title", label: "All"},
            orderOptions: [
                {column: "rating", label: "Rating"},
                {column: "date", label: "Date"},
                {column: "all", label: "All"},
            ],
        };
    }

    componentWillMount() {
        this.props.getReviews();
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
                reviews
            },
            state: {}
        } = this;
        if (isLoading) return <div className="loading"/>;
        if (error) return (
          <div>
              <h1>Can't Find Appointments, Please Sign In Again</h1>
              <NavLink onClick={() => this.props.logoutUser(this.props.history)} to='/login' className='link-sign-in'>
                  Sign In
              </NavLink>
          </div>
        );

        return (
          <Fragment>
              <Row className='appointments'>
                  <Colxx xxs="12">
                      <div className="mb-5">
                          <span className='page-header'>Appointments</span>
                          <div className="float-md-right d-flex align-items-center response">
                              <span className='items-count'>10 appointments</span>
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
                                      Add New Appointment
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
                                  <DropdownToggle caret className='sort-btn d-flex align-items-center' size="xs">
                                      <i className="material-icons filter-icon">tune </i>
                                      <span className='sort'>Filters</span>
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
              <Row className='appointments'>
                  {
                      reviews.map(review => {
                          return (
                            <Colxx xxs="12" key={review['id']} className="mb-3">
                                <ContextMenuTrigger id="menu_id">
                                    <Card className="d-flex flex-row">
                                        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                            <div className="card-body flex-column  min-width-zero">


                                                <div className='d-flex mb-2 justify-content-between'>
                                                    <div className='mb-0 txt under  d-flex'>
                                                        <i className="material-icons calendar">
                                                            calendar_today
                                                        </i>
                                                        <p className='mb-1 ml-2 txt-head'>Jul 24, 2018 at 1:00pm</p>
                                                    </div>
                                                    <div className='d-flex res-hide'>
                                                        <div className='phone-btn txt under mr-2'>
                                                            <i className="material-icons weight">query_builder</i>
                                                        </div>
                                                        <div className='phone-btn txt under mr-2'>
                                                            <i className="material-icons weight">close</i>
                                                        </div>
                                                        <div className='phone-btn txt under mr-2'>
                                                            <i className="material-icons weight">block</i>
                                                        </div>
                                                        <NavLink
                                                          to='/app/appointment/details'
                                                          className="review"
                                                        >
                                                            <p
                                                              className="review-btn mb-0 text-muted text-small">
                                                                <span>Details</span>
                                                            </p>
                                                        </NavLink>
                                                    </div>
                                                </div>

                                                <div
                                                  className='d-flex w-100 align-items-end flex-column flex-lg-row min-width-zero'>
                                                    <div className='w-100 resp'>
                                                        <p className='mb-2 txt under'>
                                                            <span>John Smith</span>
                                                        </p>
                                                        <p className='mb-1 txt under email'>
                                                            <span>john.smith@gmail.com</span>
                                                        </p>
                                                        <p className='mb-0 txt under'>
                                                            <span>555.555.5555</span>
                                                        </p>
                                                    </div>
                                                    <div className='w-100 resp'>
                                                        <p className='mb-1 txt under  d-flex align-items-center'>
                                                            <i className="material-icons mr-2">enhanced_encryption</i>
                                                            <span>Dr. Phelps</span>
                                                        </p>
                                                        <p className='mb-0 txt under  d-flex align-items-center'>
                                                            <i className="material-icons mr-2">location_on</i>
                                                            <span>Transformologie</span>
                                                        </p>
                                                    </div>
                                                    <div className='w-100 resp'>
                                                        <p className='mb-1 txt under  d-flex align-items-center'>
                                                            <i
                                                              className="material-icons mr-2 weight">query_builder</i>
                                                            <span>Requested Jul 13, 2018</span>
                                                        </p>
                                                        <p className='mb-0 txt under  d-flex align-items-center'>
                                                            <i className="material-icons mr-2 weight">s</i>
                                                            <span>PatientFlow</span>
                                                        </p>
                                                    </div>
                                                    <div className='w-100 resp'>
                                                        <p className='mb-1 patient-status  d-flex align-items-center'>
                                                            <i className="material-icons mr-2"> lens</i>
                                                            <span>New Patient</span>
                                                        </p>
                                                        <p className='mb-0 reason  d-flex align-items-center'>
                                                            <i className="material-icons mr-2 weight">s</i>
                                                            <span>Reason for visit: Fever</span>
                                                        </p>
                                                    </div>
                                                    <div className='d-flex w-100 mobile-btns'>
                                                        <div className='phone-btn txt under mr-2'>
                                                            <i className="material-icons weight">query_builder</i>
                                                        </div>
                                                        <div className='phone-btn txt under mr-2'>
                                                            <i className="material-icons weight">close</i>
                                                        </div>
                                                        <div className='phone-btn txt under mr-2'>
                                                            <i className="material-icons weight">block</i>
                                                        </div>
                                                        <NavLink
                                                          to='/app/appointment/details'
                                                          className="review"
                                                        >
                                                            <p
                                                              className="review-btn mb-0 text-muted text-small">
                                                                <span>Details</span>
                                                            </p>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </ContextMenuTrigger>
                            </Colxx>
                          );
                      })
                  }
              </Row>
          </Fragment>
        );
    }
}

const mapStateToProps = ({reviewsPage}) => {
    const {
        error,
        isLoading,
        reviewsStarts,
        reviews
    } = reviewsPage;

    return {
        error,
        isLoading,
        reviewsStarts,
        reviews
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
          getReviews,
          sortBy,
          logoutUser
      },
      dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
