import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../models/employees';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddEmployeeComponent>, service: EmployeeService,
              private fb: FormBuilder, public data: Employee) {
    this.formInstance = this.fb.group({
      name: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      joiningDate: new FormControl('', Validators.required),
    });
    // this.formInstance.setValue(data);
    service.AddItem(this.formInstance.value);
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(Object.assign(new Employee(), this.formInstance.value));
  }

}
