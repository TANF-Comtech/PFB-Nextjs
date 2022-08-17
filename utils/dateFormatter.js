import { setDateSuffix } from '~/utils/setDateSuffix';

/**
 * dateFormatter()
 *
 * Desc: Takes an ISO 8601 date, and gives back an object:
 *
 *    unixTime, a Unix integer timestamp (milliseconds since 1970-01-01, ie 1546300800000)
 *    month, full name of month (ie, "July")
 *    day, string with date and suffix (ie, "5th", "13th")
 *    year, 4 digit representation of the year (ie, "2021")
 *
 * @param { string } ISOdate - expects ISO 8601 date
 */
export const dateFormatter = (ISOdate) => {
  // Parse date from ISO format
  const newDate = new Date(ISOdate);

  // Set up obj for results
  // using a lot of date methods, check this out if you're rusty on dates:
  // https://stackoverflow.com/questions/4321270/regarding-javascript-new-date-and-date-parse/66823255#66823255
  return {
    unixTime: Date.parse(newDate),
    month: newDate.toLocaleString('en-us', { month: 'long' }),
    day: setDateSuffix(newDate.getDate()),
    year: newDate.getFullYear(),
  };
};
