const userRepository = new UserRepository(userData)
let user = new User(userRepository.findUser(pickAUser()))
const userGreeting = document.querySelector('.username-js')
const userInfoSection = document.querySelector('.user-info-js')
const dateSection = document.querySelector('.date-js')

dateSection.innerText = getTodaysDate()
userGreeting.innerText = user.showUserFirstName()
userInfoSection.innerHTML =
`<ul>
  <li><span>Address</span> ${user.address}</li>
  <li><span>Email</span> ${user.email}</li>
  <li><span>Stride Length</span> ${user.strideLength}</li>
  <li><span>Daily Step Goal</span> ${user.dailyStepGoal}</li>
  <li><span>Daily Step Goal vs AVG</span> ${Math.trunc(user.dailyStepGoal / userRepository.calculateStepGoalAverage() * 100)}% of User Avg of ${userRepository.calculateStepGoalAverage()}</li>
</ul>`;

function pickAUser() {
  return Math.ceil(Math.random() * 50)
}

function getTodaysDate() {
  let date = new Date()
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
