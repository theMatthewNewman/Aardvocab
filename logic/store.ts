// for creating redux store
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import { useSelector as _useSelector } from "react-redux";
import { useDispatch as _useDispatch } from "react-redux"


import {TypedUseSelectorHook} from "react-redux";

// reducers
import {initialPageState, pageReducer} from "./pageHandleing/reducer";
import { isAsyncThunkAction } from "@reduxjs/toolkit";

//types 
import { pageAction, pageState } from "./pageHandleing/types";

export type rootReducerActionType = pageAction

export type rootReducerStateType = {
 page:pageState
}

const rootReducer = combineReducers({
    page:pageReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export  const useDispatch = _useDispatch

export const useSelector: TypedUseSelectorHook<rootReducerStateType> = _useSelector


