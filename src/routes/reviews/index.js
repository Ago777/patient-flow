import React, {Component, Fragment} from "react";
import {injectIntl} from 'react-intl';
import {
    Row,
    Card,
    Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledTooltip
} from "reactstrap";
import {NavLink} from "react-router-dom";
import classnames from "classnames";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {BreadcrumbItems} from "Components/BreadcrumbContainer";
import Pagination from "Components/List/Pagination";
import mouseTrap from "react-mousetrap";
import {ContextMenuTrigger} from "react-contextmenu";
import moment from "moment";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getReviews, sortBy} from "Redux/actions";

const commentLength = 200;

class Reviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reviewComments: {},
            selectedOrderOption: {column: "title", label: "Rating"},
            orderOptions: [
                {column: "rating", label: "Rating"},
                {column: "date", label: "Date"},
            ],
        };
    }

    componentWillMount() {
        this.props.getReviews();
    };

    componentDidUpdate(prevprops) {
        if (prevprops.isLoading !== this.props.isLoading && !this.props.error) {
            let {props: {reviews}, state: {reviewComments}} = this;
            reviews.forEach(review => {
                reviewComments[review['id']] = {
                    isShowAllComment: false,
                    showBtnTxt: 'Show more',
                    comment: review['content'].substring(0, commentLength),
                    fullComment: review['content']
                }
            })
            this.setState({reviewComments});
        }
    }

    toggleComment = (id) => {
        const {state: {reviewComments}} = this;
        const isShowAllComment = reviewComments[id]['isShowAllComment'];
        const fullComment = reviewComments[id]['fullComment'];
        reviewComments[id] = {
            isShowAllComment: !isShowAllComment,
            showBtnTxt: !isShowAllComment ? 'Show less' : 'Show more',
            comment: !isShowAllComment ? fullComment.substring(0) : fullComment.substring(0, commentLength),
            fullComment: fullComment
        };
        this.setState({reviewComments});
    };

    changeSortBy = (column) => {
        this.setState(
          {
              selectedOrderOption: this.state.orderOptions.find(
                x => x.column === column
              )
          },
        );
        this.props.sortBy(column);

    };

    getAverageRating = (reviewsStarts, reviewsCount) => {
        const reviewStarsLength = reviewsStarts.length;
        let sumOfStars = 0;
        for (let i = 0; i < reviewStarsLength; i++) {
            sumOfStars += reviewsStarts[i]['id'] * reviewsStarts[i]['value'];
        }
        ;
        return parseInt((sumOfStars / reviewsCount).toFixed(1));
    }

    render() {
        const {
            props: {
                error,
                isLoading,
                reviewsStarts,
                reviews
            },
            state: {
                reviewComments
            }
        } = this;
        if (isLoading) return <div className="loading"></div>;
        if (error) return <h1>{error}</h1>;
        const reviewsCount = reviewsStarts.reduce((accumulator, currentValue) => accumulator + currentValue['value'], 0);
        const averageRating = this.getAverageRating(reviewsStarts, reviewsCount);

        return (
          <Fragment>
              <Row className='review'>
                  <Colxx xxs="12">
                      <div className="mb-5">
                          <span className='page-header'>Reviews</span>
                          <div className="float-sm-right d-flex align-items-center response">
                              <span className='items-count' onClick={this.x}>{reviewsCount} reviews</span>
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
              <Row className='review'>
                  <Colxx xxs="12" className="mb-3">
                      <ContextMenuTrigger id="menu_id">
                          <Card className="d-flex flex-row">
                              <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                  <div
                                    className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                      <div className='w-30 w-sm-100 m-xxs m-sm'>
                                          <p className="mb-4">
                                              <span className='rating-txt'>Average Rating</span>
                                          </p>
                                          <p className='mb-0 d-flex'>
                                              <span>
                                                  <span className='rating-num'>{averageRating}</span>
                                                  <span className='rating-num-small'>/5</span>
                                              </span>
                                              <span className='stars'>
                                                  {
                                                      reviewsStarts.map((stars, i) =>
                                                        (
                                                          <i key={stars['id']}
                                                             className={`material-icons ${(i < averageRating - 0.5) ? 'fill' : ''}`}>grade</i>
                                                        )
                                                      )
                                                  }
                                              </span>
                                          </p>
                                      </div>
                                      <div className='w-20 w-sm-100 m-xxs m-sm'>
                                          <p className="mb-4 no-m">
                                              <span className='rating-txt'>Total Reviews</span>
                                          </p>
                                          <p className="mb-0">
                                              <span className='rating-num'>{reviewsCount}</span>
                                          </p>
                                      </div>
                                      <div className='w-40 w-sm-100'>
                                          {
                                              reviewsStarts.map((stars, i) =>
                                                (
                                                  <div className='d-flex align-items-center mb-2' key={stars['id']}>
                                                      <div className='d-flex'>
                                                        <span className='stars small d-flex align-items-center'>
                                                            {
                                                                reviewsStarts.map((currentStars, i) =>
                                                                  (
                                                                    <i
                                                                      key={stars['id']+i} className={`material-icons ${(i < stars['id']) ? 'fill' : ''}`}>grade</i>
                                                                  )
                                                                )
                                                            }
                                                        </span>
                                                          <span className='rev-count'>{stars['value']}</span>
                                                      </div>
                                                      <div className='line-wrapper'>
                                                          <div className='line'
                                                               style={{width: `${(100 * stars['value']) / reviewsCount}%`}}/>
                                                      </div>
                                                  </div>
                                                )
                                              ).reverse()
                                          }
                                      </div>
                                  </div>
                              </div>
                          </Card>
                      </ContextMenuTrigger>
                  </Colxx>
                  {
                      reviews.map(review => {
                          return (
                            <Colxx xxs="12" key={review['id']} className="mb-3">
                                <ContextMenuTrigger id="menu_id">
                                    <Card className="d-flex flex-row">
                                        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                            <div className="card-body flex-column  min-width-zero">
                                                <div className='d-flex align-items-center mb-2'>
                                                    <span className='mr-2'>
                                                        <img
                                                          src={review['imgUrl'] ? review['imgUrl'] : '/assets/img/unknown-profile.png'}
                                                          alt='img'
                                                          className='img'/>
                                                    </span>
                                                    <span className='mr-2 name'>{review['authorName']}</span>
                                                    <span className='mr-3 stars small'>
                                                        {
                                                            review['rating'] && reviewsStarts.map((stars, i) =>
                                                              (
                                                                <i key={stars['id']}
                                                                   className={`material-icons ${(i < review['rating']) ? 'fill' : ''}`}>grade</i>
                                                              )
                                                            )
                                                        }
                                                    </span>
                                                </div>
                                                <div
                                                  className='d-flex align-items-center justify-content-between mb-2'>
                                                    <div className='comment w-85'>
                                                        <span className='txt'>
                                                              {reviewComments.hasOwnProperty(review['id']) ? reviewComments[review['id']]['comment'] : review['content'].substring(0, commentLength)}
                                                            {
                                                                review['content'].length > commentLength && (
                                                                  <span className='show-btn'
                                                                        onClick={() => this.toggleComment(review['id'])}>
                                                                     {reviewComments.hasOwnProperty(review['id']) ? reviewComments[review['id']]['showBtnTxt'] : 'Show more'}
                                                                   </span>
                                                                )
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className='reply-btn' id={`reply${review['id']}`}>
                                                        <i className="material-icons">
                                                            reply
                                                        </i>
                                                    </div>
                                                    <UncontrolledTooltip
                                                      placement="top"
                                                      innerClassName='reply-tooltip'
                                                      target={`reply${review['id']}`}>
                                                        Reply to this review
                                                    </UncontrolledTooltip>
                                                </div>
                                                <div className='under-txt d-flex align-items-center'>
                                                    <span>{moment(review['publisherDate']).format('LL')}</span>
                                                    <i className="material-icons ml-2 mr-2">
                                                        lens
                                                    </i>
                                                    <span>
                                                   <span>Source:</span>
                                                       <span className='source-txt'>{review['publisherId']}</span>
                                                   </span>
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
      },
      dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
