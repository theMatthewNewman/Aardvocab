import { pageAction, pageState } from "./types";
import { Dispatch } from "redux";

export const changePage = (page:pageState["page"]) => (dispatch:Dispatch) => {
    dispatch<pageAction>({type:"CHANGE PAGE", payload:{page:page}})
}