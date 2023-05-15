import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Employee } from 'src/app/models/employee/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private fs: AngularFirestore, private snackbar: MatSnackBar) { }

  /* create new employee in firestore */
  addEmployee(employee: Employee) {
    this.fs.collection('employee').add(employee)
    .then(() => this.snackbar.open('Employee Created Successfully', 'dismiss', { duration: 5 * 1000 }))
    .catch(() => this.snackbar.open('Employee Creation Failed', 'dismiss', { duration: 5 * 1000 }));
  }

  /* get employee by id in firestore */
  getEmployeeById(id: string) {
    return this.fs.collection('employee').doc(id).snapshotChanges();
  }

  /* get all employees from firestore */
  getAllEmployees() {
    // return this.fs.collection('employee', ref => ref.orderBy('EMP_ID', 'asc')).snapshotChanges();
    return this.fs.collection('employee', ref => ref.orderBy('EMP_ID', 'desc')).snapshotChanges();
  }

  /* update employee in firestore by id */
  updateEmployeeById(id: string, employee: Employee) {
    this.fs.collection('employee').doc(id).update(employee)
      .then(() => this.snackbar.open('Employee Updated Successfully', 'dismiss', { duration: 5 * 1000 }))
      .catch(() => this.snackbar.open('Employee Updation Failed', 'dismiss', { duration: 5 * 1000 }));
  }

  /* delete employee from firestore by id */
  deleteEmployeeById(id: string) {
    this.fs.collection('employee').doc(id).delete()
      .then(() => this.snackbar.open('Employee Deleted Successfully', 'dismiss', { duration: 5 * 1000 }))
      .catch(() => this.snackbar.open('Employee Deletion Failed', 'dismiss', { duration: 5 * 1000 }));
  }

}
