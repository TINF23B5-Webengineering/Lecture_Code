export enum Priority {
  NORMAL = 1,
  HIGH = 2,
  URGENT = 3,
}
export const parsePriorityFromString = (str: string): Priority => {
  const capsString = str.toUpperCase();
  switch (capsString) {
    case "HIGH":
      return Priority.HIGH;
    case "URGENT":
      return Priority.URGENT;
    default:
      return Priority.NORMAL;
  }
};
