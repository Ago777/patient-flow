import React, {Component} from "react";
import {injectIntl} from 'react-intl';
import {
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    Input,
    Button
} from "reactstrap";
import IntlMessages from "Util/IntlMessages";

import PerfectScrollbar from "react-perfect-scrollbar";

import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {
    setContainerClassnames,
    clickOnMobileMenu,
    logoutUser,
    changeLocale
} from "Redux/actions";

import {menuHiddenBreakpoint, searchPath, localeOptions} from "Constants/defaultValues";

import notifications from "Data/topnav.notifications.json";

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInFullScreen: false,
            searchKeyword: ""
        };
    }

    handleChangeLocale = locale => {
        this.props.changeLocale(locale);
    };
    isInFullScreen = () => {
        return (
          (document.fullscreenElement && document.fullscreenElement !== null) ||
          (document.webkitFullscreenElement &&
            document.webkitFullscreenElement !== null) ||
          (document.mozFullScreenElement &&
            document.mozFullScreenElement !== null) ||
          (document.msFullscreenElement && document.msFullscreenElement !== null)
        );
    };
    handleSearchIconClick = e => {
        if (window.innerWidth < menuHiddenBreakpoint) {
            let elem = e.target;
            if (!e.target.classList.contains("search")) {
                if (e.target.parentElement.classList.contains("search")) {
                    elem = e.target.parentElement;
                } else if (
                  e.target.parentElement.parentElement.classList.contains("search")
                ) {
                    elem = e.target.parentElement.parentElement;
                }
            }

            if (elem.classList.contains("mobile-view")) {
                this.search();
                elem.classList.remove("mobile-view");
                this.removeEventsSearch();
            } else {
                elem.classList.add("mobile-view");
                this.addEventsSearch();
            }
        } else {
            this.search();
        }
    };

    addEventsSearch = () => {
        document.addEventListener("click", this.handleDocumentClickSearch, true);
    }

    removeEventsSearch = () => {
        document.removeEventListener("click", this.handleDocumentClickSearch, true);
    }

    handleDocumentClickSearch = (e) => {
        let isSearchClick = false;
        if (
          e.target &&
          e.target.classList &&
          (e.target.classList.contains("navbar") ||
            e.target.classList.contains("simple-icon-magnifier"))
        ) {
            isSearchClick = true;
            if (e.target.classList.contains("simple-icon-magnifier")) {
                this.search();
            }
        } else if (
          e.target.parentElement &&
          e.target.parentElement.classList &&
          e.target.parentElement.classList.contains("search")
        ) {
            isSearchClick = true;
        }

        if (!isSearchClick) {
            const input = document.querySelector(".mobile-view");
            if (input && input.classList) input.classList.remove("mobile-view");
            this.removeEventsSearch();
            this.setState({
                searchKeyword: ""
            });
        }
    }

    handleSearchInputChange = (e) => {
        this.setState({
            searchKeyword: e.target.value
        });
    }

    handleSearchInputKeyPress = (e) => {
        if (e.key === "Enter") {
            this.search();
        }
    }

    search = () => {
        this.props.history.push(searchPath + "/" + this.state.searchKeyword);
        this.setState({
            searchKeyword: ""
        });
    }

    toggleFullScreen = () => {
        const isInFullScreen = this.isInFullScreen();

        var docElm = document.documentElement;
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        this.setState({
            isInFullScreen: !isInFullScreen
        });
    };

    handleLogout = () => {
        this.props.logoutUser(this.props.history);
    };

    menuButtonClick = (e, menuClickCount, containerClassnames) => {
        e.preventDefault();

        setTimeout(() => {
            var event = document.createEvent("HTMLEvents");
            event.initEvent("resize", false, false);
            window.dispatchEvent(event);
        }, 350);
        this.props.setContainerClassnames(++menuClickCount, containerClassnames);
    }

    mobileMenuButtonClick = (e, containerClassnames) => {
        e.preventDefault();
        this.props.clickOnMobileMenu(containerClassnames);
    }

    render() {
        const {containerClassnames, menuClickCount, locale, first_name} = this.props;
        const {messages} = this.props.intl;
        return (
          <nav className="navbar fixed-top">
              <NavLink
                to="#"
                className="menu-button d-none d-md-block"
                onClick={e =>
                  this.menuButtonClick(e, menuClickCount, containerClassnames)
                }
              >
                  <svg
                    className="main"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 9 17"
                  >
                      <rect x="0.48" y="0.5" width="7" height="1"/>
                      <rect x="0.48" y="7.5" width="7" height="1"/>
                      <rect x="0.48" y="15.5" width="7" height="1"/>
                  </svg>
                  <svg
                    className="sub"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18 17"
                  >
                      <rect x="1.56" y="0.5" width="16" height="1"/>
                      <rect x="1.56" y="7.5" width="16" height="1"/>
                      <rect x="1.56" y="15.5" width="16" height="1"/>
                  </svg>
              </NavLink>
              <NavLink
                to="#"
                className="menu-button-mobile d-xs-block d-sm-block d-md-none"
                onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
                      <rect x="0.5" y="0.5" width="25" height="1"/>
                      <rect x="0.5" y="7.5" width="25" height="1"/>
                      <rect x="0.5" y="15.5" width="25" height="1"/>
                  </svg>
              </NavLink>

              <div className="search" data-search-path="/app/layouts/search">
                  <Input
                    name="searchKeyword"
                    id="searchKeyword"
                    placeholder={messages["menu.search"]}
                    value={this.state.searchKeyword}
                    onChange={e => this.handleSearchInputChange(e)}
                    onKeyPress={e => this.handleSearchInputKeyPress(e)}
                  />
                  <span
                    className="search-icon"
                    onClick={e => this.handleSearchIconClick(e)}
                  >
            <i className="simple-icon-magnifier"/>
          </span>
              </div>
              <a className="navbar-logo" href="/">
                  <span className='logo'/>
                  <div className='logo-text'>
                      <span className='logo-txt'>PATIENT</span>
                      <span className='logo-txt txt'>FLOW</span>
                  </div>
              </a>

              <div className="ml-auto">
                  <div className="header-icons d-inline-block align-middle">
                      <div className="position-relative d-inline-block">
                          <UncontrolledDropdown className="dropdown-menu-right">
                              <DropdownToggle
                                className="header-icon notificationButton"
                                color="empty"
                              >
                                  <i className="simple-icon-bell"/>
                                  <span className="dot"/>
                              </DropdownToggle>
                              <DropdownMenu
                                className="position-absolute mt-3 scroll"
                                right
                                id="notificationDropdown"
                              >
                                  <PerfectScrollbar
                                    option={{suppressScrollX: true, wheelPropagation: false}}
                                  >
                                      {notifications.data.map((n, index) => {
                                          return (
                                            <div
                                              key={index}
                                              className="d-flex flex-row mb-3 pb-3 border-bottom"
                                            >
                                                <a href="/app/reminders">
                                                    <img
                                                      src={n.image}
                                                      alt="Notification"
                                                      className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
                                                    />
                                                </a>
                                                <div className="pl-3 pr-2">
                                                    <a href="/app/reminders">
                                                        <p className="font-weight-medium mb-1">
                                                            {n.message}
                                                        </p>
                                                        <p className="text-muted mb-0 text-small">
                                                            {n.date}
                                                        </p>
                                                    </a>
                                                </div>
                                            </div>
                                          );
                                      })}
                                  </PerfectScrollbar>
                              </DropdownMenu>
                          </UncontrolledDropdown>
                      </div>

                      <button
                        className="header-icon btn btn-empty d-none d-sm-inline-block"
                        type="button"
                        id="fullScreenButton"
                        onClick={this.toggleFullScreen}
                      >
                          {this.state.isInFullScreen ? (
                            <i className="simple-icon-size-actual d-block"/>
                          ) : (
                            <i className="simple-icon-size-fullscreen d-block"/>
                          )}
                      </button>
                  </div>
                  <div className="user d-inline-block">
                      <UncontrolledDropdown className="dropdown-menu-right">
                          <DropdownToggle className="p-0" color="empty">
                              <span className="name mr-1">{first_name}</span>
                              <span>
                  <img alt="Profile" src="/assets/img/profile-pic-l.jpg"/>
                </span>
                          </DropdownToggle>
                          <DropdownMenu className="mt-3" right>
                              <DropdownItem>My Account</DropdownItem>
                              <DropdownItem>Settings</DropdownItem>
                              <DropdownItem divider/>
                              <DropdownItem onClick={() => this.handleLogout()}>
                                  Sign out
                              </DropdownItem>
                          </DropdownMenu>
                      </UncontrolledDropdown>
                  </div>
              </div>
          </nav>
        );
    }
}

const mapStateToProps = ({menu, settings, authUser}) => {
    const {containerClassnames, menuClickCount} = menu;
    const {locale} = settings;
    const {first_name} = authUser['user'];
    return {
        containerClassnames,
        menuClickCount,
        first_name,
        locale
    };
};
export default injectIntl(connect(mapStateToProps, {
    setContainerClassnames,
    clickOnMobileMenu,
    logoutUser,
    changeLocale
})(TopNav));
