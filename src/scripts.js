const userRepository = new UserRepository(userData, hydrationData, sleepData, activityData);
let user = new User(userRepository.findUser(pickAUser()));
const userGreeting = document.querySelector('.username-js');
const userInfoSection = document.querySelector('.user-info-js');
const dateSection = document.querySelector('.date-js');
const waterSection = document.querySelector('.user-water-info-js');
const waterSectionContainer = document.querySelector('.user-water-js');
const waterDateSelection = document.querySelector('.selection-water-js');
const sleepSectionContainer = document.querySelector('.user-sleep-js');
const sleepSection = document.querySelector('.user-sleep-info-js');
const sleepDateSelection = document.querySelector('.selection-sleep-js');
const activitySectionContainer = document.querySelector('.user-activity-js');
const activitySection = document.querySelector('.user-activity-info-js');
const activityDateSelection = document.querySelector('.selection-activity-js');
const chartSectionContainer = document.querySelector('.user-chart-js');
const chartSection = document.querySelector('.user-chart-info-js');
const chartSelection = document.querySelector('.selection-chart-js');

waterSectionContainer.addEventListener('change', postWaterData);
sleepSectionContainer.addEventListener('change', postSleepData);
activitySectionContainer.addEventListener('change', postActivityData);
chartSectionContainer.addEventListener('change', postChart);

function pickAUser() {
  return Math.ceil(Math.random() * 50);
}

dateSection.innerText = '2019/09/22';
// getTodaysDate()
userGreeting.innerText = user.showUserFirstName();
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
postSleepData();
postActivityData();
postChart();

function timePeriodHelperWaterMessage() {
  let date = splitTodaysDay();
  let period = (waterDateSelection.value === 'Today\'s') ? user.fluidConsumedByDay(date[0], date[1], date[2], 'hydrationData') : user.avgFluidConsumed(user.fluidConsumedPerWeek(date[0], date[1], date[2]));
  return period;
}

function postWaterData() {
  waterSection.innerHTML = '';
  let period = timePeriodHelperWaterMessage();
  waterSection.insertAdjacentHTML('afterbegin',
    `<h5>${waterDateSelection.value} Consumption</h5>
<img src="../assets/1444858-running/svg/035-water-bottle.svg" alt="035-water-bottle">
<h4>${period}<span>oz</span></h4>`);
}

function timePeriodHelperSleepMessage() {
  let date = splitTodaysDay();
  switch (sleepDateSelection.value) {
    case 'Today\'s':
      return {
        hoursSlept: user.sleepStatByDay(date[0], date[1], date[2], 'sleepData', 'hoursSlept'),
          sleepQuality: user.sleepStatByDay(date[0], date[1], date[2], 'sleepData', 'sleepQuality'),
      };
    case 'This Week\'s Avg':
      return {
        hoursSlept: user.avgSleep(user.sleepPerWeek(date[0], date[1], date[2]), 'hoursSlept'),
          sleepQuality: user.avgSleep(user.sleepPerWeek(date[0], date[1], date[2]), 'sleepQuality'),
      };
    case 'All Time\'s Avg':
      return {
        hoursSlept: user.avgSleep(user.sleepData, 'hoursSlept'),
        sleepQuality: user.avgSleep(user.sleepData, 'sleepQuality')
      };
  }
}

function postSleepData() {
  sleepSection.innerHTML = ''
  let sleepInfo = timePeriodHelperSleepMessage();
  sleepSection.insertAdjacentHTML('afterbegin',
    `<h5>${sleepDateSelection.value} sleep</h5>
    <img src='../assets/1444858-running/svg/sleep.svg' alt='sleep-icon'>
    <div class= 'sleep-stats'>
      <h4>${sleepInfo.hoursSlept} <span>Hours</span></h4>
      <h4><span>Quality Rating:</span> ${sleepInfo.sleepQuality} </h4>
    </div>`);
}

function timePeriodHelperActivityMessage() {
  let date = splitTodaysDay();
  switch (activityDateSelection.value) {
    case 'Today\'s Steps':
      return {
        metric: user.showStepsForDay(date[0], date[1], date[2], 'activityData'),
        message: 'taken',
      };
    case 'Today\'s Active Time':
      return {
        metric: user.showMinutesActiveDay(date[0], date[1], date[2], 'activityData'),
        message: 'minutes',
      };
    case 'Today\'s Distance':
      return {
        metric: user.calculateMiles(date[0], date[1], date[2], 'activityData'),
        message: 'miles',
      };
  }
}

function postActivityData() {
  activitySection.innerHTML = '';
  let activityInfo = timePeriodHelperActivityMessage();
  activitySection.insertAdjacentHTML('afterbegin',
    `<h5>${activityDateSelection.value}</h5>
    <img src='../assets/1444858-running/svg/025-running-6.svg' alt='activity icon'>
    <div class= 'activity-stats'>
      <h4>${activityInfo.metric} <span>${activityInfo.message}</span></h4>
    </div>`);
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

function getActivityDataForChart() {
  let date = splitTodaysDay();
  let allData = user.getDataSetByWeek(date[0], date[1], date[2], 'activityData');
  return allData;
}

function createMyChartLabels() {
  let allData = getActivityDataForChart();
  return allData.map(data => {
    return data.date.split('2019/')[1];
  });
}

function selectActivityChartMetric() {
  switch (chartSelection.value) {
    case 'Number of Steps':
      return {userData: createMyChartData('numSteps'),
              allData: compareMyChartData('numSteps')};
    case 'Minutes Active':
      return {userData: createMyChartData('minutesActive'),
              allData: compareMyChartData('minutesActive')};
    case 'Flights of Stairs':
      return { userData: createMyChartData('flightsOfStairs'),
              allData: compareMyChartData('flightsOfStairs')};
    default:
    break;
  }
};

function createMyChartData(metric) {
  let allData = getActivityDataForChart();
  return allData.map(user => user[metric]);
};

function compareMyChartData(metric) {
  let date = splitTodaysDay();
  let userAverages = [];
  let average = userRepository.findAvgOfActityData(date[0], date[1], date[2], metric);
  while (userAverages.length < 7) {
    userAverages.push(average);
  }

  return userAverages;
}

function generateChart() {
  let chartInfo = {
    type: 'line',
    data: {
        labels: [...createMyChartLabels()],
        datasets: [{
            fill: false,
            label: `Your ${chartSelection.value} for the week:`,
            data: selectActivityChartMetric().userData,
            borderColor: 'rgba(17, 75, 95, 1)',
            pointRadius: 4,
            pointBackgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(205, 216, 79, 1)',
            ],
            pointBorderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(205, 216, 79, 1)',
            ],
            borderWidth: 1
        }, {
          fill: false,
          label: `All users' average ${chartSelection.value}`,
          data: selectActivityChartMetric().allData,
          borderWidth: 1,
          pointRadius: 1.5,
          borderColor: 'rgba(147, 3, 46, 1)',
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      },
  };
  return chartInfo;
}

function postChart() {
  chartSection.innerHTML = '';
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, generateChart());
}
