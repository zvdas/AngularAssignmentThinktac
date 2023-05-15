import { Component, OnInit, AfterViewInit, ViewChild, IterableDiffers } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Employee } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EmpDetailDialogComponent } from '../emp-detail-dialog/emp-detail-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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

  /**
   * Create an empty employee object to store
   * the employee selected by the user and
   * fetched from firestore
   */
  selectedEmployee: Employee = {} as Employee;
  fireDocIds: string[] = [];

  /**
   * Define the columns schema for the table and
   * loop the keys to form string array of keys to
   * dynamically map the table columns with headers
  */
  columnSchema: any[] = [
    {
      key: 'EMP_ID',
      label: 'Employee ID'
    },
    {
      key: 'Name',
      label: 'Name'
    },
    {
      key: 'Email',
      label: 'Email Address'
    },
    {
      key: 'action',
      label: 'Action'
    },
  ]

  columns: string[] = this.columnSchema.map(col=>col.key);

  /**
   * Link the mat table data source to receive
   * values from array list (which retrieves from firestore)
   */
  dataSource = new MatTableDataSource<Employee>(this.employeeList);
  /**
   * Instantiate paginator and sort for dynamic
   * pagination and sorting of the table
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private es: EmployeeService, private dialog: MatDialog) {
    // this.retrieveAllEmployees();
  }

  ngOnInit(): void {
    this.retrieveAllEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * method to retrieve all the employees from
   * firstore service and store in employee array
   * created above
   */
  retrieveAllEmployees() {
    this.es.getAllEmployees().subscribe(res => {
      // this.employeeList = this.dataSource.data = res.map(item=>item.payload.doc.data()) as Employee[];

      // this.fireDocIds = res.map(ids => ids.payload.doc.id);
      // console.log(res.map(item=>item.payload.doc.id));
      // res.map(item=>{this.employeeList.map(emp=>{emp.id = item.payload.doc.id})});

      res.map(item => {
        this.employeeList.push({
          id: item.payload.doc.id,
          EMP_ID: JSON.parse(JSON.stringify(item.payload.doc.data())).EMP_ID,
          Name: JSON.parse(JSON.stringify(item.payload.doc.data())).Name,
          Email: JSON.parse(JSON.stringify(item.payload.doc.data())).Email
        });
      });

      this.dataSource.data = this.employeeList;

      /* set page numbers dynamically  based on records retrieved from firestore */
      this.employeeListLength = Array.from({ length: this.employeeList.length }, (_,k) => k+1);
    })
  }

  addNewEmployee() {
    this.dialog.open(EmpDetailDialogComponent, {
      disableClose: true,
      /*
        maxWidth: '100vw',
        maxHeight: '100vh',
        width: '98%',
        height: '98%',
        panelClass: 'fixActionRow',
        autoFocus: false,
      */
    })
  }

  editSelectedEmployee(employee: Employee) {
    console.log(employee);
    this.dialog.open(EmpDetailDialogComponent, {
      disableClose: true,
      /*
        maxWidth: '100vw',
        maxHeight: '100vh',
        width: '98%',
        height: '98%',
        panelClass: 'fixActionRow',
        autoFocus: false,
      */
      data: { employee }
    })
  }

  deleteSelectedEmployee(employee: Employee) {
    this.es.deleteEmployeeById(employee.id);
  }

}
