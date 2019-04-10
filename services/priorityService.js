const config = require("config");

function increaseUserPriority(userPriority, timeLastAdded, timeNow, maxUserPriority = 1.0, timeConst = 604800000) {
  //check if user priority is 1.0 return 1.0
  if (userPriority === maxUserPriority) return userPriority;

  const timeDifference = timeNow - timeLastAdded;
  const percentToIncrease = timeDifference / timeConst;

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
  //check if user priority is zero
  if (userPriority === 0) return 0;

  const newPriority = userPriority - config.get('dec-count');

  //decrease user priority
  if (newPriority < 0) {
    return 0.0;
  } else {
    return newPriority;
  }
}

function increaseSongPriority(songPriority, timeLastAdded, timeNow, maxPriority = 1.0, timeConst = 604800000) {
  //check if song priority is 1.0 return 1.0
  if (songPriority === maxPriority) return songPriority;

  const timeDifference = timeNow - timeLastAdded;
  const percentToIncrease = timeDifference / timeConst;

  //normalise time and increase song priority
  if (percentToIncrease < maxPriority) {
    const availableIncrease = maxPriority - songPriority;
    const amountToIncrease = availableIncrease * percentToIncrease;
    return songPriority + amountToIncrease;
  } else {
    //return max song priority if time last added exceeds time to normalise
    return maxPriority;
  }
}

module.exports = {
  increaseUserPriority,
  decreaseUserPriority,
  increaseSongPriority
}