import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
// import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EmployeeFormComponent } from '../Employee-form/employee-form.component';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employees';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  public displayedColumns: string[] = ['name', 'position', 'about', 'joiningDate'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  public columnsFilters = {};

  public dataSource: MatTableDataSource<Employee>;
  private serviceSubscribe!: Subscription;

  constructor(private personsService: EmployeeService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>();
  }


  // tslint:disable-next-line:typedef
  private filter() {
    this.dataSource.filterPredicate =
    // tslint:disable-next-line:no-shadowed-variable
    (data: Employee, filter: string) => !filter || data.name === filter;

    this.dataSource.filter = '';
    this.dataSource.filter = 'activate';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter(name: string): void {
   this.dataSource.filter = name;
  }
  // tslint:disable-next-line:no-shadowed-variable
  edit(data: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '400px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personsService.edit(result);
      }
    });
  }
  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personsService.AddItem(result);
      }
    });
  }

  delete(id: any): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personsService.remove(id);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
    this.personsService.getAll();
    this.serviceSubscribe = this.personsService.employees$.subscribe(res => {
      this.dataSource.data = res;
    });
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

}
