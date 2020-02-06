const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');

describe('User class object', function () {
  let user;
  beforeEach(function () {
    userData =
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
    };
    user = new User(userData);
  });

  it('Should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('Should be able to have an id', function(){
    expect(user.id).to.equal(1);
  });

  it('Should be able to have an name', function(){
    expect(user.name).to.equal(1);
  });

  it('Should be able to have an address', function(){
    expect(user.address).to.equal(1);
  });

  it('Should be able to have an email', function(){
    expect(user.email).to.equal(1);
  });

  it('Should be able to have an strideLength', function(){
    expect(user.strideLength).to.equal(1);
  });

  it('Should be able to have an dailyStepGoal', function(){
    expect(user.dailyStepGoal).to.equal(1);
  });

  it('Should be able to have an friends', function(){
    expect(user.friends).to.deep.equal([]);
  });

});
