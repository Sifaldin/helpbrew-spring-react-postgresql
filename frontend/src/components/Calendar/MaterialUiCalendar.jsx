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

export default function MaterialUiCalendar() {
  const now = new Date();

  console.log(now);

  const [selectedDate, setSelectedDate] = useState(now);
  const [selectedTime, setSelectedTime] = useState(now);

  const handleDateUpdate = (date) => {
    setSelectedDate(date);
  };

  const handleTimeUpdate = (time) => {
    setSelectedTime(time);
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
            value={selectedDate}
            onChange={handleDateUpdate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />

          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="24 hours"
            value={selectedTime}
            onChange={handleTimeUpdate}
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
