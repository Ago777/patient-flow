import React, {Component, Fragment} from "react";
import {injectIntl} from 'react-intl';
import {
  Row,
  Card,
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  UncontrolledDropdown,
  Collapse,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  CardBody,
  CardSubtitle,
  CardImg,
  Label,
  CardText,
  Badge
} from "reactstrap";
import {NavLink} from "react-router-dom";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import classnames from "classnames";

import IntlMessages from "Util/IntlMessages";
import {Colxx, Separator} from "Components/CustomBootstrap";
import {BreadcrumbItems} from "Components/BreadcrumbContainer";

import Pagination from "Components/List/Pagination";
import mouseTrap from "react-mousetrap";

import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";

function collect(props) {
  return {data: props.data};
}

const apiUrl = "http://api.crealeaf.com/cakes/paging"
import axios from 'axios';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.toggleDisplayOptions = this.toggleDisplayOptions.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.dataListRender = this.dataListRender.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.onContextMenuClick = this.onContextMenuClick.bind(this);

    this.state = {
      displayMode: "thumblist",
      pageSizes: [8, 12, 24],
      selectedPageSize: 8,
      categories: [
        {label: 'Cakes', value: 'Cakes', key: 0},
        {label: 'Cupcakes', value: 'Cupcakes', key: 1},
        {label: 'Desserts', value: 'Desserts', key: 2},
      ],
      orderOptions: [
        {column: "title", label: "Product Name"},
        {column: "category", label: "Category"},
        {column: "status", label: "Status"}
      ],
      selectedOrderOption: {column: "title", label: "Product Name"},
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      displayOptionsIsOpen: false,
      isLoading: false
    };
  }

  componentWillMount() {
    this.props.bindShortcut(["ctrl+a", "command+a"], () =>
       this.handleChangeSelectAll(false)
    );
    this.props.bindShortcut(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  toggleDisplayOptions() {
    this.setState({displayOptionsIsOpen: !this.state.displayOptionsIsOpen});
  }

  toggleSplit() {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  changeOrderBy(column) {
    this.setState(
       {
         selectedOrderOption: this.state.orderOptions.find(
            x => x.column === column
         )
       },
       () => this.dataListRender()
    );
  }

  changePageSize(size) {
    this.setState(
       {
         selectedPageSize: size,
         currentPage: 1
       },
       () => this.dataListRender()
    );
  }

  changeDisplayMode(mode) {
    this.setState({
      displayMode: mode
    });
    return false;
  }

  onChangePage(page) {
    this.setState(
       {
         currentPage: page
       },
       () => this.dataListRender()
    );
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.setState(
         {
           search: e.target.value.toLowerCase()
         },
         () => this.dataListRender()
      );
    }
  }

  // handleCheckChange(event, id) {
  //   if (
  //      event.target.tagName == "A" ||
  //      (event.target.parentElement &&
  //         event.target.parentElement.tagName == "A")
  //   ) {
  //     return true;
  //   }
  //   if (this.state.lastChecked == null) {
  //     this.setState({
  //       lastChecked: id
  //     });
  //   }
  //
  //   let selectedItems = this.state.selectedItems;
  //   if (selectedItems.includes(id)) {
  //     selectedItems = selectedItems.filter(x => x !== id);
  //   } else {
  //     selectedItems.push(id);
  //   }
  //   this.setState({
  //     selectedItems
  //   });
  //
  //   if (event.shiftKey) {
  //     var items = this.state.items;
  //     var start = this.getIndex(id, items, "id");
  //     var end = this.getIndex(this.state.lastChecked, items, "id");
  //     items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
  //     selectedItems.push(
  //        ...items.map(item => {
  //          return item.id;
  //        })
  //     );
  //     selectedItems = Array.from(new Set(selectedItems));
  //     this.setState({
  //       selectedItems
  //     });
  //   }
  //   document.activeElement.blur();
  // }

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  handleChangeSelectAll(isToggle) {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x.id)
      });
    }
    document.activeElement.blur();
    return false;
  }

  componentDidMount() {
    this.dataListRender();
  }

  dataListRender() {

    const {selectedPageSize, currentPage, selectedOrderOption, search} = this.state;
    axios.get(`${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`)
       .then(res => {
         return res.data
       }).then(data => {
      this.setState({
        totalPage: data.totalPage,
        items: data.data,
        selectedItems: [],
        totalItemCount: data.totalItem,
        isLoading: true
      });
    })
  }

  onContextMenuClick = (e, data, target) => {
    console.log("onContextMenuClick - selected items", this.state.selectedItems)
    console.log("onContextMenuClick - action : ", data.action);
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId]
      });
    }

    return true;
  };

  render() {
    const startIndex = (this.state.currentPage - 1) * this.state.selectedPageSize
    const endIndex = (this.state.currentPage) * this.state.selectedPageSize
    const {messages} = this.props.intl;
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
                         <ContextMenuTrigger
                            id="menu_id"
                            data={product.id}
                            collect={collect}
                         >
                           <Card
                              onClick={event =>
                                 this.handleCheckChange(event, product.id)
                              }
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
                                 <p className="mb-1 text-muted text-small truncate w-25 w-sm-100 small-txt-xxs">
                                   Transformologie
                                 </p>
                                 <p className="mb-1 text-muted text-small truncate w-25 w-sm-100 small-txt-xxs">
                                   Medical
                                 </p>
                                 <p className="mb-1 text-muted text-small truncate w-20 w-sm-100 hide-xxs">
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
