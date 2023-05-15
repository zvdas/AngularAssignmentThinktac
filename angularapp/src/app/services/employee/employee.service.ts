import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from 'src/app/models/employee/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private fs: AngularFirestore) { }

  /* create new employee in firestore */
  addEmployee(employee: Employee) {
    this.fs.collection('employee').add(employee);
  }

  /* get employee by id in firestore */
  getEmployeeById(id: string) {
    return this.fs.collection('employee').doc(id).snapshotChanges();
  }

  /* get all employees from firestore */
  getAllEmployees() {
    return this.fs.collection('employee').snapshotChanges();
  }

  /* update employee in firestore by id */
  updateEmployeeById(id: string, employee: Employee) {
    this.fs.collection('employee').doc(id).update(employee);
  }

  /* delete employee from firestore by id */
  deleteEmployeeById(id: string) {
    this.fs.collection('employee').doc(id).delete();
  }

}
