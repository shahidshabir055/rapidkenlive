import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { employeeData } from './static/employeeList';
import { Employee } from './models/employees';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: BehaviorSubject<Employee[]>;
  employees: Array<Employee> = [];
  findElem: any;
  items: Employee[] = [];

  addToList(product: Employee): void {
    this.items.push(product);
  }

  getEmployees(): Employee[] {
    return this.items;
  }

  clearCart(): Employee[] {
    this.items = [];
    return this.items;
  }
  constructor() {
    this.employees$ = new BehaviorSubject([] as any);
    this.employees = employeeData;
  }

  getAll(): void {
    this.employees$.next(this.employees);
  }

  add(employee: Employee): void {
    this.employees.push(employee);
  }
  AddItem(employee: Employee): void {
    this.employees.push(employee);
  }

  edit(employee: Employee): void {
    this.findElem = this.employees.find(p => p.name === employee.name);
    this.findElem.about = employee.about;
    this.findElem.position = employee.position;
    this.findElem.joiningDate = employee.joiningDate;
    this.employees$.next(this.employees);
  }

  remove(name: string): void {

    this.employees = this.employees.filter(p => {
      return p.name !== name;
    });

    this.employees$.next(this.employees);
  }

}
