export const calDurationsDate = (x,y) => {
    var DateStarts = new Date(x);
    var DateEnds = new Date(y);
    var durations = (Math.floor((DateEnds-DateStarts)/(1000*60*60*24)))+1;
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
      var TimeStarts = new Date(x);
      var TimeEnds = new Date(y);
      var minsCal ='';
      var hoursCal ='';
  
      var diff =(TimeEnds.getTime() - TimeStarts.getTime()) ;
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