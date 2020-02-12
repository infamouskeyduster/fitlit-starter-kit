const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const UserRepository = require('../src/user-repository');

describe('User class object', function () {
  let user;
  let userRepository;
  let hydrationData;
  let userData;
  let sleepData;
  beforeEach(function () {
    userData = [
      {
        id: 1,
        name: 'Luisa Hane',
        address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
        email: 'Diana.Hayes1@hotmail.com',
        strideLength: 4.3,
        dailyStepGoal: 10000,
        friends: [
          2,
        ],
      },
    ];

    activityData = [{
        userID: 1,
        date: "2019/06/15",
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16
      },
      {
        userID: 1,
        date: "2019/06/16",
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10
      },
      {
        userID: 1,
        date: "2019/06/17",
        numSteps: 7402,
        minutesActive: 116,
        flightsOfStairs: 33
      },
      {
        userID: 1,
        date: "2019/06/18",
        numSteps: 3486,
        minutesActive: 114,
        flightsOfStairs: 32
      },
      {
        userID: 1,
        date: "2019/06/19",
        numSteps: 11374,
        minutesActive: 213,
        flightsOfStairs: 13
      },
      {
        userID: 1,
        date: "2019/06/20",
        numSteps: 14810,
        minutesActive: 287,
        flightsOfStairs: 18
      },
      {
        userID: 1,
        date: "2019/06/21",
        numSteps: 2634,
        minutesActive: 107,
        flightsOfStairs: 5
      }
    ];

    hydrationData = [
      {
        userID: 1,
        date: '2019/06/15',
        numOunces: 37,
      },
      {
        userID: 2,
        date: '2019/06/16',
        numOunces: 69,
      },
      {
        userID: 1,
        date: '2019/06/16',
        numOunces: 96,
      },
      {
        userID: 1,
        date: '2019/06/17',
        numOunces: 96,
      },
      {
        userID: 1,
        date: '2019/06/18',
        numOunces: 37,
      },
      {
        userID: 1,
        date: '2019/06/19',
        numOunces: 37,
      },
      {
        userID: 1,
        date: '2019/06/20',
        numOunces: 37,
      },
      {
        userID: 1,
        date: '2019/06/21',
        numOunces: 37,
      },
    ];
    sleepData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "hoursSlept": 7,
        "sleepQuality": 4.7
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "hoursSlept": 10.8,
        "sleepQuality": 4.7
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "hoursSlept": 5.4,
        "sleepQuality": 3
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "hoursSlept": 4.1,
        "sleepQuality": 3.6
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "hoursSlept": 9.6,
        "sleepQuality": 2.9
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "hoursSlept": 5.1,
        "sleepQuality": 2.6
      },
    ];
    userRepository = new UserRepository(userData, hydrationData, sleepData, activityData);
    user = new User(userRepository.findUser(1));
  });

  it('Should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('Should be able to have an id', function () {
    expect(user.id).to.equal(1);
  });

  it('Should be able to have an name', function () {
    expect(user.name).to.equal('Luisa Hane');
  });

  it('Should be able to have an address', function () {
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });

  it('Should be able to have an email', function () {
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
  });

  it('Should be able to have an strideLength', function () {
    expect(user.strideLength).to.equal(4.3);
  });

  it('Should be able to have an dailyStepGoal', function () {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it('Should be able to have an friends', function () {
    expect(user.friends).to.deep.equal([2]);
  });

  it('Should have a method that returns the user\'s First Name', function () {
    expect(user.showUserFirstName()).to.equal('Luisa');
  });

  describe('Hydration Data on User Obj', function () {
    let hydrationDataUser1;
    let totalFluidConsumed;
    let avgFluidConsumed;
    beforeEach(function(){
      hydrationDataUser1 = hydrationData.filter(data => data.userID === 1);
      totalFluidConsumed = hydrationDataUser1.reduce((total, flOz) => {
                    total += flOz.numOunces;
                    return total;
                  }, 0);
      avgFluidConsumed = Math.trunc(totalFluidConsumed / hydrationDataUser1.length);
      user.findUserData(user.id, userRepository, 'hydrationData');
    });

    it('Should have a method that returns the user\'s Hydration Data', function () {
      expect(user.hydrationData).to.deep.equal(hydrationDataUser1);
    });

    it('Should have a method that returns the user\'s average fluid consumption per day', function () {
      expect(user.avgFluidConsumed(hydrationDataUser1)).to.equal(avgFluidConsumed);
    });

    it('Should have a method that returns the fl oz consumed based on a specific date', function () {
      expect(user.fluidConsumedByDay(2019, 06, 17, 'hydrationData')).to.equal(96);
    });

    it('Should have a mehtod that return the fluids consumed each day for a week', function () {
      let weekOfHydration = user.hydrationData.map(day => {
        let newValue = {date: day.date, numOunces: day.numOunces};
        return newValue;
      });
      expect(user.fluidConsumedPerWeek(2019, 6, 21)).to.deep.equal(weekOfHydration);
    });

  });

  describe('Sleep Data on User Obj', function () {
    let sleepDataUser1;
    beforeEach(function(){
      sleepDataUser1 = sleepData.filter(data => data.userID === 1);
      user.findUserData(user.id, userRepository, 'sleepData');
  });

    it('should be able to return the average hrs slept for a given time period', function(){
      expect(user.avgSleep(sleepDataUser1, 'hoursSlept')).to.equal(6.9);
    });

    it('should be able to return the average sleep quality for a given time period', function(){
      expect(user.avgSleep(sleepDataUser1, 'sleepQuality')).to.equal(3.4);
    });

    it('Should show how many hours they slept for a specific day', function(){
      expect(user.sleepStatByDay(2019, 6, 21, 'sleepData', 'hoursSlept')).to.equal(5.1);
    });

    it('Should show a user\'s sleep quality for a specific day (identified by a date)', function(){
      expect(user.sleepStatByDay(2019, 6, 21, 'sleepData', 'sleepQuality')).to.equal(2.6);
    });

    it('Should show how many hours slept & quality each day over the course of a given week (7 days)', function(){
      expect(user.sleepPerWeek(2019, 6, 21)).to.deep.equal(sleepData.map(day => {
        let newValue = { date: day.date, hoursSlept: day.hoursSlept,
          sleepQuality: day.sleepQuality, };
        return newValue;
      }));
    });

    it('Should have a function that calculates the total hrs slept for all time', function(){
      expect(user.findTotalSleepAllTime(sleepDataUser1, 'hoursSlept')).to.equal('48.1');
    });

  });
  describe('Friends', function(){
    beforeEach(function(){
      userData = [
        {
          id: 1,
          name: 'Luisa Hane',
          address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
          email: 'Diana.Hayes1@hotmail.com',
          strideLength: 4.3,
          dailyStepGoal: 10000,
          friends: [
            2,
          ],
        },
        {
          id: 2,
          name: 'Luisa Hane',
          address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
          email: 'Diana.Hayes1@hotmail.com',
          strideLength: 4.3,
          dailyStepGoal: 10000,
          friends: [
            2,
          ],
        },
      ];

      userRepository = new UserRepository(userData, hydrationData, sleepData, activityData)
    });

    it('Should be able to find friends',
    function(){
    expect(user.getFriends(userRepository)).to.deep.equal([userData[1]])
    });


  });


  describe('Activity Data', function(){
    beforeEach(function(){
      user.findUserData(user.id, userRepository, 'activityData')
    });

    it('Should calculate distance in Miles', function(){
      expect(user.calculateMiles(2019, 6, 15, 'activityData')).to.equal(2.91)
    });

    it('Should show minutes Active in a given day', function(){
      expect(user.showMinutesActiveDay(2019, 6, 15, 'activityData')).to.equal(140)
    });

    it('Should show avg minutes Active in a given week', function(){
      expect(user.showAvgMinutesActiveWeek(2019, 6, 21, 'activityData')).to.equal(159)
    });

    it('Should show if user reached step goal', function(){
      expect(user.stepGoalAchieved(2019, 6, 19, 'activityData')).to.equal(true)
    });

    it('Should show if user reached step goal', function(){
      let daysAcheived = activityData.filter(day => day.numSteps >= user.dailyStepGoal);
      let dates = daysAcheived.map(day => day.date);
      expect(user.daysStepGoalAchieved()).to.deep.equal(dates)
    });

    it('Should show users all time stair climbing record', function(){
      expect(user.showStairClimbingRecord()).to.deep.equal(33)
    });

    it('Should have a mthod that calculates the total mileage walked', function(){
      expect(user.calculateAllTimeMileage()).to.equal(38.75);
    });
  });
});
