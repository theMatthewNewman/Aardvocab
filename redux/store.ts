// for creating redux store
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// reducers
import * as user from "./user";
import * as lessons from "./lessons"
import * as pages from "./pages";
import { averageReducer } from "./globalAverages/reducer";


const rootReducer = combineReducers({
    page:pages.reducer,
    user:user.reducer,
    averages:averageReducer,
    lesson:lessons.reducer,
})

const middleware = [thunk]
export const store = createStore(rootReducer, applyMiddleware(...middleware))

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch