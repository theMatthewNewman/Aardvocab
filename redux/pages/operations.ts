import { Dispatch } from "redux";
import {  pageState } from "./dataTypes";
import {actions, Actions} from "./actions";
import {  userState } from "../user";

const updateUser = (otherUser:userState) => async(dispatch:Dispatch) => {
    dispatch<Actions>(actions.setOtherUser(otherUser))
}

const changePage = (page:pageState["page"]) => (dispatch:Dispatch) => {
    dispatch<Actions>(actions.changePage(page))
}

const updateMessage = (message:pageState["message"]) => (dispatch:Dispatch) => {
    dispatch<Actions>(actions.setMessageStore(message))
}


export const pageAction = {
    changePage,
    updateMessage,
    updateUser
}