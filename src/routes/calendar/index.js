import React, {Component, Fragment} from "react";
import {
    Row,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    CustomInput,
    ModalFooter,
    Button,
    UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem,
} from "reactstrap";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {CalendarToolbar} from "Components/Calendar/CalendarToolbar";
import {PolarShadow, LineShadow, SmallLineChart} from "Components/Charts";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "chartjs-plugin-datalabels";
import "react-circular-progressbar/dist/styles.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-table/react-table.css";

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    state = {
        modalOpen: false,
        selectedEditOption: {column: "title", label: ""},
        editOptions: [
            {column: "name", label: "Name"},
            {column: "email", label: "Email"},
            {column: "all", label: "All"},
        ],
        selectedProviderOption: {column: "title", label: ""},
        providerOptions: [
            {column: "name", label: "Name"},
            {column: "email", label: "Email"},
            {column: "all", label: "All"},
        ],
    };

    changeEditOption = (column) => {
        this.setState(
          {
              selectedEditOption: this.state.editOptions.find(
                x => x.column === column
              )
          },
        );
    };
    changeProviderOption = (column) => {
        this.setState(
          {
              selectedProviderOption: this.state.providerOptions.find(
                x => x.column === column
              )
          },
        );
    };

    render() {
        return (
          <Fragment>
              <Row className='calendar'>
                  <Colxx xxs="12">
                      <div className="mb-5">
                          <span className='page-header'>Calendar</span>
                          <div className="float-md-right d-flex align-items-center response">
                              <UncontrolledDropdown className="mr-1 float-md-left mb-1">
                                  <DropdownToggle caret className='sort-btn' size="xs">
                                      <span className='sort'>Provider Calendar </span>
                                      <span className='keyword'>{this.state.selectedProviderOption.label}</span>
                                  </DropdownToggle>
                                  <DropdownMenu>
                                      {this.state.providerOptions.map((order, index) => {
                                          return (
                                            <DropdownItem
                                              key={index}
                                              onClick={() => this.changeProviderOption(order.column)}
                                            >
                                                {order.label}
                                            </DropdownItem>
                                          );
                                      })}
                                  </DropdownMenu>
                              </UncontrolledDropdown>
                              <UncontrolledDropdown className="mr-1 float-md-left mb-1">
                                  <DropdownToggle caret className='sort-btn' size="xs">
                                      <span className='sort'>Edit Calendar </span>
                                      <span className='keyword'>{this.state.selectedEditOption.label}</span>
                                  </DropdownToggle>
                                  <DropdownMenu>
                                      {this.state.editOptions.map((order, index) => {
                                          return (
                                            <DropdownItem
                                              key={index}
                                              onClick={() => this.changeEditOption(order.column)}
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
              <Row className='calendar'>
                  <Colxx xl="12" lg="12" className="mb-4">
                      <Card>
                          <CardBody>
                              <BigCalendar
                                style={{height: "1000px"}}
                                allDayAccessor='false'
                                events={[
                                    {
                                        'title': 'John Smith',
                                        'start': new Date(2019, 1, 19, 10, 0), // 10.00 AM
                                        'end': new Date(2019, 1, 19, 10, 30), // 2.00 PM
                                    },
                                    {
                                        'title': 'James Hall',
                                        'start': new Date(2019, 1, 19, 10, 30), // 10.00 AM
                                        'end': new Date(2019, 1, 19, 10, 50), // 2.00 PM
                                    },
                                    {
                                        'title': 'Anthony Green',
                                        'start': new Date(2019, 1, 23, 12, 0), // 10.00 AM
                                        'end': new Date(2019, 1, 23, 12, 30), // 2.00 PM
                                    }  ,
                                    {
                                        'title': 'Anthony Green',
                                        'start': new Date(2019, 1, 17, 12, 30), // 10.00 AM
                                        'end': new Date(2019, 1, 17, 12, 40), // 2.00 PM
                                    }
                                ]}
                                defaultView='week'
                                views={["week"]}
                                min={new Date(2008, 0, 1, 7, 0)}
                                max={new Date(2008, 0, 1, 18, 0)}
                                components={{
                                    toolbar: CalendarToolbar({addHandler: () => this.setState({modalOpen: !this.state.modalOpen})})
                                }}
                              />
                              <Modal
                                isOpen={this.state.modalOpen}
                                toggle={() => this.setState({modalOpen: !this.state.modalOpen})}
                                wrapClassName="modal-right"
                                backdrop="static"
                              >
                                  <ModalHeader>
                                      Add Appointment
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
                          </CardBody>
                      </Card>
                  </Colxx>
              </Row>
          </Fragment>
        );
    }
}

export default Calendar;
