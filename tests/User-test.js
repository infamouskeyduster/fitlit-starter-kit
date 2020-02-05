const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');

describe('User class object', function () {
  let user;
  beforeEach(function () {
    let user = new User;
  });

  it('Should be a function', function () {
    expect(User).to.be.a('function');
  });

});
