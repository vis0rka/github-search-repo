import React from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DatepickerProps extends ReactDatePickerProps<'', true> {}

export const RootDatepicker: React.FC<DatepickerProps> = props => {
    return <DatePicker {...props} />
}
