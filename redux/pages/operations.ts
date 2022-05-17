import { Dispatch } from "redux";

import {  pageState } from "./dataTypes";
import {actions, Actions} from "./actions";


export const changePage = (page:pageState["page"]) => (dispatch:Dispatch) => {
    dispatch<Actions>(actions.changePage(page))
}

export const updateMessage = (message:pageState["message"]) => (dispatch:Dispatch) => {
    dispatch<Actions>(actions.setMessageStore(message))
}


export const pageAction = {
    changePage,
    updateMessage
}