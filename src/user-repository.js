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
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}

//A UserRepository holds onto all of the User objects
// It should have a parameter to take in user data
// It should have methods to determine:
// Given a user’s ID, what is their user data?
// The average step goal amongst all users
