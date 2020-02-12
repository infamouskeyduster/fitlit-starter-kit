class UserRepository {
  constructor(userData, hydrationData, sleepData, activityData) {
    this.users = userData;
    this.hydrationData = hydrationData;
    this.sleepData = sleepData;
    this.activityData = activityData;
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

  stringifyDate(year, month, day) {
    let monthUnder10 = (month < 10) ? '0' : '';
    let dayUnder10 = (day < 10) ? '0' : '';
    let date = `${year}/${monthUnder10}${month}/${dayUnder10}${day}`;
    return date;
  }

  grabDataSetByDay(year, month, day, dataProperty) {
    let allData = [];
    let date = this.stringifyDate(year, month, day);
    this.users.forEach(user => {
      let userData = this[dataProperty].find(data => data.date === date && data.userID === user.id);
      allData.push(userData);
    });
    return allData;
  }

  grabDataSetByWeek(year, month, day, dataProperty) {
    let allData = [];
    let date = this.stringifyDate(year, month, day);
    this.users.forEach(user => {
      let dataset = this[dataProperty].filter(el => el.userID === user.id);
      let startDate = dataset.find(day => day.date === date);
      let startDay = dataset.indexOf(startDate);
      allData.push(dataset.slice(startDay - 6, startDay + 1));
    });
    return allData;
  }

  findGoodSleepers(year, month, day) {
    let dataset = this.grabDataSetByWeek(year, month, day, 'sleepData');
    dataset = dataset.map(data => {
      return data.reduce((acc, currentValue) => {
        acc.userID = currentValue.userID;
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

  findUserWhoSleptMost(year, month, day) {
    let dataset = [...this.grabDataSetByDay(year, month, day, 'sleepData')];
    dataset.sort((a, b) => a.hoursSlept - b.hoursSlept);
    return dataset.filter(data => data.hoursSlept === dataset[dataset.length - 1].hoursSlept);
  }

  findAvgOfActityData(year, month, day, dataProperty) {
    let dataset = [...this.grabDataSetByDay(year, month, day, 'activityData')];
    let total = dataset.reduce((acc, currentValue) => {
      acc += currentValue[dataProperty];
      return acc;
    }, 0);
    return Math.round(total / dataset.length);
  }

  findAvgOfActityDataWeek(year, month, day, dataType) {
    let dataset = [...this.grabDataSetByWeek(year, month, day, 'activityData')];
    let alldata = dataset.reduce((acc, currentValue) => {
      acc = acc.concat(currentValue);
      return acc;
    }, []);
    let weekAvgs = [];
    for (var i = 0; i < 7; i++) {
      let dataForDay = alldata.filter(day => day.date === dataset[0][i].date);
      let avgForDay = Math.round(dataForDay.reduce((acc, currentValue) => {
        acc += currentValue[dataType];
        return acc;
      }, 0) / this.users.length);
      weekAvgs.push(avgForDay);
    };

    return weekAvgs;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
