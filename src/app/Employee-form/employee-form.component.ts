import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../models/employees';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  formInstance: FormGroup;

  constructor(public dialogRef: MatDialogRef<EmployeeFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Employee) {
    this.formInstance = new FormGroup({
      name:  new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      joiningDate: new FormControl('', Validators.required),
    });

    this.formInstance.setValue(data);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(Object.assign(new Employee(), this.formInstance.value));
  }

}
