import { useSelector as _useSelector } from "react-redux";
import { useDispatch as _useDispatch } from "react-redux";
import {TypedUseSelectorHook} from "react-redux";
import {State, Dispatch} from "./store";

export const useDispatch = () => _useDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<State> = _useSelector
