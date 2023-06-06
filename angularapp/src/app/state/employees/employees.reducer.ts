import { createReducer, on } from "@ngrx/store";
import { addEmployeeSuccess, loadEmployeesSuccess, removeEmployeeSuccess, updateEmployeeSuccess } from "./employees.action";
import { Employee } from "../../models/employee";

export const initialState: ReadonlyArray<Employee> = [];

export const employeeReducer  = createReducer(
    // supply the initial state
    initialState,
    // handle successful loaded employees
    on(loadEmployeesSuccess, (state, {employees}) => {
        return employees;
    }),
    // add the new employee to the employee array
    on(addEmployeeSuccess, (state, {employee}) => {
        let newState = [...state];
        newState.unshift(employee);
        return newState;
    }),
    // update the employee in the employee array
    on(updateEmployeeSuccess, (state, {employee}) => {
        let newState = state.filter(_ => _.id !== employee.id);
        newState.unshift(employee);
        return newState;
    }),
    // remove the employee from the employee array
    on(removeEmployeeSuccess, (state, {id}) => {
        let newState = state.filter(_ => _.id !== id);
        return newState;
    })
);