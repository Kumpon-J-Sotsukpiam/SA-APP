// const schoolList = 
// [{
//     "faculty":{
//         "id":"01",
//         "name":"School of Business",
//         "major":[{"id":"01","name":"Marketing"},
//                  {"id":"02","name":"International Business Management"},
//                  {"id":"03","name":"Finance"},
//                  {"id":"04","name":"Human Resource Management"},
//                  {"id":"05","name":"Management"},
//                  {"id":"06","name":"Industrial Management"},
//                  {"id":"07","name":"Hotel Management"},
//                  {"id":"08","name":"Tourism Management)"},
//                  {"id":"09","name":"Business Computer"},
//                  {"id":"10","name":"Logistics Management"},
//                  {"id":"11","name":"Entrepreneurship"},
//                  {"id":"11","name":"Bussiness Administration"},]
//         }

// },{
//     "faculty":{
//         "id":"02",
//         "name":"School of School of Accountancy",
//         "major":[{"id":"00","name":"Accountancy"},]
//         }
// },{
//     "faculty":{
//         "id":"03",
//         "name":"School of Economics",
//         "major":[{"id":"00","name":"Economics"}]
//         }
// },{
//     "faculty":{
//         "id":"04",
//         "name":"School of Humanities and Applied Arts",
//         "major":[{"id":"00","name":"English for Business Communication"},
//                  {"id":"01","name":"English for Business Communication"},
//                  {"id":"02","name":"English and Translation"},
//                  {"id":"03","name":"Thai Language for Communication"},
//                  {"id":"04","name":"Japanese"},
//                  {"id":"05","name":"Information Studies"},
//                  {"id":"06","name":"Chinese"},
//                  {"id":"07","name":"Performing Arts"},
//                  {"id":"08","name":"Tourism"},
//                  {"id":"09","name":"Korean"},
//                  {"id":"10","name":"Airline Business Management"},
//                  {"id":"11","name":"PConvention Exhibition and Event Management"},
//                  {"id":"12","name":"Chinese for Career"}]
//         }
// },{
//     "faculty":{
//         "id":"05",
//         "name":"School of Science and Technology",
//         "major":[{"id":"01","name":"Computer Science"},
//                  {"id":"02","name":"Food Business Management"},
//                  {"id":"03","name":"Food Science and Technology"},
//                  {"id":"04","name":"Financial Engineering"},
//                  {"id":"05","name":"Computer Animation"},
//                  {"id":"06","name":"Information and Communication Technology"},
//                  {"id":"07","name":"Digital Technology"},
//                  {"id":"08","name":"Food Innovation"},
//                  {"id":"09","name":"Interdisciplinary Studies"}]
//         }
// b
// },{
//     "faculty":{
//         "id":"06",
//         "name":"School of Communication of Arts",
//         "major":[{"id":"01","name":"Communication Arts"},]
//         }
// },{
//     "faculty":{
//         "id":"07",
//         "name":"School of Engineering'",
//         "major":[{"id":"01","name":"Electrical and Energy Engineering"},
//                  {"id":"02","name":"Computer Engineering and Artificial Intelligence"},
//                  {"id":"03","name":"Logistics Engineering"},
//                  {"id":"04","name":"Rail Business Innovation Engineering"},
//                  {"id":"05","name":"Automotion Innovation Engineering"},]
//         }
// },{
//     "faculty":{
//         "id":"08",
//         "name":"School of Law",
//         "major":[{"id":"00","name":"Law"}]
//         }
// }]

// export const getSchool = (x) => {

// var result = x.length;
// var find = ''

// if(result == 10){
//     charAtfaculty = x.charAt(2)+x.charAt(3)
//     charAtmajor = x.charAt(4)

//       schoolList.map(i => {
//         if(i.faculty.id == charAtfaculty){
//           faculty = i.faculty.name
//           majorList = i.faculty.major

//           majorList.map(j => {
//             var Id = parseInt(j.id,100)          
//             if(Id == charAtmajor){
//               major = j.name
//               find = {faculty:faculty,major:major}
//               }
//             })
//           }
//     })


// } else if(result == 13 ) {
//     charAtfaculty = x.charAt(3)+x.charAt(4)
//     charAtmajor = x.charAt(9)+x.charAt(10)

//     schoolList.map(i => {
//       if(i.faculty.id == charAtfaculty){
//         faculty = i.faculty.name
//         majorList = i.faculty.major

//         majorList.map(j => {
//           if(j.id == charAtmajor){
//             major = j.name
//             find = {faculty:faculty,major:major}
//             }
//           })
//         }
//   })
// }



//     return find
// };







const schoolList = {
  "01": {
    name: "School of Business",
    major: {
      "01": "Marketing",
      "02": "International Business Management",
      "03": "Finance",
      "04": "Human Resource Management",
      "05": "Management",
      "06": "Industrial Management",
      "07": "Hotel Management",
      "08": "Tourism Management",
      "09": "Business Computer",
      "10": "Logistics Management",
      "11": "Bussiness Administration"
    }
  }, "02": {
    name: "School of School of Accountancy",
    major: {
      "00": "Accountancy"
    }
  }, "03": {
    name: "School of Economics",
    major: {
      "00": "Economics"
    }
  }, "04": {
    name: "School of Humanities and Applied Arts",
    major: {
      "00": "English for Business Communication",
      "01": "English for Business Communication",
      "02": "English and Translation",
      "03": "Thai Language for Communication",
      "04": "Japanese",
      "05": "Information Studies",
      "06": "Chinese",
      "07": "Performing Arts",
      "08": "Tourism",
      "09": "Korean",
      "10": "Airline Business Management",
      "11": "PConvention Exhibition and Event Management",
      "12": "Chinese for Career"
    }
  }, "05": {
    name: "School of Science and Technology",
    major: {
      "01": "Computer Science",
      "02": "Food Business Management",
      "03": "Food Science and Technology",
      "04": "Financial Engineering",
      "05": "Computer Animation",
      "06": "Information and Communication Technology",
      "07": "Digital Technology",
      "08": "Food Innovation",
      "09": "Interdisciplinary Studies"
    }
  }, "06": {
    name: "School of Communication of Arts",
    major: { "01": "Communication Arts" }
  }, "07": {
    name: "School of Engineering",
    major: {
      "01": "Electrical and Energy Engineering",
      "02": "Computer Engineering and Artificial Intelligence",
      "03": "Logistics Engineering",
      "04": "Rail Business Innovation Engineering",
      "05": "Automotion Innovation Engineering"
    }
  }, "08": {
    name: "School of Law",
    major: {
      "00": "Law"
    }
  }
}
export const getSchool = x => {
  const length = x.length
  var charAtfaculty = null
  var charAtmajor = null
  if (length == 10) {
    charAtfaculty = x.charAt(2) + x.charAt(3)
    charAtmajor = "0" + x.charAt(4)
  } else if (length == 13) {
    charAtfaculty = x.charAt(3) + x.charAt(4)
    charAtmajor = x.charAt(9) + x.charAt(10)
  }
  console.log('===============X=====================');
  console.log(x);
  console.log(charAtfaculty);
  console.log(charAtmajor);
  console.log('====================================');
  unknown = 'unknows'
  faculty = unknown
  major = unknown
  if ((charAtfaculty != undefined && charAtfaculty != null) && (charAtmajor != undefined && charAtmajor != null)) {
    try {
      faculty = schoolList[charAtfaculty]['name']
      major = schoolList[charAtfaculty]['major'][charAtmajor]
    } catch (err) {
      console.log(err);
    }
  }
  return {
    faculty: faculty || unknown,
    major: major || unknown
  }
}
