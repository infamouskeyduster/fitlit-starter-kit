const chai = require('chai');
const expect = chai.expect;
const UserRepository = require('../src/user-repository.js');

describe('User Repository', function() {
  let userRepository;
  let userData;
  let hydrationData;
  let sleepData;
  let activityData
  beforeEach(function() {
    activityData = [{
        userID: 1,
        date: "2019/06/15",
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16
      },
      {
        userID: 2,
        date: "2019/06/15",
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10
      },
      {
        userID: 3,
        date: "2019/06/15",
        numSteps: 7402,
        minutesActive: 116,
        flightsOfStairs: 33
      }
    ];

    sleepData = [{
        userID: 1,
        date: "2019/06/15",
        hoursSlept: 6.1,
        sleepQuality: 2.2
      },
      {
        userID: 2,
        date: "2019/06/15",
        hoursSlept: 7,
        sleepQuality: 4.7,
      },
      {
        userID: 1,
        date: "2019/06/16",
        hoursSlept: 10.8,
        sleepQuality: 4.7
      },
      {
        userID: 1,
        date: "2019/06/17",
        hoursSlept: 5.4,
        sleepQuality: 3,
      },
      {
        userID: 1,
        date: "2019/06/18",
        hoursSlept: 5.4,
        sleepQuality: 3,
      },
      {
        userID: 1,
        date: "2019/06/19",
        hoursSlept: 5.4,
        sleepQuality: 3,
      },
      {
        userID: 1,
        date: "2019/06/20",
        hoursSlept: 5.4,
        sleepQuality: 3,
      },
      {
        userID: 1,
        date: "2019/06/21",
        hoursSlept: 10.2,
        sleepQuality: 3,
      },
      {
        userID: 1,
        date: "2019/06/22",
        hoursSlept: 5.4,
        sleepQuality: 3,
      },
    ];
    hydrationData = [{
        userID: 1,
        date: "2019/06/15",
        numOunces: 37
      },
      {
        userID: 2,
        date: "2019/06/16",
        numOunces: 69
      },
      {
        userID: 1,
        date: "2019/06/17",
        numOunces: 96
      },
    ];
    userData = [{
        id: 1,
        name: 'Luisa Hane',
        address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
        email: 'Diana.Hayes1@hotmail.com',
        strideLength: 4.3,
        dailyStepGoal: 10000,
        friends: [
          16,
          4,
          8,
        ],
      },
      {
        id: 2,
        name: 'Jarvis Considine',
        address: '30086 Kathryn Port, Ciceroland NE 07273',
        email: 'Dimitri.Bechtelar11@gmail.com',
        strideLength: 4.5,
        dailyStepGoal: 5000,
        friends: [
          9,
          18,
          24,
          19,
        ],
      },
      {
        id: 3,
        name: 'Herminia Witting',
        address: '85823 Bosco Fork, East Oscarstad MI 85126-5660',
        email: 'Elwin.Tromp@yahoo.com',
        strideLength: 4.4,
        dailyStepGoal: 5000,
        friends: [
          19,
          11,
          42,
          33,
        ],
      },
    ];
    userRepository = new UserRepository(userData, hydrationData, sleepData, activityData);
  });

  it('Should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });

  it('Should have users', function() {
    expect(userRepository.users).to.deep.equal(userData);
  });

  it('Should be able to identify a single user', function() {
    expect(userRepository.findUser(3)).to.equal(userData[2]);
  });

  it('Should have a method that determines: The average step goal amongst all users', function() {
    expect(userRepository.calculateStepGoalAverage()).to.equal(6667);
  });

  describe('Testing Sleep Data on UserRepository class', function() {
    beforeEach(function() {
      userData = [{
        id: 1,
        name: 'Luisa Hane',
        address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
        email: 'Diana.Hayes1@hotmail.com',
        strideLength: 4.3,
        dailyStepGoal: 10000,
        friends: [
          16,
          4,
          8,
        ],
      }, ];
      userRepository = new UserRepository(userData, hydrationData, sleepData);
    });

    it('Should have a method that calculates the average sleep quality of all users', function() {
      expect(userRepository.calcAverageSleepQualityAll()).to.equal(3.3);
    });

    it('Should have a method that finds the best sleepers over the course of a week', function() {
      expect(userRepository.findGoodSleepers(2019, 6, 22)).to.deep.equal([{
        "avgSleepQuality": 3.2428571428571424,
        "userID": 1
      }]);
    });

    it('Should contain a method that calculates the user/s that slept the best', function() {
      expect(userRepository.findUserWhoSleptMost(2019, 6, 21)).to.deep.equal([{
        userID: 1,
        date: "2019/06/21",
        hoursSlept: 10.2,
        sleepQuality: 3,
      }, ]);
    });
  });

  describe('Testing Sleep Data on UserRepository class', function() {
    beforeEach(function() {
      userData = [{
        id: 1,
        name: 'Luisa Hane',
        address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
        email: 'Diana.Hayes1@hotmail.com',
        strideLength: 4.3,
        dailyStepGoal: 10000,
        friends: [
          16,
          4,
          8,
        ],
      }, ];
      userRepository = new UserRepository(userData, hydrationData, sleepData);
    });

    it('Should have a method that calculates the average sleep quality of all users', function() {
      expect(userRepository.calcAverageSleepQualityAll()).to.equal(3.3);
    });

    it('Should have a method that finds the best sleepers over the course of a week', function() {
      expect(userRepository.findGoodSleepers(2019, 6, 22)).to.deep.equal([{
        "avgSleepQuality": 3.2428571428571424,
        "userID": 1
      }]);
    });

    it('Should contain a method that calculates the user/s that slept the best', function() {
      expect(userRepository.findUserWhoSleptMost(2019, 6, 21)).to.deep.equal([{
        userID: 1,
        date: "2019/06/21",
        hoursSlept: 10.2,
        sleepQuality: 3,
      }, ]);
    });
  });

  describe('Should Have Actity', function() {
    it('Should have activity data', function() {
      expect(userRepository.activityData).to.deep.equal(activityData)
    });

    it('Should find avg of all users stair count on given day', function() {
      expect(userRepository.findAvgOfActityData(2019, 06, 15, 'flightsOfStairs')).to.equal(20)
    });

    it('Should find avg of all users steps taken on given day', function() {
      expect(userRepository.findAvgOfActityData(2019, 06, 15, 'numSteps')).to.equal(5091)
    });

    it('Should find avg of all users minutes active on given day', function() {
      expect(userRepository.findAvgOfActityData(2019, 06, 15, 'minutesActive')).to.equal(131)
    });
  });
});
