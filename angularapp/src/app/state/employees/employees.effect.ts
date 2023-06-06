import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { catchError, from, map, of, switchMap, withLatestFrom } from "rxjs";
import { AppState } from "../app.state";
import { EmployeeService } from "src/app/services/employee/employee.service";
import { addEmployeeSuccess, invokeAddEmployee, invokeLoadEmployees, invokeRemoveEmployee, invokeUpdateEmployee, loadEmployeesFailure, loadEmployeesSuccess, removeEmployeeSuccess, updateEmployeeSuccess } from "./employees.action";
import { selectEmployees } from "./employees.selector";
import { setApiStatus } from "../app.action";
import { Employee } from "src/app/models/employee";

@Injectable()
export class EmployeeEffects {
    constructor(private actions$: Actions, private store: Store, private employeeService: EmployeeService, private appStore: Store<AppState>) {}

    // run this code when an employee action is dispatched
    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeLoadEmployees),
            withLatestFrom(this.store.pipe(select(selectEmployees))),
            switchMap(() =>
                from(this.employeeService.getAllEmployees()).pipe(
                    map(data => loadEmployeesSuccess({
                        employees: data.map(res => ({
                            id: res.payload.doc.id,
                            EMP_ID: res.payload.doc.get('EMP_ID'),
                            Name: res.payload.doc.get('Name'),
                            Email: res.payload.doc.get('Email')
                        }))
                    })),
                    catchError(error => of(loadEmployeesFailure({error})))
                )
            )
        )
    );

    saveNewEmployee$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeAddEmployee),
            switchMap(async action => {
                this.appStore.dispatch(setApiStatus({apiStatus: {apiStatus: '', apiResponseMessage: ''}}));
                const res = await this.employeeService.addEmployee(action.employee);
                this.appStore.dispatch(setApiStatus({ apiStatus: { apiStatus: 'success', apiResponseMessage: '' } }));
                return addEmployeeSuccess({ employee: res as unknown as Employee });
            })
        );
    });

    updateEmployee$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeUpdateEmployee),
            switchMap(async action => {
                this.appStore.dispatch(setApiStatus({apiStatus: {apiStatus: '', apiResponseMessage: ''}}));
                const res = await this.employeeService.updateEmployeeById(action.id, action.employee);
                this.appStore.dispatch(setApiStatus({ apiStatus: {apiStatus: 'success', apiResponseMessage: ''}}));
                return updateEmployeeSuccess({ employee: res as unknown as Employee});
            })
        );
    });

    deleteEmployee$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeRemoveEmployee),
            switchMap(async action => {
                this.appStore.dispatch(setApiStatus({apiStatus: {apiStatus: '', apiResponseMessage: ''}}));
                const res = await this.employeeService.deleteEmployeeById(action.id);
                this.appStore.dispatch(setApiStatus({apiStatus: {apiStatus: 'success', apiResponseMessage: ''}}));
                return removeEmployeeSuccess({ id: res as unknown as string});
            })
        );
    });

}