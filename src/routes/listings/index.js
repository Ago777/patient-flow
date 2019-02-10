import React, {Component, Fragment} from "react";
import {injectIntl} from 'react-intl';
import {Row, Card, Badge} from "reactstrap";
import {NavLink} from "react-router-dom";
import classnames from "classnames";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {BreadcrumbItems} from "Components/BreadcrumbContainer";
import Pagination from "Components/List/Pagination";
import mouseTrap from "react-mousetrap";
import {ContextMenuTrigger} from "react-contextmenu";
const apiUrl = "http://api.crealeaf.com/cakes/paging"
import axios from 'axios';

class Listings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPageSize: 8,
            selectedOrderOption: {column: "title", label: "Product Name"},
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

    render() {
        return (
          !this.state.isLoading ?
            <div className="loading"></div>
            :
            <Fragment>
                <div className="disable-text-selection">
                    <Row>
                        <Colxx xxs="12">
                            <div className="mb-5">
                                <span className='page-header'>Listings</span>
                                <div className="float-sm-right">
                                    <span className='items-count'>8 listings</span>
                                </div>
                            </div>
                        </Colxx>
                    </Row>
                    <Row>
                        <Colxx xxs="12 mb-2">
                            <div className='mb-1 d-flex align-items-center'>
                                <i className='material-icons'>local_hospital</i>
                                <span className='sub-header'>Medical (6) </span>
                            </div>
                        </Colxx>
                        {
                            this.state.items.map(product => {
                                return (
                                  <Colxx xxs="12" key={product.id} className="mb-3">
                                      <ContextMenuTrigger id="menu_id">
                                          <Card
                                            className={classnames("d-flex flex-row", {
                                                active: this.state.selectedItems.includes(
                                                  product.id
                                                )
                                            })}
                                          >
                                              <NavLink
                                                to={`?p=${product.id}`}
                                                className="d-flex"
                                              >
                                                  <img
                                                    alt={product.title}
                                                    src='/assets/img/FL.jpg'
                                                    className="list-thumbnail responsive border-0"
                                                  />
                                              </NavLink>
                                              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                                  <div
                                                    className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                                      <NavLink
                                                        to={`?p=${product.id}`}
                                                        className="w-30 w-sm-100"
                                                      >
                                                          <p className="list-item-heading mb-1 truncate">
                                                              2findlocal
                                                          </p>
                                                      </NavLink>
                                                      <p
                                                        className="mb-1 text-muted text-small truncate w-25 w-sm-100 small-txt-xxs">
                                                          Transformologie
                                                      </p>
                                                      <p
                                                        className="mb-1 text-muted text-small truncate w-25 w-sm-100 small-txt-xxs">
                                                          Medical
                                                      </p>
                                                      <p
                                                        className="mb-1 text-muted text-small truncate w-20 w-sm-100 hide-xxs">
                                                          314.555.6666
                                                      </p>
                                                      <div className="w-15 w-sm-100">
                                                          <Badge color={product.statusColor} pill>
                                                              {product.status}
                                                          </Badge>
                                                      </div>
                                                  </div>
                                                  <div className="pl-1 align-self-center pr-4">
                                                      <NavLink
                                                        to={`?p=${product.id}`}
                                                        className="review"
                                                      >
                                                          <p className="review-btn mb-0 text-muted text-small">
                                                              <span className='hide-view-txt'>View Listing</span>
                                                              <i className="material-icons hide">launch</i>
                                                          </p>
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
                    <Pagination
                      currentPage={this.state.currentPage}
                      totalPage={this.state.totalPage}
                      onChangePage={i => this.onChangePage(i)}
                    />
                </div>
            </Fragment>
        );
    }
}

export default injectIntl(mouseTrap(Listings))
