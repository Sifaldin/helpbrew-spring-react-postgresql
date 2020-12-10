import React, { useState } from "react";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { date } from "date-fns/locale/af";

export default function MaterialUiCalendar({
  selectedDateAndTime,
  setSelectedDateAndTime
}) {
  
  const handleDateUpdate = (date) => {
    setSelectedDateAndTime(date);
  };

  return (
    <div className="calendar-wrapper">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            id="date-picker"
            label="Date Picker"
            value={selectedDateAndTime}
            onChange={handleDateUpdate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />

          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="24 hours"
            value={selectedDateAndTime}
            onChange={handleDateUpdate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            ampm={false}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}
