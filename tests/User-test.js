const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const UserRepository = require('../src/user-repository');

describe('User class object', function () {
  let user;
  let userRepository;
  let hydrationData;
  let userData;
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
          16,
          4,
          8,
        ],
      },
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
    userRepository = new UserRepository(userData, hydrationData);
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
    expect(user.friends).to.deep.equal([16, 4, 8]);
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
      expect(user.fluidConsumedByDay(2019, 06, 17)).to.equal(96);
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

  });

});
