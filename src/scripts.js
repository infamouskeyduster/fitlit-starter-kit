const userRepository = new UserRepository(userData, hydrationData, sleepData);
let user = new User(userRepository.findUser(pickAUser()))
const userGreeting = document.querySelector('.username-js')
const userInfoSection = document.querySelector('.user-info-js')
const dateSection = document.querySelector('.date-js')
const waterSection = document.querySelector('.user-water-info-js')
const waterSectionContainer = document.querySelector('.user-water-js')
let waterDateSelection = document.querySelector('.selection-box-js')

waterSectionContainer.addEventListener('change', postWaterData)

function pickAUser() {
  return Math.ceil(Math.random() * 50)
}

dateSection.innerText = '2019/09/22'
// getTodaysDate()
userGreeting.innerText = user.showUserFirstName()
userInfoSection.innerHTML = `<ul>
  <li><span>Address</span> ${user.address}</li>
  <li><span>Email</span> ${user.email}</li>
  <li><span>Stride Length</span> ${user.strideLength}</li>
  <li><span>Daily Step Goal</span> ${user.dailyStepGoal}</li>
  <li><span>Daily Step Goal vs AVG</span> ${Math.trunc(user.dailyStepGoal / userRepository.calculateStepGoalAverage() * 100)}% of User Avg of ${userRepository.calculateStepGoalAverage()}</li>
</ul>`;

user.findAllData(userRepository);
// user.findUserData(user.id, userRepository, 'hydrationData');
postWaterData();

function timePeriodHelper(data) {
  let yearMonthDay = splitTodaysDay();
  console.log(yearMonthDay);
  let period = (waterDateSelection.value === 'Today\'s') ? user.fluidConsumedByDay(yearMonthDay[0], yearMonthDay[1], yearMonthDay[2]) : user.avgFluidConsumed(user.fluidConsumedPerWeek(yearMonthDay[0], yearMonthDay[1], yearMonthDay[2]));
  return period;
}


function postWaterData() {
waterSection.innerHTML = ''
let period = timePeriodHelper();
waterSection.insertAdjacentHTML('afterbegin',
`<h5>${waterDateSelection.value} Consumption</h5>
<img src="../assets/1444858-running/svg/035-water-bottle.svg" alt="035-water-bottle">
<h4>${period}<span>oz</span></h4>`);
}

// Our Original Function for todays date but data is hard set not live
// function getTodaysDate() {
//   let date = new Date()
//   return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
// }

function splitTodaysDay() {
  let date = dateSection.innerText;
  return date.split('/').map(el => parseInt(el));
}
