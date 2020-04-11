import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(null);
    const { onChangeDate } = props;

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date);
        let isDate = (date.toString() !== 'Invalid Date') ? true : false;
        if (isDate) onChangeDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableFuture
                    margin="normal"
                    label={props.titre}
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
