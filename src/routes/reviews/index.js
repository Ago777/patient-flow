import React, {Component, Fragment} from "react";
import {injectIntl} from 'react-intl';
import {Row, Card, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip} from "reactstrap";
import {NavLink} from "react-router-dom";
import classnames from "classnames";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {BreadcrumbItems} from "Components/BreadcrumbContainer";
import Pagination from "Components/List/Pagination";
import mouseTrap from "react-mousetrap";
import {ContextMenuTrigger} from "react-contextmenu";
const apiUrl = "http://api.crealeaf.com/cakes/paging"
import axios from 'axios';
import Http from "../../http-service";
import {LOGIN_USER_FAILED} from "../../constants/actionTypes";
import {loginUserSuccess} from "../../redux/auth/actions";

class Reviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPageSize: 8,
            selectedOrderOption: {column: "title", label: "All"},
            orderOptions: [
                {column: "rating", label: "Rating"},
                {column: "date", label: "Date"},
                {column: "source", label: "Source"},
                {column: "all", label: "All"}
            ],
            currentPage: 1,
            totalPage: 1,
            search: "",
            selectedItems: [],
            isLoading: false
        };
    }

    onChangePage = (page) => {
        this.setState(
          {
              currentPage: page
          },
          () => this.dataListRender()
        );
    }

    componentDidMount() {
        this.dataListRender();
    }

    dataListRender = () => {

        const {selectedPageSize, currentPage, selectedOrderOption, search} = this.state;
        axios.get(`${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`)
          .then(res => {
              return res.data
          }).then(data => {
            this.setState({
                totalPage: data.totalPage,
                items: data.data,
                selectedItems: [],
                isLoading: true
            });
        })
    }

    changeOrderBy = (column) => {
        this.setState(
          {
              selectedOrderOption: this.state.orderOptions.find(
                x => x.column === column
              )
          },
        );
    };

    x = () => {
        Http.get("http://80.87.199.171:3002/reviews")
          .then(response => console.log(response))
          .catch(res => console.log('dhgfhsdgfsgdhfgsdhfg'))
    }

    render() {
        return (
          !this.state.isLoading ?
            <div className="loading"></div>
            :
            <Fragment>
                <Row className='review'>
                    <Colxx xxs="12">
                        <div className="mb-5">
                            <span className='page-header'>Reviews</span>
                            <div className="float-sm-right d-flex align-items-center response">
                                <span className='items-count' onClick={this.x}>368 reviews</span>
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
                    </Colxx>
                </Row>
                <Row className='review'>
                    <Colxx xxs="12" className="mb-3">
                        <ContextMenuTrigger id="menu_id">
                            <Card className="d-flex flex-row">
                                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                    <div
                                      className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                        <div className='w-30 w-sm-100'>
                                            <p className="mb-4">
                                                <span className='rating-txt'>Average Rating</span>
                                            </p>
                                            <p className='mb-0 d-flex'>
                                                <span>
                                                    <span className='rating-num'>3.9</span>
                                                    <span className='rating-num-small'>/5</span>
                                                </span>
                                                <span className='stars'>
                                                    <i className="material-icons fill">grade</i>
                                                    <i className="material-icons fill">grade</i>
                                                    <i className="material-icons fill">grade</i>
                                                    <i className="material-icons half-fill">grade</i>
                                                    <i className="material-icons">grade</i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className='w-20 w-sm-100 '>
                                            <p className="mb-4">
                                                <span className='rating-txt'>Total Reviews</span>
                                            </p>
                                            <p className="mb-0">
                                                <span className='rating-num'>328</span>
                                            </p>
                                        </div>
                                        <div className='w-40 w-sm-100'>
                                            <div className='d-flex align-items-center  mb-2'>
                                                <div className='d-flex'>
                                                   <span className='stars small d-flex align-items-center'>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons fill">grade</i>
                                                    </span>
                                                    <span className='rev-count'>105</span>
                                                </div>
                                                <div className='line-wrapper'>
                                                    <div className='line' style={{width: '100%'}}/>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center mb-2'>
                                                <div className='d-flex'>
                                                   <span className='stars small d-flex align-items-center'>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons">grade</i>
                                                    </span>
                                                    <span className='rev-count'>47</span>
                                                </div>
                                                <div className='line-wrapper'>
                                                    <div className='line' style={{width: '100%'}}/>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center mb-2'>
                                                <div className='d-flex'>
                                                   <span className='stars small d-flex align-items-center'>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons">grade</i>
                                                      <i className="material-icons">grade</i>
                                                    </span>
                                                    <span className='rev-count'>105</span>
                                                </div>
                                                <div className='line-wrapper'>
                                                    <div className='line' style={{width: '100%'}}/>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center mb-2'>
                                                <div className='d-flex'>
                                                   <span className='stars small d-flex align-items-center'>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons">grade</i>
                                                      <i className="material-icons">grade</i>
                                                      <i className="material-icons">grade</i>
                                                    </span>
                                                    <span className='rev-count'>47</span>
                                                </div>
                                                <div className='line-wrapper'>
                                                    <div className='line' style={{width: '100%'}}/>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center mb-2'>
                                                <div className='d-flex'>
                                                   <span className='stars small d-flex align-items-center'>
                                                      <i className="material-icons fill">grade</i>
                                                      <i className="material-icons">grade</i>
                                                      <i className="material-icons">grade</i>
                                                      <i className="material-icons">grade</i>
                                                      <i className="material-icons">grade</i>
                                                    </span>
                                                    <span className='rev-count'>47</span>
                                                </div>
                                                <div className='line-wrapper'>
                                                    <div className='line' style={{width: '100%'}}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </ContextMenuTrigger>
                    </Colxx>
                    {
                        this.state.items.map(product => {
                            return (
                              <Colxx xxs="12" key={product.id} className="mb-3">
                                  <ContextMenuTrigger id="menu_id">
                                      <Card className="d-flex flex-row">
                                          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                              <div className="card-body flex-column  min-width-zero">
                                                  <div className='d-flex align-items-center mb-2'>
                                                     <span className='mr-2'>
                                                         <img src='../../assets/img/profile-pic-l.jpg' alt='img'
                                                              className='img'/>
                                                     </span>
                                                      <span className='mr-2 name'>Jeremy M.</span>
                                                      <span className='mr-3 stars small'>
                                                          <i className="material-icons fill">grade</i>
                                                          <i className="material-icons">grade</i>
                                                          <i className="material-icons">grade</i>
                                                          <i className="material-icons">grade</i>
                                                          <i className="material-icons">grade</i>
                                                     </span>
                                                  </div>
                                                  <div
                                                    className='d-flex align-items-center justify-content-between mb-2'>
                                                      <div className='comment w-85'>
                                                          <span className='txt'>
                                                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                                                          </span>
                                                      </div>
                                                      <div className='reply-btn' id="reply">
                                                          <i className="material-icons">
                                                              reply
                                                          </i>
                                                      </div>
                                                      <UncontrolledTooltip
                                                        placement="top"
                                                        innerClassName='reply-tooltip'
                                                        // className='reply-tooltip'
                                                        target="reply">
                                                          Reply to this review
                                                      </UncontrolledTooltip>
                                                  </div>
                                                  <div>dfgdfghfh</div>
                                              </div>
                                          </div>
                                      </Card>
                                  </ContextMenuTrigger>
                              </Colxx>
                            );
                        })
                    }
                </Row>
                <Pagination
                  currentPage={this.state.currentPage}
                  totalPage={this.state.totalPage}
                  onChangePage={i => this.onChangePage(i)}
                />
            </Fragment>
        );
    }
}

export default injectIntl(mouseTrap(Reviews))
