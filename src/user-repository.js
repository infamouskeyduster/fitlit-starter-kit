class UserRepository {
  constructor(userData, hydrationData, sleepData) {
    this.users = userData;
    this.hydrationData = hydrationData;
    this.sleepData = sleepData;
  }

  findUser(userId) {
    return this.users.find(user => user.id === userId);
  }

  calculateStepGoalAverage() {
    let dailyStepGoals = this.users.map(user => user.dailyStepGoal);
    let total = dailyStepGoals.reduce((total, goal) => {
      total += goal;
      return total;
    }, 0);
    return Math.round(total / dailyStepGoals.length);
  }

  calcAverageSleepQualityAll() {
    let dailySleepQuality = this.sleepData.map(user => user.sleepQuality);
    let total = dailySleepQuality.reduce((totalRating, rating) => {
      totalRating += rating;
      return totalRating;
    }, 0);
    return parseFloat((total / dailySleepQuality.length).toFixed(1));
  }

  grabDataSet(year, month, day) {
    let allData = [];
    let monthUnder10 = (month < 10) ? '0' : '';
    let dayUnder10 = (day < 10) ? '0' : '';
    let date = `${year}/${monthUnder10}${month}/${dayUnder10}${day}`;
    this.users.forEach(user => {
      let dataset = this.sleepData.filter(el => el.userID === user.id);
      let startDate = dataset.find(day => day.date === date);
      let startDay = dataset.indexOf(startDate);
      allData.push(dataset.slice(startDay - 6, startDay + 1));
    });
    return allData;
  }

  findGoodSleepers(year, month, day) {
    let dataset = this.grabDataSet(year, month, day);
    dataset = dataset.map(data => {
      return data.reduce((acc, currentValue) => {
        acc.userID = currentValue.userID
        console.log(typeof currentValue.sleepQuality);
        let sleepQuality = (currentValue.sleepQuality / 7);
        acc.avgSleepQuality += Number(sleepQuality);
        return acc;
      }, {

        userID: 0,
        avgSleepQuality: 0,
      });
    });

    return dataset.filter(data => data.avgSleepQuality >= 3);
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}

//A UserRepository holds onto all of the User objects
// It should have a parameter to take in user data
// It should have methods to determine:
// Given a user’s ID, what is their user data?
// The average step goal amongst all users
