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
    // this.sleepData = null;
    // this.activityData = null;
  }

  showUserFirstName() {
    let names = this.name.split(' ');
    return names[0];
  }

  findUserData(usersId, dataRepo, dataType) {
    let data = dataRepo[dataType].filter(data => data.userID === usersId);
    this[dataType] = data;
  }

  avgFluidConsumed(avgOf) {
    let total = avgOf.reduce((total, flOz) => {
                  total += flOz.numOunces;
                  return total;
                }, 0);
    return Math.trunc(total / avgOf.length);
  }

  getHydrationDataSetByDate(year, month, day) {
    let monthUnder10 = (month < 10) ? 0 : '';
    let dayUnder10 = (day < 10) ? 0 : '';
    let dataset = this.hydrationData.find(data => data.date === `${year}/${monthUnder10}${month}/${dayUnder10}${day}`);
    return dataset;
  }

  fluidConsumedByDay(year, month, day) {
    let dataset = this.getHydrationDataSetByDate(year, month, day);
    return dataset.numOunces;
  }

  fluidConsumedPerWeek(year, month, day) {
    let dataset = this.getHydrationDataSetByDate(year, month, day);
    let endDay = this.hydrationData.indexOf(dataset);
    let week = this.hydrationData.slice(endDay - 7, endDay );
    return week.map(day => {
      let newValue = {date: day.date, numOunces: day.numOunces};
      return newValue;
    });
  }

//For a user, how many fluid ounces they consumed
//for a specific day (identified by a date)
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
