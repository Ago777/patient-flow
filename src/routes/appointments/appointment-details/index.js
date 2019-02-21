import React, {Component, Fragment} from "react";
import {
    Row,
    Card,
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu, Button, Modal, ModalHeader, ModalBody, Label, Input, CustomInput, ModalFooter,
} from "reactstrap";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {NavLink} from "react-router-dom";

export default class AppointmentDetails extends Component {

    render() {
        return (
          <Fragment>
              <Row className='appointment-details'>
                  <Colxx xxs="12">
                      <div className="mb-5 d-flex align-items-xs-center justify-content-between flex-column  flex-xs-row back-arrow">
                          <div className='d-flex align-items-center'>
                              <NavLink to='/app/appointments'>
                                  <span className='d-flex'><i className="material-icons">arrow_back</i></span>
                              </NavLink>
                              <span className='page-header ml-4'>Appointment Details</span>
                          </div>
                          <div>
                              <p className='patient-status  d-flex align-items-center'>
                                  <i className="material-icons mr-2"> lens</i>
                                  <span>New Patient</span>
                              </p>
                          </div>
                      </div>
                  </Colxx>

              </Row>
              <Row className='appointment-details'>
                  <Colxx sm="12" md="12" lg="6" className="mb-4">
                      <Card>
                          <div className='d-flex h-100 p-5 flex-column  flex-xs-row'>
                              <div
                                className="d-flex flex-column justify-content-between min-width-zero">
                                  <div className="w-100 mb-3 d-flex">
                                      <div>
                                          <i className="material-icons details-icons">
                                              query_builder
                                          </i>
                                      </div>
                                      <div>
                                          <p className='d-flex small-txt-xxs mb-0 head-txt'>
                                              Appointment Time
                                          </p>
                                          <p className="list-item-heading small-txt-xxs">
                                              Jul 15, 2018 at 1:00pm
                                          </p>
                                      </div>
                                  </div>
                                  <div className="w-100 mb-3 d-flex">
                                      <div>
                                          <i className="material-icons details-icons">
                                              calendar_today
                                          </i>
                                      </div>
                                      <div>
                                          <p className='small-txt-xxs mb-0 head-txt'>
                                              Calendar Name
                                          </p>
                                          <p className="list-item-heading small-txt-xxs">
                                              Transformologie
                                          </p>
                                      </div>
                                  </div>
                                  <div className="w-100 mb-3 d-flex">
                                      <div>
                                          <i className="material-icons details-icons">
                                              enhanced_encryption
                                          </i>
                                      </div>
                                      <div>
                                          <p className='small-txt-xxs mb-0 head-txt'>
                                              Provider
                                          </p>
                                          <p className="list-item-heading small-txt-xxs email">
                                              Dr.Phelps
                                          </p>
                                      </div>
                                  </div>
                                  <div className="w-100 mb-3 d-flex">
                                      <div>
                                          <i className="material-icons details-icons">
                                              location_on
                                          </i>
                                      </div>
                                      <div>
                                          <p className='small-txt-xxs mb-0 head-txt'>
                                              Location
                                          </p>
                                          <p className="list-item-heading small-txt-xxs">
                                              Transformologie 123 Medical Road Los Angeles, CA 90156
                                          </p>
                                      </div>
                                  </div>
                                  <div className="w-100 mb-3 d-flex">
                                      <div>
                                          <i className="material-icons details-icons">
                                              query_builder
                                          </i>
                                      </div>
                                      <div>
                                          <p className='small-txt-xxs mb-0 head-txt'>
                                              Requested Time
                                          </p>
                                          <p className="list-item-heading small-txt-xxs">
                                              Requested on Jul 15, 2018 at 1:00pm
                                          </p>
                                      </div>
                                  </div>
                                  <div className="w-100 mb-3 d-flex">
                                      <div>
                                          <i className="material-icons details-icons">
                                              language
                                          </i>
                                      </div>
                                      <div>
                                          <p className='d-flex small-txt-xxs mb-0 head-txt'>
                                              Source
                                          </p>
                                          <p className="list-item-heading  small-txt-xxs">
                                              PatientFlow
                                          </p>
                                      </div>
                                  </div>
                                  <div className="w-100 mb-3 d-flex">
                                      <div>
                                          <i className="material-icons details-icons">
                                              local_hospital
                                          </i>
                                      </div>
                                      <div>
                                          <p className='d-flex small-txt-xxs mb-0 head-txt'>
                                              Reason For Visit
                                          </p>
                                          <p className="list-item-heading small-txt-xxs">
                                              Fever
                                          </p>
                                      </div>
                                  </div>

                              </div>
                              <div className="detail-icon pr-4">
                                  <UncontrolledDropdown>
                                      <DropdownToggle
                                        caret
                                        color="secondary"
                                        className=""
                                        outline
                                      >
                                          <i className="material-icons">
                                              settings
                                          </i>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                          <DropdownItem>
                                              No design yet
                                          </DropdownItem>
                                          <DropdownItem>
                                              No design yet
                                          </DropdownItem>
                                      </DropdownMenu>
                                  </UncontrolledDropdown>
                              </div>
                          </div>
                      </Card>
                  </Colxx>
                  <Colxx sm="12" md="12" lg="6" className="mb-4">
                      <Card>
                          <div className='d-flex h-100 p-5'>
                              <div className="d-flex flex-column justify-content-between min-width-zero">
                                  <div className="w-100 mb-4">
                                      <p className='truncate  small-txt-xxs insurance-txt'>
                                          INSURANCE INFORMATION
                                      </p>
                                  </div>
                                  <div className="w-100 mb-2">
                                      <p className='truncate  small-txt-xxs mb-0 head-txt'>
                                          Insurance provider
                                      </p>
                                      <p className="list-item-heading truncate  small-txt-xxs">
                                          Aetna
                                      </p>
                                  </div>
                                  <div className="w-100 mb-2">
                                      <p className='truncate  small-txt-xxs mb-0 head-txt'>
                                          Member ID
                                      </p>
                                      <p className="list-item-heading truncate  small-txt-xxs email">
                                          W6565 84
                                      </p>
                                  </div>
                                  <div className="w-100 mb-2">
                                      <p className='truncate  small-txt-xxs mb-0 head-txt'>
                                          Group Number
                                      </p>
                                      <p className="list-item-heading truncate  small-txt-xxs">
                                          545454-5454545-565656
                                      </p>
                                  </div>
                                  <div className="w-100">
                                      <p className='truncate  small-txt-xxs mb-0 head-txt'>Phone Number</p>
                                      <p className="list-item-heading truncate  small-txt-xxs">
                                          5454.5454.565
                                      </p>
                                  </div>
                              </div>
                              <div className="detail-icon pr-4">
                                  <UncontrolledDropdown>
                                      <DropdownToggle
                                        caret
                                        color="secondary"
                                        className=""
                                        outline
                                      >
                                          <i className="material-icons">
                                              settings
                                          </i>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                          <DropdownItem>
                                              No design yet
                                          </DropdownItem>
                                          <DropdownItem>
                                              No design yet
                                          </DropdownItem>
                                      </DropdownMenu>
                                  </UncontrolledDropdown>
                              </div>
                          </div>
                      </Card>
                  </Colxx>
              </Row>
          </Fragment>
        );
    }
}
