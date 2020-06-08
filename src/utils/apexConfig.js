

const bar = {

}

const circle = {

}

var date = new Date();
var day = 1000 * 60 * 60 * 24;
var mindateweek = date.getTime() - date.getDay() * day;
var maxdateweek = date.getTime() + (7 -  date.getDay()) * day;
var maxdateday = new Date();
maxdateday.setHours(23,59,59,999)
var mindateday = new Date();
mindateday.setHours(0,0,0,0)

export {
  bar,
  circle,
  mindateweek,
  maxdateweek,
  maxdateday,
  mindateday
}