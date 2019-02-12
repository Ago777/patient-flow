import React, {Component, Fragment} from "react";
import {
    Row,
    Card,
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
} from "reactstrap";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {NavLink} from "react-router-dom";

export default class PatientDetails extends Component {

    render() {
        return (
          <Fragment>
              <Row className='patient-info'>
                  <Colxx xxs="12">
                      <div className="mb-5 d-flex align-items-center back-arrow">
                          <NavLink to='/app/patients'>
                              <span className='d-flex'><i className="material-icons">arrow_back</i></span>
                          </NavLink>
                          <span className='page-header ml-4'>Patient Details</span>
                      </div>
                  </Colxx>
              </Row>
              <Row className='patient-info'>
                  <Colxx sm="12" md="12" lg="6" className="mb-4">
                      <Card>
                          <div className='d-flex h-100 p-5 flex-column  flex-xs-row'>
                              <div className="d-flex mr-4">
                                  <img
                                    alt='img'
                                    src='/assets/img/profile-pic-l-8.jpg'
                                    className="list-thumbnail border-0"
                                  />
                              </div>
                              <div
                                className="d-flex flex-column justify-content-between min-width-zero">
                                  <div className="w-100 mb-2">
                                      <p className='truncate  small-txt-xxs mb-0 head-txt'>Patient
                                          Name</p>
                                      <p className="list-item-heading truncate  small-txt-xxs">
                                          John Smith
                                      </p>
                                  </div>
                                  <div className="w-100 mb-2">
                                      <p className='truncate  small-txt-xxs mb-0 head-txt'>Patient
                                          Phone Number</p>
                                      <p className="list-item-heading truncate  small-txt-xxs">
                                          374.555.5555
                                      </p>
                                  </div>
                                  <div className="w-100 mb-2">
                                      <p className='truncate  small-txt-xxs mb-0 head-txt'>Patient
                                          Email Address</p>
                                      <p className="list-item-heading truncate  small-txt-xxs email">
                                          JohnSmith@gmail.com
                                      </p>
                                  </div>
                                  <div className="w-100 mb-2">
                                      <p className='truncate  small-txt-xxs mb-0 head-txt'>Date of
                                          Birth</p>
                                      <p className="list-item-heading truncate  small-txt-xxs">
                                          December 15, 2015 (age 20)
                                      </p>
                                  </div>
                                  <div className="w-100">
                                      <p className='truncate  small-txt-xxs mb-0' style={{fontSize: '16px'}}>Sex</p>
                                      <p className="list-item-heading truncate  small-txt-xxs">
                                          Male
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
                                      <DropdownMenu right>
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
                                      <DropdownMenu right>
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
