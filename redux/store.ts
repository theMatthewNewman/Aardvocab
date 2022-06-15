// for creating redux store
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";

// reducers
import * as user from "./user";
import * as lessons from "./lessons"
import * as pages from "./pages";
import * as graph from "./data";
import * as ads from "./ads";

const logger = createLogger({
    collapsed: (getState, action, logEntry:any) => !logEntry.error
})


const rootReducer = combineReducers({
    page:pages.reducer,
    user:user.reducer,
    graph:graph.reducer,
    lesson:lessons.reducer,
    ads:ads.reducer
})

const middleware = [thunk]
export const store = createStore(rootReducer, applyMiddleware(...middleware))

export type State = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch