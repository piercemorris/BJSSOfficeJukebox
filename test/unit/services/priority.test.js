const config = require("config");
const priority = require("../../../services/priorityService");

describe("Priority tests", () => {

  const decrementCount = config.get('dec-count');
  let timeLastAdded
  let currentPriority;
  let newPriority;

  describe("Increase user prirority", () => {
    it("should return the same user priority if it is the max priority", () => {
      currentPriority = 1.0;
      timeLastAdded = Date.now() - 86400000; //1 day before now

      newPriority = priority.increaseUserPriority(currentPriority, timeLastAdded, Date.now());

      expect(newPriority).toBe(1.0);
    });


    it("should return the max user priority if last time added is longer than time constant", () => {
      currentPriority = 0.34;
      timeLastAdded = Date.now() - (86400000 * 8); //8 days before now

      newPriority = priority.increaseUserPriority(currentPriority, timeLastAdded, Date.now());

      expect(newPriority).toBe(1.0);
    });

    it("should return the new user priority which is greater than before", () => {
      currentPriority = 0.34;
      timeLastAdded = Date.now() - 86400000; //1 day before now

      newPriority = priority.increaseUserPriority(currentPriority, timeLastAdded, Date.now());

      expect(newPriority).toBeGreaterThan(currentPriority);
    });
  });

  describe("Decrease user priority", () => {
    it("should return 0 if the user priority is 0", () => {
      currentPriority = 0.0;

      newPriority = priority.decreaseUserPriority(currentPriority);

      expect(newPriority).toBe(0.0);
    });

    it("should return 0 if the user priority is less than the decrement count", () => {
      currentPriority = decrementCount * 0.5;

      newPriority = priority.decreaseUserPriority(currentPriority);

      expect(newPriority).toBe(0.0);
    });

    it("should decrease the user priority by the specified amount", () => {
      currentPriority = 0.50;

      newPriority = priority.decreaseUserPriority(currentPriority);

      expect(newPriority).toBe(currentPriority - decrementCount);
    });
  });

  describe("Increase song priority", () => {
    it("should return the same song priority if it is the max priority", () => {
      currentPriority = 1.0;
      timeLastAdded = Date.now() - 86400000; //1 day before now

      newPriority = priority.increaseSongPriority(currentPriority, timeLastAdded, Date.now());

      expect(newPriority).toBe(1.0);
    });


    it("should return the max song priority if last time added is longer than time constant", () => {
      currentPriority = 0.34;
      timeLastAdded = Date.now() - (86400000 * 8); //8 days before now

      newPriority = priority.increaseSongPriority(currentPriority, timeLastAdded, Date.now());

      expect(newPriority).toBe(1.0);
    });

    it("should return the new song priority which is greater than before", () => {
      currentPriority = 0.34;
      timeLastAdded = Date.now() - 86400000; //1 day before now

      newPriority = priority.increaseSongPriority(currentPriority, timeLastAdded, Date.now());

      expect(newPriority).toBeGreaterThan(currentPriority);
    });
  });
});