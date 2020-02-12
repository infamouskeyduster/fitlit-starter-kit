if (typeof module !== 'undefined') {
  // const UserRepository = require('./user-repository');
  // const userRepository = new UserRepository();
}

class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
    this.hydrationData = null;
    this.sleepData = null;
    this.activityData = null;
  }

  showUserFirstName() {
    let names = this.name.split(' ');
    return names[0];
  }

  findAllData(dataRepo) {
    this.findUserData(this.id, dataRepo, 'hydrationData');
    this.findUserData(this.id, dataRepo, 'sleepData');
    this.findUserData(this.id, dataRepo, 'activityData');
  }

  findUserData(usersId, dataRepo, dataType) {
    let data = dataRepo[dataType].filter(data => data.userID === usersId);
    this[dataType] = data;
  }

  getDataSetByDate(year, month, day, dataProperty) {
    let monthUnder10 = (month < 10) ? 0 : '';
    let dayUnder10 = (day < 10) ? 0 : '';
    let dataset = this[dataProperty].find(data => data.date === `${year}/${monthUnder10}${month}/${dayUnder10}${day}`);
    return dataset;
  }

  getDataSetByWeek(year, month, day, dataProperty) {
    let dataset = this.getDataSetByDate(year, month, day, dataProperty);
    let endDay = this[dataProperty].indexOf(dataset);
    let week = this[dataProperty].slice(endDay - 6, endDay + 1);
    return week;
  };

  //---------------------------------Hydration---------------------------------

  avgFluidConsumed(avgOf) {
    let total = avgOf.reduce((total, flOz) => {
      total += flOz.numOunces;
      return total;
    }, 0);
    return Math.trunc(total / avgOf.length);
  }

  fluidConsumedByDay(year, month, day, hydrationData) {
    let dataset = this.getDataSetByDate(year, month, day, hydrationData);
    return dataset.numOunces;
  }

  fluidConsumedPerWeek(year, month, day) {
    let dataset = this.getDataSetByWeek(year, month, day, 'hydrationData');
    return dataset.map(day => {
      let newValue = {
        date: day.date,
        numOunces: day.numOunces
      };
      return newValue;
    });
  }

  //---------------------------------Sleep--------------------------------------
  //avgSleep(user.sleepData, 'hoursSlept'); for avg sleep in hrs all time
  //avgSleep(dataset, 'sleepQuality'); for avg sleep quality all time
  avgSleep(dataset, dataType) {
    let total = dataset.reduce((acc, currentValue) => {
      acc += currentValue[dataType];
      return acc;
    }, 0);
    return parseFloat((total / dataset.length).toFixed(1));
  }

  //for both amount slept per day & sleep quality per day
  sleepStatByDay(year, month, day, datasetProperty, dataType) {
    let dataset = this.getDataSetByDate(year, month, day, datasetProperty);
    return dataset[dataType];
  }

  sleepPerWeek(year, month, day) {
    let dataset = this.getDataSetByWeek(year, month, day, 'sleepData');
    return dataset.map(day => {
      let newValue = {
        date: day.date,
        hoursSlept: day.hoursSlept,
        sleepQuality: day.sleepQuality,
      };
      return newValue;
    });
  }
  //--------------------------Activity-------------
  calculateMiles(year, month, day, dataProperty) {
    let dataset = this.getDataSetByDate(year, month, day, dataProperty);
    let distance = parseFloat(((this.strideLength * dataset.numSteps) / 5280).toFixed(2));
    return distance;
  }

  showMinutesActiveDay(year, month, day, dataProperty) {
    let dataset = this.getDataSetByDate(year, month, day, dataProperty);
    return dataset.minutesActive;
  }

  showAvgMinutesActiveWeek(year, month, day, dataProperty) {
    let dataset = this.getDataSetByWeek(year, month, day, dataProperty);
    console.log(dataset);
    return Math.round(dataset.reduce((acc, currentValue) => {
      acc += currentValue.minutesActive
      return acc
    }, 0) / 7)
  }

  stepGoalAchieved(year, month, day, dataProperty) {
    let dataset = this.getDataSetByDate(year, month, day, dataProperty);
    return this.dailyStepGoal <= dataset.numSteps;
  }

  daysStepGoalAchieved() {
    let dataset = [...this.activityData];
    let daysAcheived = dataset.filter(day => day.numSteps >= this.dailyStepGoal);
    return daysAcheived.map(day => day.date);
  }

  showStairClimbingRecord() {
    let dataset = [...this.activityData];
    let stairNums = dataset.sort((a , b) => a.flightsOfStairs - b.flightsOfStairs);
    return stairNums[stairNums.length - 1].flightsOfStairs
  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
}

// User class
//
// new User(userData);
// A User represents a single user
// It should have a parameter to take in a userData object
// Each user holds on to the user properties from the data file
// Should have a method to:
// Return a user’s first name only
