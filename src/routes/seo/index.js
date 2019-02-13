import React, {Component, Fragment} from "react";
import IntlMessages from "Util/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import {
    Row,
    Card,
    CardBody,
    Nav,
    NavItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    TabContent,
    TabPane,
    Badge,
    CardSubtitle,
    CardTitle, ModalBody
} from "reactstrap";
import Rating from "Components/Rating";
import {SmallLineChart} from "Components/Charts";
import {
    smallChartData1,
    smallChartData2,
    smallChartData3,
    smallChartData4
} from "Constants/chartConfig";
import {LineShadow} from "Components/Charts";
import {areaChartConfig} from "Constants/chartConfig";
import {NavLink} from "react-router-dom";
import CircularProgressbar from "react-circular-progressbar";
import {Colxx} from "Components/CustomBootstrap";
import {BreadcrumbItems} from "Components/BreadcrumbContainer";
import classnames from "classnames";

export default class DetailsLayout extends Component {
    state = {
        orderOptions: [
            {column: "keywords", label: "Keywords"},
            {column: "positions", label: "Positions"},
            {column: "engine", label: "Engine"},
            {column: "all", label: "All"}
        ],
        selectedOrderOption: {column: "all", label: "All"},
    };

    changeOrderBy = (column) => {
        this.setState(
          {
              selectedOrderOption: this.state.orderOptions.find(
                x => x.column === column
              )
          },
        );
    };

