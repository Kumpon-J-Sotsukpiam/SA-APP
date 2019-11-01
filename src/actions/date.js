
import { format } from 'date-fns'

export const getDayOfWeek = (x) => {

    var weekday = new Array(7);
    
    weekday[0] = 'Monday';
    weekday[1] = 'Tuesday';
    weekday[2] = 'Wednesday';
    weekday[3] = 'Thursday';
    weekday[4] = 'Friday';
    weekday[5] = 'Saturday';
    weekday[6] = 'Sunday';
    
    var day = weekday[x];

    return day;

};

export const formatTime = (x) => {

  var time = format(new Date(x),"HH:mm")

  return time;

}


