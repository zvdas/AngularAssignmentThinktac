import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-emp-detail-dialog',
  templateUrl: './emp-detail-dialog.component.html',
  styleUrls: ['./emp-detail-dialog.component.css']
})

export class EmpDetailDialogComponent implements OnInit {
  /**
   * Form control names and labels array allows to dynamically
   * add form fields in the array below in the ts file rather
   * than manually adding form fields in the html file
   * (since html form field loops through below array)
   */
  formControlNames: any[] = [
    {fcName: 'EMP_ID', label: 'Employee ID'},
    {fcName: 'Name', label: 'Employee Name'},
    {fcName: 'Email', label: 'Employee Email'}
  ]

  /**
   * FormGroup with form controls referenced in above array
   */
  employeeForm = new FormGroup({
    id: new FormControl(''),
    EMP_ID: new FormControl(undefined, Validators.required),
    Name: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.email]),
  })

  get empId() { return this.employeeForm.get('EMP_ID') }
  get name() { return this.employeeForm.get('Name') }
  get email() { return this.employeeForm.get('Email') }

  /**
   * Data Injected into dialog initialized here
   */
  constructor(@Inject(MAT_DIALOG_DATA) private data: { employee: Employee }/*, private es: EmployeeService*/) { }

  ngOnInit(): void {
    if(this.data) {
      this.patchFormValues();
    }
  }

  /* Patches the form with data injected into dialog (on Edit) */
  patchFormValues() {
    this.employeeForm.patchValue(this.data.employee);
  }

  /* Passes form value to the employee service */
  saveEmployee() {
    /*
    if(this.data) {
      this.es.updateEmployeeById(this.data.employee.id, this.employeeForm.value);
    } else {
      this.es.addEmployee(this.employeeForm.value);
    }
    */
  }

}