/* Your Code Here */
//A 4-element Array of a String, String, String, and Number corresponding to a first name, family name, title, and pay rate per hour
// returns an object
function createEmployeeRecord(arr) {
  let employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
}
//function argument arrOfEmployees is an array of arrays
//returns an array of objects
//Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(arrOfEmployees) {
  let employees = [];
  for (let i = 0; i < arrOfEmployees.length; i++) {
    employees.push(createEmployeeRecord(arrOfEmployees[i]));
  }
  return employees;
}

//------------------

function createTimeInEvent(dateStamp) {
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(-4), 10),
    date: dateStamp.slice(0, 10),
  });
  return this;
}
//--------------------
function createTimeOutEvent(dateStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(-4), 10),
    date: dateStamp.slice(0, 10),
  });
  return this;
}
//function argument employee is an object and date is of the form "YYYY-MM-DD"
//returns the hours worked on date as an integer.
function hoursWorkedOnDate(specificDate) {
  let hours = 0;
  for (let i = 0; i < this.timeInEvents.length; i++) {
    if (this.timeInEvents[i].date === specificDate) {
      hours += this.timeOutEvents[i].hour - this.timeInEvents[i].hour;
    }
  }
  return hours / 100;
}

//function argument employee is an object and specificDate is of the form "YYYY-MM-DD"
//returns the pay earned on date as a number by multiplying the hoursWorkedOnDate by the payPerHour.
function wagesEarnedOnDate(specificDate) {
  let hoursWorked = hoursWorkedOnDate.call(this, specificDate);
  return hoursWorked * this.payPerHour;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });
  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!
  return payable;
};

//-----------------------
//arrEmployeeRecords is an array of employee records and firstName: String representing a first name held in an employee record
// Returns the employee record with the given first name.
//Test the firstName field for a match with the firstName argument
function findEmployeeByFirstName(arrEmployeeRecords, firstName) {
  for (let i = 0; i < arrEmployeeRecords.length; i++) {
    if (arrEmployeeRecords[i].firstName === firstName) {
      return arrEmployeeRecords[i];
    }
  }
  return null;
}
//-------------------------
//parameter  is an array of employee records
//returns Sum of pay owed to all employees for all dates, as a number
//Using allWagesFor for each of the employees, accumulate the value of all dates worked
//by the employee in the record used as context. Amount should be returned as a number.
function calculatePayroll(arrEmployeeRecords) {
  let payroll = 0;
  for (let i = 0; i < arrEmployeeRecords.length; i++) {
    payroll += allWagesFor.call(arrEmployeeRecords[i]);
  }
  return payroll;
}
