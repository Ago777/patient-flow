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
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getListings} from "Redux/actions";

class Listings extends Component {

    componentWillMount() {
        this.props.getListings()
    }

    render() {
        const {
            props: {
                error,
                isLoading,
                count,
                listings,
                first_name
            },
        } = this;
        if (isLoading) return <div className="loading"></div>;
        if (error) return <h1>{error}</h1>;

        return (
          <Fragment>
              <div className="disable-text-selection">
                  <Row>
                      <Colxx xxs="12">
                          <div className="mb-5">
                              <span className='page-header'>Listings</span>
                              <div className="float-sm-right">
                                  <span className='items-count'>{count} listings</span>
                              </div>
                          </div>
                      </Colxx>
                  </Row>
                  <Row>
                      {/*<Colxx xxs="12 mb-2">*/}
                          {/*<div className='mb-1 d-flex align-items-center'>*/}
                              {/*<i className='material-icons'>local_hospital</i>*/}
                              {/*<span className='sub-header'>Medical (6) </span>*/}
                          {/*</div>*/}
                      {/*</Colxx>*/}
                      {
                          listings.slice(0, 20).map((listing, i) => {
                              return (
                                <Colxx xxs="12" key={`${listing['id']} ${i}` } className="mb-3 listings">
                                    <ContextMenuTrigger id="menu_id">
                                        <Card className="d-flex flex-row">
                                            <div
                                              className="d-flex"
                                            >
                                                <img
                                                  alt='img'
                                                  src='/assets/img/FL.jpg'
                                                  className="list-thumbnail responsive border-0"
                                                />
                                            </div>
                                            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                                <div
                                                  className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                                    <div className="w-30 w-sm-100">
                                                        <p className="list-item-heading mb-1 truncate">
                                                            {listing['publisherId']}
                                                        </p>
                                                    </div>
                                                    <p
                                                      className="mb-1 text-muted text-small truncate w-25 w-sm-100 small-txt-xxs">
                                                        {first_name}
                                                    </p>
                                                    <p
                                                      className="mb-1 text-muted text-small truncate w-25 w-sm-100 small-txt-xxs">
                                                        Medical
                                                    </p>
                                                    <div className="w-15 w-sm-100">
                                                        <Badge className={listing['status']}  pill>
                                                            {listing['status']}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="pl-1 align-self-center pr-4">
                                                    <NavLink
                                                      to='#'
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
      },
      dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
