import { createAction, props } from "@ngrx/store";
import { Employee } from "../../models/employee";

export const invokeLoadEmployees = createAction(
    '[Employee API] Invoke Load Employees'
);

export const loadEmployeesSuccess = createAction(
    '[Employee API] Load Employees Success',
    props<{employees: Employee[]}>()
);

export const loadEmployeesFailure = createAction(
    '[Employee API] Load Employees Failure',
    props<{error: string}>()
);

export const invokeAddEmployee = createAction(
    '[Employee API] Invoke Add Employee',
    props<{employee: Employee}>()
);

export const addEmployeeSuccess = createAction(
    '[Employee API] Add Employee Success',
    props<{employee: Employee}>()
);

export const invokeUpdateEmployee = createAction(
    '[Employee API] Invoke Update Employee',
    props<{id: string, employee: Employee}>()
);

export const updateEmployeeSuccess = createAction(
    '[Employee API] Update Employee Success',
    props<{employee: Employee}>()
);

export const invokeRemoveEmployee = createAction(
    '[Employee API] Invoke Remove Employee',
    props<{id: string}>()
);

export const removeEmployeeSuccess = createAction(
    '[Employee API] Remove Employee Success',
    props<{id: string}>()
);