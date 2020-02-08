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

    // this.activityData = null;
  }

  showUserFirstName() {
    let names = this.name.split(' ');
    return names[0];
  }

  findAllData(dataRepo) {
    this.findUserData(this.id, dataRepo, 'hydrationData');
    this.findUserData(this.id, dataRepo, 'sleepData');

    // findUserData(this.id, dataRepo, 'activityData');
  }

  findUserData(usersId, dataRepo, dataType) {
    let data = dataRepo[dataType].filter(data => data.userID === usersId);
    this[dataType] = data;
  }

  getDataSetByDate(year, month, day, dataProperty) {
    let monthUnder10 = (month < 10) ? 0 : '';
    let dayUnder10 = (day < 10) ? 0 : '';
    let dataset = dataProperty.find(data => data.date === `${year}/${monthUnder10}${month}/${dayUnder10}${day}`);
    return dataset;
  }

  //---------------------------------Hydration---------------------------------

  avgFluidConsumed(avgOf) {
    let total = avgOf.reduce((total, flOz) => {
                  total += flOz.numOunces;
                  return total;
                }, 0);
    return Math.trunc(total / avgOf.length);
  }

  fluidConsumedByDay(year, month, day) {
    let dataset = this.getDataSetByDate(year, month, day, this.hydrationData);
    return dataset.numOunces;
  }

  fluidConsumedPerWeek(year, month, day) {
    let dataset = this.getDataSetByDate(year, month, day, this.hydrationData);
    let endDay = this.hydrationData.indexOf(dataset);
    let week = this.hydrationData.slice(endDay - 6, endDay + 1);
    return week.map(day => {
      let newValue = {date: day.date, numOunces: day.numOunces};
      return newValue;
    });
  }

  //---------------------------------Sleep--------------------------------------
  //avgSleep(user.sleepData, 'hoursSlept'); for avg sleep in hrs all time
  //avgSleep(dataset, 'sleepQuality'); for avg sleep quality all time
  avgSleep(dataset, dataType) {
    let total = dataset.reduce((acc, currentValue) => {
                  acc += currentValue[dataType];
                  return total;
                }, 0);
    return parseInt((total / dataset.length).toFixed(1));
  }

  //for both amount slept per day & sleep quality per day
  sleepStatByDay(year, month, day, dataType) {
    let dataset = this.getDataSetByDate(year, month, day, this.sleepData);
    return dataset[dataType];
  }

  // fluidConsumedPerWeek(year, month, day) {
  //   let dataset = this.getDataSetByDate(year, month, day, this.hydrationData);
  //   let endDay = this.hydrationData.indexOf(dataset);
  //   let week = this.hydrationData.slice(endDay - 6, endDay + 1);
  //   return week.map(day => {
  //     let newValue = {date: day.date, numOunces: day.numOunces};
  //     return newValue;
  //   });
  // }

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
