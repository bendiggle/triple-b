import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const AddDate = ({ setFieldValue, values }) => {
  console.log(values);
  console.log('MEOW');
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="select-date"
            label="Select date"
            value={values && values.date ? values.date : new Date()}
            onChange={value => {
              setFieldValue({
                ...values,
                date: value
              })
            }}
          />
      </MuiPickersUtilsProvider>
    </div>
  )
};

export default AddDate;
