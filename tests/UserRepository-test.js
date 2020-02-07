const chai = require('chai');
const expect = chai.expect;
const UserRepository = require('../src/user-repository.js');

describe('User Repository', function () {
  let userRepository;
  let userData;
  let hydrationData;
  beforeEach(function () {
    hydrationData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 37
      },
      {
        "userID": 2,
        "date": "2019/06/16",
        "numOunces": 69
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numOunces": 96
      },
    ]
    userData = [
      {
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
    userRepository = new UserRepository(userData);
  });

  it('Should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('Should have users', function () {
    expect(userRepository.users).to.deep.equal(userData);
  });

  it('Should be able to identify a single user', function(){
    expect(userRepository.findUser(3)).to.equal(userData[2]);
  });

  it('Should have a method that determines: The average step goal amongst all users', function(){
    expect(userRepository.calculateStepGoalAverage()).to.equal(6667);
  });



});
