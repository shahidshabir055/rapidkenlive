export class Employee {

  name: string;
  about: string;
  position: string;
  joiningDate: string;

  constructor(name: string = '', about: string = '', job: string = '', joiningDate: string = '') {
    this.name = name;
    this.about = about;
    this.position = job;
    this.joiningDate = joiningDate;
  }
}
