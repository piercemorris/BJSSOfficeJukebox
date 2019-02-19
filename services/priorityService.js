const config = require("config");

function increaseUserPriority(userPriority, timeLastAdded, timeNow, maxUserPriority=1.0, timeConst=604800000) {
  //check if user priority is 1.0 return 1.0
  if (userPriority === maxUserPriority) return userPriority;

  //check if user never addded song before
  if (!timeLastAdded) return maxUserPriority;

  const timeDifference = timeNow-timeLastAdded;
  const percentToIncrease = timeDifference/timeConst;

  //normalise time and increase user priority
  if (percentToIncrease < maxUserPriority) {
    const availableIncrease = maxUserPriority - userPriority;
    const amountToIncrease = availableIncrease * percentToIncrease;
    return userPriority + amountToIncrease;
  } else {
    //return max user priority if time last added exceeds time to normalise
    return maxUserPriority;
  }
}

function decreaseUserPriority(userPriority) {
  if (userPriority === 0) return 0;

  const newPriority = userPriority-config.get('dec-count');

  if (newPriority < 0) {
    return 0;
  } else {
    return newPriority;
  }
}

function increaseSongPriority() {

}

module.exports = {
  increaseUserPriority,
  decreaseUserPriority,
  increaseSongPriority
}