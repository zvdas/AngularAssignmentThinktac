import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  /**
   * instantiate angularFirestore to perform database operations and
   * snackbar to display error/success messages after firestore operations
  */
  constructor(private fs: AngularFirestore, private snackbar: MatSnackBar) { }

  /* create new employee in firestore */
  async addEmployee(employee: Employee) {
    try {
      await this.fs.collection('employee').add(employee);
      return this.snackbar.open('Employee Created Successfully', 'dismiss', { duration: 5 * 1000 });
    } catch {
      return this.snackbar.open('Employee Creation Failed', 'dismiss', { duration: 5 * 1000 });
    }
  }

  /* get employee by id in firestore */
  getEmployeeById(id: string) {
    return this.fs.collection('employee').doc(id).snapshotChanges();
  }

  /* get all employees from firestore, sorted in ascending order of employee ids */
  getAllEmployees() {
    return this.fs.collection('employee', ref => ref.orderBy('EMP_ID', 'asc')).snapshotChanges();
  }

  /* update employee in firestore by id */
  async updateEmployeeById(id: string, employee: Employee) {
    try {
      await this.fs.collection('employee').doc(id).update(employee);
      return this.snackbar.open('Employee Updated Successfully', 'dismiss', { duration: 5 * 1000 });
    } catch {
      return this.snackbar.open('Employee Updation Failed', 'dismiss', { duration: 5 * 1000 });
    }
  }

  /* delete employee from firestore by id */
  async deleteEmployeeById(id: string) {
    try {
      await this.fs.collection('employee').doc(id).delete();
      return this.snackbar.open('Employee Deleted Successfully', 'dismiss', { duration: 5 * 1000 });
    } catch {
      return this.snackbar.open('Employee Deletion Failed', 'dismiss', { duration: 5 * 1000 });
    }
  }

}