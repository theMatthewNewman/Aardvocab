import { pageState } from "./dataTypes";
import types from "./types";


const changePage = (page:pageState["page"]) => ({
    type: types.CHANGE_PAGE,
    payload:{
        page
    }
});


const setMessageStore = (message:pageState["message"]) => ({
    type: types.UPDATE_MESSAGE,
    payload:{
        message
    }
});


export type Actions = ReturnType<typeof changePage> |
                      ReturnType<typeof setMessageStore>


export const actions = {
    changePage,
    setMessageStore

};
