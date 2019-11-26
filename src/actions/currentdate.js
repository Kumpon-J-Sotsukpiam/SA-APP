export const currentDay = () => {
    
  var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

  var day = weekday[new Date().getDay()];

  return day;
}

export const currentDate = () => {
    
  var date = new Date().getDate();

  return date;
}

export const currentMonth = () => {
    
  var namemonth = new Array(12);
      namemonth[0] = "January";
      namemonth[1] = "February";
      namemonth[2] = "March";
      namemonth[3] = "April";
      namemonth[4] = "May";
      namemonth[5] = "June";
      namemonth[6] = "July";
      namemonth[7] = "August";
      namemonth[8] = "September";
      namemonth[9] = "October";
      namemonth[10] = "November";
      namemonth[11] = "December";
  var month = namemonth[new Date().getMonth()];

  return month;
}

export const currentYear = () => {
    
  var year = new Date().getFullYear();

  return year;
}