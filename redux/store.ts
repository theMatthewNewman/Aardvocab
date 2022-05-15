// for creating redux store
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// reducers
import * as user from "./user";
import * as lessons from "./lessons"
import {initialPageState, pageReducer} from "./pages/reducer";
import { averageReducer } from "./globalAverages/reducer";


const rootReducer = combineReducers({
    page:pageReducer,
    user:user.reducer,
    averages:averageReducer,
    lesson:lessons.reducer,
})

const middleware = [thunk]
export const store = createStore(rootReducer, applyMiddleware(...middleware))

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch