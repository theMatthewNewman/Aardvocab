import { Dispatch } from "redux";
import {  pageState } from "./dataTypes";
import {actions, Actions} from "./actions";
import { userState } from "../user";

const updateUser = (user:userState) => (dispatch:Dispatch) => {
    dispatch<Actions>(actions.setOtherUser(user))
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