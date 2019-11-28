
import { format } from 'date-fns'

export const getDayOfWeek = (x) => {

  var weekday = new Array(7);

  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';
  
  var day = weekday[x];

  return day;

};

export const formatTime = (x) => {

  var time = format(new Date(x), "HH:mm")

return time;

}

export const formatDate = (x) => {

  var date = format(new Date(x),"dd MMMM yyyy")

return date;

}
