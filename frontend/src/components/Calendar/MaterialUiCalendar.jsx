import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";

export default function MaterialUiCalendar({
  selectedDateAndTime,
  setSelectedDateAndTime
}) {

  const handleDateUpdate = (date) => {
    const dateFormat = date.toString();
    setSelectedDateAndTime(dateFormat);
  };

  return (
    <div className="calendar-wrapper">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            id="date-picker"
            label="Date Time Picker"
            value={selectedDateAndTime}
            onChange={handleDateUpdate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            ampm={false}
          />
      </MuiPickersUtilsProvider>
    </div>
  );
}
