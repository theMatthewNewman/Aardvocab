// for creating redux store
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import { useSelector as _useSelector } from "react-redux";
import { useDispatch as _useDispatch } from "react-redux"


import {TypedUseSelectorHook} from "react-redux";

// reducers
import {initialPageState, pageReducer} from "./pages/reducer";
import { userReducer } from "./userHandler/userReducer";
import { averageReducer } from "./globalAverages/reducer";
import { LessonReducer } from "./lessonHandling/IndividualLessonHandler/reducer";
import { globalLessonReducer } from "./lessonHandling/gloabalLessonHandler/reducer";

//types 
import { pageAction, pageState } from "./pages/types";
import {userAction, userState} from "./userHandler/types";
import { averageAction, averageState } from "./globalAverages/types";
import { lessonAction, lessonType } from "./lessonHandling/IndividualLessonHandler/types";
import {globalLessonActionType, globalLessonType} from "./lessonHandling/gloabalLessonHandler/types";

export type rootReducerActionType = pageAction | userAction | averageAction | lessonAction | globalLessonActionType

export type rootReducerStateType = {
 page:pageState
 user:userState
 averages:averageState
 lesson:lessonType
 globalLessons:globalLessonType
}

const rootReducer = combineReducers({
    page:pageReducer,
    user:userReducer,
    averages:averageReducer,
    lesson:LessonReducer,
    globalLessons:globalLessonReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export  const useDispatch = _useDispatch

export const useSelector: TypedUseSelectorHook<rootReducerStateType> = _useSelector


