import React, {Component, Fragment} from "react";
import {
    Row,
    Card,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {BreadcrumbItems} from "Components/BreadcrumbContainer";
import {ContextMenuTrigger} from "react-contextmenu";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getReviews, sortBy, logoutUser} from "Redux/actions";
import {NavLink} from "react-router-dom";

class Reviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
              <h1>Can't Find Phone Leads, Please Sign In Again</h1>
              <NavLink onClick={() => this.props.logoutUser(this.props.history)} to='/login' className='link-sign-in'>
                  Sign In
              </NavLink>
          </div>
        );

        return (
          <Fragment>
              <Row className='phone-leads'>
                  <Colxx xxs="12">
                      <div className="mb-5">
                          <span className='page-header'>Phone Leads</span>
                          <div className="float-sm-right d-flex align-items-center response">
                              <span className='items-count'>1830 phone leads</span>
                              <UncontrolledDropdown className="mr-1 mb-1">
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
              <Row className='phone-leads'>
                  {
                      reviews.map(review => {
                          return (
                            <Colxx xxs="12" key={review['id']} className="mb-3">
                                <ContextMenuTrigger id="menu_id">
                                    <Card className="d-flex flex-row">
                                        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                            <div className="card-body flex-column  min-width-zero">


                                                <div className='d-flex mb-3 justify-content-between align-items-start'>
                                                    <div>
                                                        <p className='mb-1 txt-head'>John Smith</p>
                                                        <p className='txt mb-0'>555.555.5555</p>
                                                    </div>
                                                    <div className='patient-status  d-flex align-items-center'>
                                                        <i className="material-icons mr-2"> lens</i>
                                                        <span>New Patient</span>
                                                    </div>
                                                </div>


                                                <div className='d-flex justify-content-between align-items-start'>
                                                    <div
                                                      className='d-flex w-50 w-sm-100 flex-column flex-md-row min-width-zero'>
                                                        <div className='w-100 resp'>
                                                            <p className='mb-1 txt under  d-flex align-items-center'>
                                                                <i className="material-icons mr-2">language</i>
                                                                <span>Website</span>
                                                            </p>
                                                            <p className='mb-0 txt under  d-flex align-items-center'>
                                                                <i className="material-icons mr-2">location_on</i>
                                                                <span>Transformologie</span>
                                                            </p>
                                                        </div>
                                                        <div className='w-100'>
                                                            <p className='mb-1 txt under  d-flex align-items-center'>
                                                                <i className="material-icons mr-2 weight">query_builder</i>
                                                                <span>Received Jul 13, 2018</span>
                                                            </p>
                                                            <p className='mb-0 txt under  d-flex align-items-center'>
                                                                <i className="material-icons mr-2 weight">settings_voice</i>
                                                                <span>00:05:35</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='w-25 d-flex justify-content-end'>
                                                        <div className='phone-btn'>
                                                            <i className="material-icons">move_to_inbox</i>
                                                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
