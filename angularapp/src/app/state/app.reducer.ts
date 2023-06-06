import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app.state";
import { setApiStatus } from "./app.action";

export const initialState: Readonly<AppState> = {
    apiStatus: '',
    apiResponseMessage: ''
};

export const appReducer = createReducer(
    initialState,
    on(setApiStatus, (state, {apiStatus}) => {
        return {
            ...state,
            ...apiStatus
        };
    }),
);