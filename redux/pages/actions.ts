import { userState } from "../user";
import { pageState } from "./dataTypes";
import types from "./types";

const setOtherUser = (user:userState) => ({
    type:types.SET_OTHER_OSER,
    payload:{
        user
    }
})


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
                      ReturnType<typeof setMessageStore>|
                      ReturnType<typeof setOtherUser>


export const actions = {
    changePage,
    setMessageStore,
    setOtherUser

};
