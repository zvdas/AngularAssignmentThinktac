import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-emp-detail-dialog',
  templateUrl: './emp-detail-dialog.component.html',
  styleUrls: ['./emp-detail-dialog.component.css']
})

export class EmpDetailDialogComponent implements OnInit {
  formControlNames: any[] = [
    {fcName: 'EMP_ID', label: 'Employee ID'},
    {fcName: 'Name', label: 'Employee Name'},
    {fcName: 'Email', label: 'Employee Email'}
  ]

  employeeForm = new FormGroup({
    id: new FormControl(''),
    EMP_ID: new FormControl(),
    Name: new FormControl(''),
    Email: new FormControl(''),
  })

  constructor(@Inject(MAT_DIALOG_DATA) private data: { employee: Employee }, private dialog: MatDialog, private es: EmployeeService) { }

  ngOnInit(): void {
    if(this.data) {
      this.patchFormValues();
    }
  }

  patchFormValues() {
    this.employeeForm.patchValue(this.data.employee);
  }

  saveEmployee() {
    if(this.data) {
      this.es.updateEmployeeById(this.data.employee.id, this.employeeForm.value);
    } else {
      this.es.addEmployee(this.employeeForm.value);
    }
  }

}