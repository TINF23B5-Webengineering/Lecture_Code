import { Priority } from "./priority";

export class ToDo {
  public isCompleted: boolean = false;

  constructor(
    public id: number,
    public title: string,
    public description: string = "",
    public dueDate: Date = new Date(),
    public priority: Priority = Priority.NORMAL
  ) {
    if (new Date().valueOf() > dueDate.valueOf()) {
      throw new Error("Due Date has to be in the future");
    }
  }

  public toString(): string {
    let priorityString: string;

    switch (this.priority) {
      case Priority.HIGH:
        priorityString = "High";
        break;
      case Priority.URGENT:
        priorityString = "Urgent";
        break;
      default:
        priorityString = "Normal";
        break;
    }
    return `Completed?: ${this.isCompleted}\nTitle: ${this.title}\nDescription: ${
      this.description
    }\nDueDate: ${this.dueDate.toLocaleString()}\nPriority: ${priorityString}`;
  }
}
