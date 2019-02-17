import React from "react";
import moment from "moment";

export const CalendarToolbar = ({addHandler}) => (toolbar) => {
    const goToBack = () => {
        toolbar.onNavigate("PREV");
    };
    const goToNext = () => {
        toolbar.onNavigate("NEXT");
    };

    const label = () => {
        const date = moment(toolbar.date);
        return (
          <span>
          <span>{date.format("MMM Do, YYYY")} -</span>
          <span> {date.add(6, 'days').format("MMM Do, YYYY")}</span>
        </span>
        );
    };

    return (
      <div className="big-calendar-header mt-3 mb-3 d-flex align-items-center justify-content-between">
          <div className="float-left">
              <button className="calendar-move-btn mr-3" onClick={goToBack}>
                  <span className="simple-icon-arrow-left"/>
              </button>
              <label className='d-inline-flex align-items-center mb-0'>
                  <i className='material-icons calendar-icon mr-2'>calendar_today</i>
                  {label()}
              </label>
              <button className="calendar-move-btn ml-3" onClick={goToNext}>
                  <span className="simple-icon-arrow-right"/>
              </button>
          </div>
          <div className="float-right">
              <div className='calendar'>
                  <button className="add-btn btn-lg" onClick={addHandler}>
                      Add Appointment
                  </button>
              </div>
          </div>
      </div>
    );
};
  