var facultyList = new Array(12);
facultyList[0] = 'School of Business';
facultyList[1] = 'School of School of Accountancy';
facultyList[2] = 'School of Economics';
facultyList[3] = 'School of Humanities and Applied Arts';
facultyList[4] = 'School of Science and Technology';
facultyList[5] = 'School of Communication of Arts';
facultyList[6] = 'School of Engineering';
facultyList[7] = 'School of ';
facultyList[8] = 'School of School of Tourism and Services';
facultyList[9] = 'School of ';
facultyList[10] = 'School of ';
facultyList[12] = 'School of ';



var science = new Array(9);
science[0] = 'Computer Science';
science[1] = 'Food Business Management';
science[2] = 'Food Science and Technology';
science[3] = 'Financial Engineering';
science[4] = 'Computer Animation';
science[5] = 'Information and Communication Technology';
science[6] = 'Digital Technology';
science[7] = 'Food Innovation';
science[8] = 'Interdisciplinary Studies';




export const getFaculty = (x) => {

var result = x.length;
var charAtfaculty =''

if(result == 10){
    charAtfaculty = x.charAt(2)+x.charAt(3)
} else if(result == 13 ) {
    charAtfaculty = x.charAt(3)+x.charAt(4)
}

var faculty = facultyList[charAtfaculty-1];

    return faculty;
};


export const getMajor = (x) => {

  var result = x.length;
  var major ='';
  var charAt ='';

  if(result == 10){
    charAtfaculty = x.charAt(2)+x.charAt(3)
    charAtmajor = x.charAt(4)

    if(charAtfaculty == 5){
      major = science[charAtmajor-1]
  }


  } else if(result == 13 ) {
    charAtfaculty = x.charAt(3)+x.charAt(4)
    charAtmajor = x.charAt(9)

    if(charAtfaculty == 5){
      major = science[charAtmajor-1]
    }
  }


  
    return major;
  };





