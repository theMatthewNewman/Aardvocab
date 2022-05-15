import { Dispatch } from "redux";

import {  pageState } from "./dataTypes";
import {actions, Actions} from "./actions";


export const changePage = (page:pageState["page"]) => (dispatch:Dispatch) => {
    dispatch<Actions>(actions.changePage(page))
}



export const pageAction = {
    changePage
}