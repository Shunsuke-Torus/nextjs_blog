import { parseISO, format } from 'date-fns';

type DateString ={
  dateString:string
}

export default function Date({ dateString }:DateString) {
  const date = parseISO(dateString); //parseISO converts the string value to a date object
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>; //format the date object in a specified way
}