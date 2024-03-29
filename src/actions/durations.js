export const calDurationsDate = (x,y) => {
    var DateStart = new Date(x);
    var DateEnd = new Date(y);
    var durations = (Math.floor((DateEnd-DateStart)/(1000*60*60*24)))+1;
    var month = 0;
    var week = 0;
    var day = 0;
    var totalMonth = 0;
    var totalWeek = 0;
    var totalDay = 0;
    var dayCal='';
    var weekCal='';
    var monthCal='';
  
    
    for(i = 0; i < durations; i++){

      if((totalMonth+=30)<=(durations)){
        month += 1;
        totalWeek = totalMonth;
        totalDay = totalMonth;
    }


      else if((totalWeek+=7)<=(durations)){
        week += 1;
        totalDay = totalWeek;
      } 

      else if((totalDay+=1) <= (durations)){
        day += 1;
      } 
      
    }

    if(month > 1){
      monthCal = month + ' Months';
    } else if(month === 1){
      monthCal = month + ' Month';
    } 

    if(week > 1){
      weekCal = week + ' Weeks';
    } else if(week === 1){
      weekCal = week + ' Week';
    } 

    if(day > 1){
      dayCal = day + ' Days';
    } else if(day === 1){
      dayCal = day + ' Day';
    }

    return monthCal+' '+weekCal+' '+dayCal;

    };

    export const calDurationsTime = (x,y) => {
      var TimeStart = new Date(x);
      var TimeEnd = new Date(y);
      var minsCal ='';
      var hoursCal ='';
  
      var diff =(TimeEnd.getTime() - TimeStart.getTime()) ;
      var hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      var mins = Math.floor(diff / (1000 * 60));
      diff -= mins * (1000 * 60);
  
      if(hours > 1){
        hoursCal = hours + ' hours';
      } else if(hours === 1){
        hoursCal = hours + ' hour';
      }

      if(mins > 1){
        minsCal = mins + ' minutes';
      } else if(mins === 1){
        minsCal = mins + ' minute';
      } 
  
  return hoursCal+' '+minsCal;
  
  };

  export const calDurationsSemesterLeft = (y) => {
    var DateCurent = new Date();
    var DateEnd = new Date(y);

    if(DateCurent > DateEnd){
      return 'end of Semesters'
    } else{

    var durations = (Math.floor((DateEnd-DateCurent)/(1000*60*60*24)))+1;
    var month = 0;
    var week = 0;
    var day = 0;
    var totalMonth = 0;
    var totalWeek = 0;
    var totalDay = 0;
    var dayCal='';
    var weekCal='';
    var monthCal='';
    
    for(i = 0; i < durations; i++){

      if((totalMonth+=30)<=(durations)){
        month += 1;
        totalWeek = totalMonth;
        totalDay = totalMonth;
      }

      else if((totalWeek+=7)<=(durations)){
        week += 1;
        totalDay = totalWeek;
      } 

      else if((totalDay+=1) <= (durations)){
        day += 1;
      } 
    }

    if(month > 1){
      monthCal = month + ' Months ';
    } else if(month === 1){
      monthCal = month + ' Month ';
    } 

    if(week > 1){
      weekCal = week + ' Weeks ';
    } else if(week === 1){
      weekCal = week + ' Week ';
    } 

    if(day > 1){
      dayCal = day + ' Days ';
    } else if(day === 1){
      dayCal = day + ' Day ';
    }

    return monthCal+weekCal+dayCal+'left';

  }

};

export const defaultDiff = (x,y) => {
  var TimeStart = new Date(x);
  var TimeEnd = new Date(y);


  var diff = TimeEnd.getTime() - TimeStart.getTime();
  var hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
  diff -= hours * (1000 * 60 * 60);
  var mins = Math.floor(diff / (1000 * 60)).toString().padStart(2, '0');
  diff -= mins * (1000 * 60);
  var sec = Math.floor((diff / (1000 * 60)) / 1000).toString().padStart(2, '0')
  diff -= sec * (1000 * 60);
return hours+':'+mins+':'+sec;

};

export const calDiffCount = (x,y) => {

  var startTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),new Date(x).getHours(),new Date(x).getMinutes(),new Date(x).getSeconds())
  var endTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),new Date(y).getHours(),new Date(y).getMinutes(),new Date(y).getSeconds())
  var currentTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),new Date().getHours(),new Date().getMinutes(),new Date().getSeconds())
  var diff =''

  if(startTime < currentTime && endTime > currentTime){
    diff = endTime - currentTime
  } else if (startTime < currentTime){
    diff = endTime - currentTime
  } else {
    console.log('error')
  }

  var hours = Math.floor(diff / (1000 * 60 * 60))
  diff -= hours * (1000 * 60 * 60);
  var mins = Math.floor(diff / (1000 * 60))
  diff -= mins * (1000 * 60);
  var sec = Math.floor((diff / (1000 * 60)) / 1000)
  diff -= sec * (1000 * 60);

  var d = hours * 60 * 60 + mins * 60 + sec;

return d;

};
