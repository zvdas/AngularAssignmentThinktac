import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { first } from 'rxjs';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee/employee.service';
import { EmpDetailDialogComponent } from '../emp-detail-dialog/emp-detail-dialog.component';
import { invokeLoadEmployees, invokeRemoveEmployee } from '../../state/employees/employees.action';
import { selectEmployees } from '../../state/employees/employees.selector';
import { AppState } from 'src/app/state/app.state';
import { selectAppState } from 'src/app/state/app.selector';
import { setApiStatus } from 'src/app/state/app.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit, AfterViewInit {
  /**
   * Create an empty employee array to store
   * the employees fetched from firestore and
   * employee list length array to store
   * dynamic page numbers
   */
  employeeList: Employee[] = [];
  employeeListLength: number[] = [];

  employees$ = this.store.pipe(select(selectEmployees));

  /**
   * Create an empty employee object to store
   * the employee selected by the user and
   * fetched from firestore
   */
  selectedEmployee: Employee = {} as Employee;

  /**
   * Define the columns schema for the table and
   * loop the keys to form string array of keys to
   * dynamically map the table columns with headers
   */
  columnSchema: any[] = [
    {
      key: 'EMP_ID',
      label: 'Employee ID',
    },
    {
      key: 'Name',
      label: 'Name',
    },
    {
      key: 'Email',
      label: 'Email Address',
    },
    {
      key: 'action',
      label: 'Action',
    },
  ];

  columns: string[] = this.columnSchema.map((col) => col.key);

  /**
   * Link the mat table data source to render
   * values from array list (which is retrieved from firestore)
   */
  dataSource = new MatTableDataSource<Employee>(this.employeeList);
  /**
   * Instantiate paginator and sort for dynamic
   * pagination and sorting of the table
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private es: EmployeeService, private store: Store, private dialog: MatDialog, private appStore: Store<AppState>) {}

  ngOnInit(): void {
    this.retrieveAllEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * method to retrieve all the employees from
   * firestore service and store in employee array
   * created above
   */
  retrieveAllEmployees() {
    this.store.dispatch(invokeLoadEmployees());

    this.employees$.subscribe(res => {
      this.dataSource.data = this.employeeList = res as Employee[];
      this.employeeListLength = Array.from({length: this.employeeList.length}, (_,k) => k + 1);
    });

    /*
    // using employee service
    this.es.getAllEmployees().pipe(first()).subscribe(res => {
      this.employeeList =
      res.map(item => ({
       id: item.payload.doc.id,
       EMP_ID: item.payload.doc.get('EMP_ID'),
       Name: item.payload.doc.get('Name'),
       Email: item.payload.doc.get('Email')
      }));

      this.dataSource.data = this.employeeList;

      // set page numbers dynamically  based on records retrieved from firestore //
      this.employeeListLength = Array.from(
        { length: this.employeeList.length },
        (_, k) => k + 1
      );
    });
    */
  }

  /**
   * Filter box above table takes user input to filter data in the table using HTMLInputElement
   */
  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Opens a dialog containing a form to create a new employee
   * after the dialog closes, passes form data to employee service
   */
  addNewEmployee() {
    this.dialog.open(EmpDetailDialogComponent, {
      disableClose: true,
      width: '50%'
    });
  }

  /**
   * Opens a dialog with a form containing the existing details to be updated
   * after the dialog closes, passes form data to employee service
   */
  editSelectedEmployee(employee: Employee) {
    this.dialog.open(EmpDetailDialogComponent, {
      disableClose: true,
      width: '50%',
      data: { employee },
    });
  }

  /**
   * Passes the employee id to deleteEmployeeById method of employee service
   */
  deleteSelectedEmployee(employee: Employee) {
    // this.es.deleteEmployeeById(employee.id);
    this.store.dispatch(invokeRemoveEmployee({id: employee.id}));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe(app => {
      if(app.apiStatus === 'success') {
        this.appStore.dispatch(setApiStatus({apiStatus: {apiStatus: '', apiResponseMessage: ''}}));
      }
    });
  }

}