    render() {
        return (
          <Fragment>
              <Row className='seo'>
                  <Colxx xxs="12">
                      <div className="mb-5">
                          <span className='page-header'>SEO</span>
                          <div className="float-sm-right d-flex align-items-center response">
                              <span className='items-count'>98 keywords</span>
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
                                              onClick={() => this.changeOrderBy(order.column)}
                                            >
                                                {order.label}
                                            </DropdownItem>
                                          );
                                      })}
                                  </DropdownMenu>
                              </UncontrolledDropdown>
                          </div>
                      </div>
                      <TabContent activeTab={'2'}>
                          <TabPane tabId="2">
                              <Row>
                                  <Colxx>
                                      <Card className="d-flex flex-row head">
                                          <div className="d-flex flex-grow-1 min-width-zero">
                                              <CardBody
                                                className="align-self-center d-flex  flex-sm-row justify-content-between min-width-zero align-items-sm-center">
                                                  <p className="mb-1 text-muted text-small w-30 w-xs-100">
                                                      Keywords
                                                  </p>
                                                  <p className="mb-1 text-muted text-small w-20 w-xs-100">
                                                      Page
                                                  </p>
                                                  <p className="mb-1 text-muted text-small w-20 w-xs-100">
                                                      Position
                                                  </p>
                                                  <p className="mb-1 text-muted text-small w-20 w-xs-100">
                                                     Search Engine
                                                  </p>
                                              </CardBody>
                                          </div>
                                      </Card>

                                      <Card className="d-flex flex-row mb-2">
                                          <div className="d-flex flex-grow-1 min-width-zero">
                                              <CardBody
                                                className="align-self-center d-flex flex-column flex-sm-row justify-content-between min-width-zero align-items-sm-center">
                                                  <p className="pb-1 mb-1 text-muted text-small w-30 w-xs-100 truncate">
                                                      endormologie Los Angeles
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Page:</span>
                                                      <span>1</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Position:</span>
                                                      <span>2</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Search Engine:</span>
                                                      <span>Google</span>
                                                  </p>
                                              </CardBody>
                                          </div>
                                      </Card>

                                      <Card className="d-flex flex-row mb-2">
                                          <div className="d-flex flex-grow-1 min-width-zero">
                                              <CardBody
                                                className="align-self-center d-flex flex-column flex-sm-row justify-content-between min-width-zero align-items-sm-center">
                                                  <p className="pb-1 mb-1 text-muted text-small w-30 w-xs-100 truncate">
                                                      endormologie Los Angeles
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Page:</span>
                                                      <span>1</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Position:</span>
                                                      <span>2</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Search Engine:</span>
                                                      <span>Google</span>
                                                  </p>
                                              </CardBody>
                                          </div>
                                      </Card>

                                      <Card className="d-flex flex-row mb-2">
                                          <div className="d-flex flex-grow-1 min-width-zero">
                                              <CardBody
                                                className="align-self-center d-flex flex-column flex-sm-row justify-content-between min-width-zero align-items-sm-center">
                                                  <p className="pb-1 mb-1 text-muted text-small w-30 w-xs-100 truncate">
                                                      endormologie Los Angeles
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Page:</span>
                                                      <span>1</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Position:</span>
                                                      <span>2</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Search Engine:</span>
                                                      <span>Google</span>
                                                  </p>
                                              </CardBody>
                                          </div>
                                      </Card>

                                      <Card className="d-flex flex-row mb-2">
                                          <div className="d-flex flex-grow-1 min-width-zero">
                                              <CardBody
                                                className="align-self-center d-flex flex-column flex-sm-row justify-content-between min-width-zero align-items-sm-center">
                                                  <p className="pb-1 mb-1 text-muted text-small w-30 w-xs-100 truncate">
                                                      endormologie Los Angeles
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Page:</span>
                                                      <span>1</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Position:</span>
                                                      <span>2</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Search Engine:</span>
                                                      <span>Google</span>
                                                  </p>
                                              </CardBody>
                                          </div>
                                      </Card>
                                      <Card className="d-flex flex-row mb-2">
                                          <div className="d-flex flex-grow-1 min-width-zero">
                                              <CardBody
                                                className="align-self-center d-flex flex-column flex-sm-row justify-content-between min-width-zero align-items-sm-center">
                                                  <p className="pb-1 mb-1 text-muted text-small w-30 w-xs-100 truncate">
                                                      endormologie Los Angeles
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Page:</span>
                                                      <span>1</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Position:</span>
                                                      <span>2</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Search Engine:</span>
                                                      <span>Google</span>
                                                  </p>
                                              </CardBody>
                                          </div>
                                      </Card>
                                      <Card className="d-flex flex-row mb-2">
                                          <div className="d-flex flex-grow-1 min-width-zero">
                                              <CardBody
                                                className="align-self-center d-flex flex-column flex-sm-row justify-content-between min-width-zero align-items-sm-center">
                                                  <p className="pb-1 mb-1 text-muted text-small w-30 w-xs-100 truncate">
                                                      endormologie Los Angeles
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Page:</span>
                                                      <span>1</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Position:</span>
                                                      <span>2</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Search Engine:</span>
                                                      <span>Google</span>
                                                  </p>
                                              </CardBody>
                                          </div>
                                      </Card>

                                      <Card className="d-flex flex-row mb-2">
                                          <div className="d-flex flex-grow-1 min-width-zero">
                                              <CardBody
                                                className="align-self-center d-flex flex-column flex-sm-row justify-content-between min-width-zero align-items-sm-center">
                                                  <p className="pb-1 mb-1 text-muted text-small w-30 w-xs-100 truncate">
                                                      endormologie Los Angeles
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Page:</span>
                                                      <span>1</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Position:</span>
                                                      <span>2</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Search Engine:</span>
                                                      <span>Google</span>
                                                  </p>
                                              </CardBody>
                                          </div>
                                      </Card>

                                      <Card className="d-flex flex-row mb-2">
                                          <div className="d-flex flex-grow-1 min-width-zero">
                                              <CardBody
                                                className="align-self-center d-flex flex-column flex-sm-row justify-content-between min-width-zero align-items-sm-center">
                                                  <p className="pb-1 mb-1 text-muted text-small w-30 w-xs-100 truncate">
                                                      endormologie Los Angeles
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Page:</span>
                                                      <span>1</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Position:</span>
                                                      <span>2</span>
                                                  </p>
                                                  <p className="pb-1 mb-1 text-muted text-small w-20 w-xs-100 d-flex justify-content-between">
                                                      <span className='hidden'>Search Engine:</span>
                                                      <span>Google</span>
                                                  </p>
                                              </CardBody>
                                          </div>
                                      </Card>
                                  </Colxx>
                              </Row>
                          </TabPane>
                      </TabContent>
                  </Colxx>
              </Row>
              <Row/>
          </Fragment>
        );
    }
}
